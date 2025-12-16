import React, { useState, useEffect } from 'react';
import { AppView, GameRound, GameQuestion, GameState, Team, Player } from './types';
import Dashboard from './components/Dashboard';
import GameBoard from './components/GameBoard';
import GameHost from './components/GameHost';
import Lobby from './components/Lobby';
import PlayerRemote from './components/PlayerRemote';
import { INITIAL_QUESTIONS } from './initialData';
import { LayoutDashboard, Settings2, ExternalLink, Copy, Users, WifiOff, Wifi } from 'lucide-react';
import { gameSync } from './services/sync';

const INITIAL_TEAMS: { A: Team, B: Team } = {
  A: { id: 'A', name: 'TAKIM A', score: 0 },
  B: { id: 'B', name: 'TAKIM B', score: 0 }
};

const SYNC_KEY = 'GAME_STATE_SYNC';

const generateUUID = () => {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch (e) {
    // Fallback if crypto throws
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const App: React.FC = () => {
  // --- ROUTING & INITIALIZATION ---
  const [sessionId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const existingSession = params.get('session');
    
    if (existingSession) return existingSession;

    // Yoksa yeni oluştur ve URL'e ekle (Sayfa yenilenince kaybolmasın diye)
    const newSessionId = generateUUID().slice(0, 8);
    const newUrl = `${window.location.pathname}?session=${newSessionId}`;
    window.history.replaceState(null, '', newUrl);
    
    // Bu oturumu biz oluşturduk, yani HOST biziz. Bunu kaydet.
    try {
        localStorage.setItem(`isHost_${newSessionId}`, 'true');
    } catch(e) { console.error(e); }

    return newSessionId;
  });

  const urlParams = new URLSearchParams(window.location.search);
  const modeParam = urlParams.get('mode');
  
  const getInitialView = () => {
    if (modeParam === 'board') return AppView.BOARD;
    
    // Bu session için Host yetkimiz var mı kontrol et
    const isHost = localStorage.getItem(`isHost_${sessionId}`) === 'true';
    
    // Eğer Host isek, ekran boyutu ne olursa olsun (refresh etsek bile) Lobby/Host modunda kalmalıyız.
    if (isHost) return AppView.LOBBY;
    
    // Host değilsek ve linkle geldiysek Player'ız.
    return AppView.PLAYER;
  };

  const [currentView, setCurrentView] = useState<AppView>(getInitialView());
  const [gamePhase, setGamePhase] = useState<'LOBBY' | 'GAME'>('LOBBY');
  
  // Data State
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<{A: Team, B: Team}>(INITIAL_TEAMS);
  const [allQuestions, setAllQuestions] = useState<GameQuestion[]>(INITIAL_QUESTIONS);
  
  // Game Logic State
  const [activeGame, setActiveGame] = useState<GameRound | null>(null);
  const [showStrikeOverlay, setShowStrikeOverlay] = useState(false);
  const [gameQueue, setGameQueue] = useState<GameQuestion[]>([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);

  // --- SYNC ENGINE ---
  useEffect(() => {
    // If we are Host/Lobby/Board, we act as the Source of Truth or Listener
    
    // 1. Listen for Events from Players (Host Only)
    // Host views: LOBBY, DASHBOARD, HOST
    const isHostView = currentView === AppView.LOBBY || currentView === AppView.DASHBOARD || currentView === AppView.HOST;
    let unsubscribeEvents: any;
    
    if (isHostView) {
       console.log("📡 Host: Oyuncu olaylarını dinlemeye başladı...", sessionId);
       unsubscribeEvents = gameSync.subscribeToEvents(sessionId, (data) => {
         console.log("📨 Host Event Aldı:", data);
         if (data.type === 'PLAYER_JOIN') {
           const newPlayer = data.payload;
           setPlayers(prev => {
             if (prev.find(p => p.id === newPlayer.id)) return prev;
             return [...prev, newPlayer];
           });
         }
         else if (data.type === 'BUZZ_CLICKED') {
           handleBuzzer(data.teamId, data.playerId, data.playerName);
         }
         else if (data.type === 'NUMERIC_GUESS') {
           handleNumericGuess(data.playerId, data.playerName, data.team, data.guess);
         }
       });
    }

    // 2. Listen for State Updates from Host (Board & Player)
    let unsubscribeState: any;
    if (currentView === AppView.BOARD || currentView === AppView.PLAYER) {
        unsubscribeState = gameSync.subscribeToState(sessionId, (state) => {
          if (!state) return;
          setGamePhase(state.gamePhase);
          setActiveGame(state.activeGame);
          setShowStrikeOverlay(state.showStrikeOverlay);
          setTeams(state.teams);
          setPlayers(state.players || []);
        });
    }

    return () => {
      if (unsubscribeEvents && typeof unsubscribeEvents === 'function') unsubscribeEvents(); 
      if (unsubscribeState && typeof unsubscribeState === 'function') unsubscribeState();
    };
  }, [sessionId, currentView]);

  // Broadcast State (Host Only)
  useEffect(() => {
    if (currentView === AppView.HOST || currentView === AppView.DASHBOARD || currentView === AppView.LOBBY) {
      const state: GameState = {
        sessionId,
        gamePhase,
        players,
        activeGame,
        showStrikeOverlay,
        teams,
        roundInfo: gameQueue.length > 0 ? { current: currentQueueIndex + 1, total: gameQueue.length } : undefined
      };
      gameSync.publishState(sessionId, state);
    }
  }, [activeGame, showStrikeOverlay, teams, players, gamePhase, currentQueueIndex, gameQueue, currentView, sessionId]);


  // --- LOBBY ACTIONS ---
  const handlePlayerJoin = (player: Player) => {
    // Players add themselves via PlayerRemote -> SyncService -> Host listens
  };

  const handleMovePlayer = (playerId: string, targetTeam: 'A' | 'B') => {
    setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, team: targetTeam } : p));
  };

  const handleLobbyStartGame = () => {
    setGamePhase('GAME');
    setCurrentView(AppView.DASHBOARD);
  };

  // --- GAME LOGIC ---

  // Automatic Tournament Start (5 Feud -> 5 Numeric -> 5 Word)
  const handleStartFullTournament = () => {
    const shuffle = (array: GameQuestion[]) => array.sort(() => 0.5 - Math.random());

    const feudQuestions = shuffle(allQuestions.filter(q => q.type === 'FEUD')).slice(0, 5);
    const numericQuestions = shuffle(allQuestions.filter(q => q.type === 'NUMERIC')).slice(0, 5);
    const wordQuestions = shuffle(allQuestions.filter(q => q.type === 'WORD')).slice(0, 5);

    const tournamentQueue = [...feudQuestions, ...numericQuestions, ...wordQuestions];

    if (tournamentQueue.length === 0) {
        alert("Yeterli soru yok!");
        return;
    }

    setGameQueue(tournamentQueue);
    setCurrentQueueIndex(0);
    initRound(tournamentQueue[0]);
    setCurrentView(AppView.HOST);
  };

  const handleStartGame = (questionsToPlay: GameQuestion[]) => {
    if (questionsToPlay.length === 0) return;
    setGameQueue(questionsToPlay);
    setCurrentQueueIndex(0);
    initRound(questionsToPlay[0]);
    setCurrentView(AppView.HOST);
  };

  const initRound = (q: GameQuestion) => {
    // WORD PUZZLE INITIALIZATION
    let wordPuzzle: (string | null)[] = [];
    if (q.type === 'WORD' && q.correctWord) {
       wordPuzzle = q.correctWord.split('').map(char => char === ' ' ? ' ' : null);
    }

    const newGame: GameRound = {
      id: generateUUID(),
      type: q.type,
      question: q.question,
      
      // FEUD
      answers: q.answers ? q.answers.map((a, idx) => ({ ...a, id: `${idx}`, revealed: false })) : [],
      totalPoints: 0,
      currentStrikes: 0,
      isQuestionRevealed: false,
      
      // NUMERIC
      correctNumber: q.correctNumber,
      numericGuesses: [],
      isNumericResultRevealed: false,

      // WORD
      correctWord: q.correctWord,
      wordPuzzle: wordPuzzle,
      wordCurrentValue: 100,

      // COMMON
      activeTeam: null,
      buzzerWinner: null
    };
    setActiveGame(newGame);
  };

  const handleNextRound = () => {
    const nextIndex = currentQueueIndex + 1;
    if (nextIndex < gameQueue.length) {
      setCurrentQueueIndex(nextIndex);
      initRound(gameQueue[nextIndex]);
    } else {
      setActiveGame(null);
      setGameQueue([]);
      setCurrentView(AppView.DASHBOARD);
    }
  };

  // --- GAMEPLAY ACTIONS (ALL TYPES) ---

  const handleBuzzer = (teamId: 'A' | 'B', playerId: string, playerName: string) => {
    setActiveGame(prev => {
      if (!prev || prev.buzzerWinner) return prev; 
      return { ...prev, buzzerWinner: { team: teamId, playerId, playerName } };
    });
  };

  const handleSetTurn = (teamId: 'A' | 'B') => {
    if (!activeGame) return;
    setActiveGame({
      ...activeGame,
      activeTeam: teamId,
      isQuestionRevealed: true,
    });
  };

  // --- FEUD ACTIONS ---
  const handleRevealAnswer = (answerId: string) => {
    if (!activeGame || activeGame.type !== 'FEUD') return;
    const answer = activeGame.answers.find(a => a.id === answerId);
    if (!answer || answer.revealed) return;

    const updatedAnswers = activeGame.answers.map(a => 
      a.id === answerId ? { ...a, revealed: true } : a
    );

    const newTotal = updatedAnswers.filter(a => a.revealed).reduce((sum, a) => sum + a.score, 0);
    
    // Auto Score for FEUD
    const pointsToAdd = answer.score;
    if (activeGame.activeTeam) {
       setTeams(prev => ({
         ...prev,
         [activeGame.activeTeam!]: {
           ...prev[activeGame.activeTeam!],
           score: prev[activeGame.activeTeam!].score + pointsToAdd
         }
       }));
    }

    setActiveGame({ ...activeGame, answers: updatedAnswers, totalPoints: newTotal });
  };

  const handleTriggerStrike = () => {
    if (!activeGame) return;
    setShowStrikeOverlay(true);
    setTimeout(() => setShowStrikeOverlay(false), 2000);

    const nextTeam = activeGame.activeTeam === 'A' ? 'B' : 'A';
    setActiveGame({ 
      ...activeGame, 
      currentStrikes: Math.min(activeGame.currentStrikes + 1, 3),
      activeTeam: activeGame.activeTeam ? nextTeam : null 
    });
  };

  const handleResetStrikes = () => {
    if (!activeGame) return;
    setActiveGame({ ...activeGame, currentStrikes: 0 });
  };

  // --- NUMERIC ACTIONS ---
  const handleNumericGuess = (playerId: string, playerName: string, team: 'A' | 'B', guess: number) => {
    setActiveGame(prev => {
      if (!prev || prev.type !== 'NUMERIC') return prev;
      const existing = prev.numericGuesses.findIndex(g => g.playerId === playerId);
      const newGuesses = [...prev.numericGuesses];
      if (existing >= 0) {
        newGuesses[existing] = { playerId, playerName, team, guess };
      } else {
        newGuesses.push({ playerId, playerName, team, guess });
      }
      return { ...prev, numericGuesses: newGuesses };
    });
  };

  const handleRevealNumericWinner = () => {
    if (!activeGame || activeGame.type !== 'NUMERIC' || activeGame.correctNumber === undefined) return;
    const guessesWithDiff = activeGame.numericGuesses.map(g => ({
      ...g,
      diff: Math.abs(g.guess - activeGame.correctNumber!)
    }));
    let winner = guessesWithDiff[0];
    for (const g of guessesWithDiff) {
      if (g.diff < winner.diff) winner = g;
    }
    if (winner) {
       setTeams(prev => ({
         ...prev,
         [winner.team]: { ...prev[winner.team], score: prev[winner.team].score + 50 }
       }));
    }
    setActiveGame({ ...activeGame, numericGuesses: guessesWithDiff, isNumericResultRevealed: true, totalPoints: 50 });
  };

  // --- WORD ACTIONS ---
  const handleRevealLetter = () => {
    if (!activeGame || activeGame.type !== 'WORD' || !activeGame.correctWord) return;
    const hiddenIndices: number[] = [];
    activeGame.wordPuzzle.forEach((char, idx) => {
       if (char === null && activeGame.correctWord![idx] !== ' ') hiddenIndices.push(idx);
    });
    if (hiddenIndices.length === 0) return;
    const randomIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
    const newPuzzle = [...activeGame.wordPuzzle];
    newPuzzle[randomIndex] = activeGame.correctWord[randomIndex];
    const newValue = Math.max(0, activeGame.wordCurrentValue - 10);
    setActiveGame({
      ...activeGame,
      wordPuzzle: newPuzzle,
      wordCurrentValue: newValue
    });
  };

  const handleWordSolveSuccess = (teamId: 'A' | 'B') => {
    if (!activeGame || activeGame.type !== 'WORD' || !activeGame.correctWord) return;
    const solvedPuzzle = activeGame.correctWord.split('');
    setTeams(prev => ({
      ...prev,
      [teamId]: { ...prev[teamId], score: prev[teamId].score + activeGame.wordCurrentValue }
    }));
    setActiveGame({
      ...activeGame,
      wordPuzzle: solvedPuzzle,
      totalPoints: activeGame.wordCurrentValue
    });
  };

  // --- DASHBOARD ACTIONS ---
  const handleUpdateTeamName = (teamId: 'A' | 'B', name: string) => {
    setTeams(prev => ({ ...prev, [teamId]: { ...prev[teamId], name } }));
  };

  const handleResetTournament = () => {
    if(confirm("Tüm puanlar ve oyun sıfırlanacak. Emin misiniz?")) {
       setTeams(INITIAL_TEAMS);
       setActiveGame(null);
       setGameQueue([]);
       setPlayers([]);
       setGamePhase('LOBBY');
       setCurrentView(AppView.LOBBY);
    }
  };
  
  const openBoardWindow = () => {
    const width = 1024;
    const height = 768;
    const url = `${window.location.origin}${window.location.pathname}?mode=board&session=${sessionId}`;
    window.open(url, 'GameBoardWindow', `width=${width},height=${height},menubar=no,toolbar=no,location=no,status=no`);
  };

  const getInviteLink = () => {
    return `${window.location.origin}${window.location.pathname}?session=${sessionId}`;
  };

  // --- RENDER ---

  if (currentView === AppView.BOARD) {
    return (
      <GameBoard 
        game={activeGame} 
        showStrikeOverlay={showStrikeOverlay} 
        teams={teams}
        players={players}
        gamePhase={gamePhase}
      />
    );
  }

  if (currentView === AppView.PLAYER) {
    return (
      <PlayerRemote 
        sessionId={sessionId}
        activeGame={activeGame}
        gamePhase={gamePhase}
        onJoin={() => {}} 
        onBuzz={() => {}} 
        onNumericSubmit={() => {}}
      />
    );
  }

  // HOST VIEWS
  const renderHostView = () => {
    switch (currentView) {
      case AppView.LOBBY:
        return (
          <Lobby 
             sessionId={sessionId}
             players={players}
             teams={teams}
             onMovePlayer={handleMovePlayer}
             onStartGame={handleLobbyStartGame}
             inviteLink={getInviteLink()}
          />
        );
      case AppView.DASHBOARD:
        return (
          <Dashboard 
            allQuestions={allQuestions} 
            teams={teams}
            onStartFullTournament={handleStartFullTournament}
            onStartGame={handleStartGame}
            onSaveQuestion={(q) => {
               const exists = allQuestions.find(ex => ex.id === q.id);
               if (exists) {
                 setAllQuestions(prev => prev.map(x => x.id === q.id ? q : x));
               } else {
                 setAllQuestions(prev => [q, ...prev]);
               }
            }}
            onDeleteQuestion={(id) => setAllQuestions(prev => prev.filter(q => q.id !== id))}
            onUpdateTeamName={handleUpdateTeamName}
            onResetTournament={handleResetTournament}
          />
        );
      case AppView.HOST:
        return (
          <GameHost 
            game={activeGame}
            teams={teams}
            roundInfo={gameQueue.length > 0 ? { current: currentQueueIndex + 1, total: gameQueue.length } : undefined}
            
            // Feud
            onRevealAnswer={handleRevealAnswer}
            
            // Numeric
            onRevealNumericWinner={handleRevealNumericWinner}
            
            // Word
            onRevealLetter={handleRevealLetter}
            onWordSolveSuccess={handleWordSolveSuccess}
            
            // Common
            onStrike={handleTriggerStrike}
            onResetStrikes={handleResetStrikes}
            onEndRound={handleNextRound}
            openBoardWindow={openBoardWindow}
            onSetTurn={handleSetTurn}
          />
        );
      default:
        return <div>Unknown View</div>;
    }
  };

  const isLocal = gameSync.getMode() === 'LOCAL';

  return (
    <div className="flex h-screen w-full bg-gray-900 overflow-hidden">
      <nav className="w-20 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-6 z-50 shadow-2xl">
        <div className="mb-8 p-2 bg-game-blue rounded-lg">
           <span className="font-display text-game-yellow text-xl font-bold">100</span>
        </div>
        
        <div className="space-y-6 flex flex-col w-full">
           <NavButton active={currentView === AppView.LOBBY} onClick={() => setCurrentView(AppView.LOBBY)} icon={<Users />} label="Lobby"/>
           {gamePhase === 'GAME' && (
             <>
              <NavButton active={currentView === AppView.DASHBOARD} onClick={() => setCurrentView(AppView.DASHBOARD)} icon={<LayoutDashboard />} label="Panel"/>
              <NavButton active={currentView === AppView.HOST} onClick={() => setCurrentView(AppView.HOST)} icon={<Settings2 />} label="Yönet"/>
             </>
           )}
           <NavButton active={false} onClick={openBoardWindow} icon={<ExternalLink />} label="Pencere"/>
           <NavButton active={false} onClick={() => { navigator.clipboard.writeText(getInviteLink()); alert("Link kopyalandı!"); }} icon={<Copy />} label="Link"/>
        </div>

        <div className="mt-auto mb-4 flex flex-col items-center gap-2">
           <div className={`p-2 rounded-full ${isLocal ? 'bg-red-900/50 text-red-500' : 'bg-green-900/50 text-green-500'}`}>
              {isLocal ? <WifiOff size={16}/> : <Wifi size={16}/>}
           </div>
           <span className="text-[10px] text-gray-500 font-bold uppercase">{isLocal ? 'LOCAL' : 'ONLINE'}</span>
        </div>
      </nav>
      <main className="flex-grow h-full relative overflow-hidden">
        {renderHostView()}
      </main>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-3 w-full transition-all duration-200 relative
      ${active ? 'text-game-yellow scale-110' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}
    `}
  >
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-game-yellow rounded-r" />}
    <div className="mb-1">{icon}</div>
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

export default App;