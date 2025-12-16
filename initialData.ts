import { GameQuestion } from './types';

const uid = () => {
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

export const INITIAL_QUESTIONS: GameQuestion[] = [
  // ==========================================================================================
  // ETAP 1: 100 KİŞİYE SORDUK (FEUD) - 50 ADET
  // ==========================================================================================
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Kariyeri boyunca sadece tek takımda oynamış sadık futbolcular?",
    answers: [{text: "Paolo Maldini", score: 5}, {text: "Francesco Totti", score: 5}, {text: "Ryan Giggs", score: 10}, {text: "Carles Puyol", score: 15}, {text: "Bülent Korkmaz", score: 25}, {text: "Tony Adams", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Tarihin en iyi frikikçileri?",
    answers: [{text: "Juninho", score: 5}, {text: "David Beckham", score: 5}, {text: "Ronaldinho", score: 10}, {text: "Roberto Carlos", score: 15}, {text: "Pierre van Hooijdonk", score: 25}, {text: "Sinisa Mihajlovic", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Futbol tarihinin en hızlı koşucuları?",
    answers: [{text: "Kylian Mbappe", score: 5}, {text: "Gareth Bale", score: 5}, {text: "Thierry Henry", score: 10}, {text: "Kyle Walker", score: 15}, {text: "Arjen Robben", score: 25}, {text: "Claudio Caniggia", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Kel ama karizmatik futbolcular?",
    answers: [{text: "Zinedine Zidane", score: 5}, {text: "Pep Guardiola", score: 5}, {text: "Roberto Carlos", score: 10}, {text: "Pierluigi Collina", score: 15}, {text: "Arjen Robben", score: 25}, {text: "Hasan Şaş", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Halı sahada maça gelmeyen adamın bahanesi?",
    answers: [{text: "Hanım izin vermedi", score: 5}, {text: "Hastayım / Sakatım", score: 5}, {text: "Mesaiye kaldım", score: 10}, {text: "Unuttum", score: 15}, {text: "Misafir geldi", score: 25}, {text: "Halının deseni kötüymüş", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Hakeme itiraz ederken söylenen klasik yalanlar?",
    answers: [{text: "Hocam valla dokunmadım", score: 5}, {text: "Topa müdahale", score: 5}, {text: "O bana vurdu", score: 10}, {text: "Görmedin mi hocam?", score: 15}, {text: "Elim bitişikti", score: 25}, {text: "Çimlere takıldı", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Türk futbol yorumcularının en sık kullandığı klişeler?",
    answers: [{text: "Top yuvarlak", score: 5}, {text: "Önümüzdeki maçlara bakacağız", score: 5}, {text: "Atamayana atarlar", score: 10}, {text: "Maç 90 dakika", score: 15}, {text: "Kol bozuk (FIFA)", score: 25}, {text: "İstatistikler mini etek gibidir", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Bir kalecinin gol yedikten sonra suçladığı şeyler?",
    answers: [{text: "Defans oyuncuları", score: 5}, {text: "Hakem (Ofsayt diye)", score: 5}, {text: "Güneş / Işık", score: 10}, {text: "Zemin / Çim", score: 15}, {text: "Eldivenler", score: 25}, {text: "Kale direği yamuk", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Stadyum büfesinde satılan, mideyi yakan yiyecekler?",
    answers: [{text: "Köfte Ekmek", score: 5}, {text: "Sosisli", score: 5}, {text: "Tost", score: 10}, {text: "Çekirdek", score: 15}, {text: "Ayran", score: 25}, {text: "Soğuk Çay (Sıcak)", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Maç izlerken sinirlenip televizyona fırlatılan şeyler?",
    answers: [{text: "Kumanda", score: 5}, {text: "Yastık", score: 5}, {text: "Terlik", score: 10}, {text: "Çakmak", score: 15}, {text: "Telefon", score: 25}, {text: "Küllük", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Amatör küme maçlarında sıkça görülen olaylar?",
    answers: [{text: "Kavga çıkması", score: 5}, {text: "Sahaya köpek girmesi", score: 5}, {text: "Hakemin kaçması", score: 10}, {text: "Topun patlaması", score: 15}, {text: "Ambulansın geç gelmesi", score: 25}, {text: "Kalecinin sigara içmesi", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Futbolcuların maçtan sonra duşta unuttuğu şeyler?",
    answers: [{text: "Şampuan", score: 5}, {text: "Havlu", score: 5}, {text: "Terlik", score: 10}, {text: "İç çamaşırı", score: 15}, {text: "Krampon", score: 25}, {text: "Egosu", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Teknik direktörün kenarda oyuncuya bağırırken dediği şeyler?",
    answers: [{text: "Bas bas!", score: 5}, {text: "Geri dön!", score: 5}, {text: "Kanada in!", score: 10}, {text: "Araya oyna!", score: 15}, {text: "Sakin ol!", score: 25}, {text: "Beni deli etme!", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Futbolcuların sahaya çıkarken batıl inançları?",
    answers: [{text: "Sağ ayakla girmek", score: 5}, {text: "Dua etmek", score: 5}, {text: "Çime dokunmak", score: 10}, {text: "Zıplayarak girmek", score: 15}, {text: "Aynı çorabı giymek", score: 25}, {text: "Kale direğini öpmek", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "En çok kırmızı kart gören hırçın futbolcular?",
    answers: [{text: "Sergio Ramos", score: 5}, {text: "Pepe", score: 5}, {text: "Felipe Melo", score: 10}, {text: "Gattuso", score: 15}, {text: "Roy Keane", score: 25}, {text: "Lugano", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Dünya Kupası denince akla gelen ülkeler?",
    answers: [{text: "Brezilya", score: 5}, {text: "Almanya", score: 5}, {text: "Arjantin", score: 10}, {text: "İtalya", score: 15}, {text: "Fransa", score: 25}, {text: "Uruguay", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Ofsayt kuralını anlatırken kullanılan metaforlar?",
    answers: [{text: "Bakkal sırası", score: 5}, {text: "Tuzluk", score: 5}, {text: "Otobüs durağı", score: 10}, {text: "Askerlik", score: 15}, {text: "Kız isteme", score: 25}, {text: "Kasiyer kuyruğu", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Futbol maçlarının oynandığı en ilginç yerler?",
    answers: [{text: "Sokak arası", score: 5}, {text: "Okul bahçesi", score: 5}, {text: "Plaj", score: 10}, {text: "Halı saha", score: 15}, {text: "Gemi güvertesi", score: 25}, {text: "Dağ başı", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Bir takımın 10 numarasından beklenen özellikler?",
    answers: [{text: "İyi pas atması", score: 5}, {text: "Çalım yeteneği", score: 5}, {text: "Frikik ustası", score: 10}, {text: "Oyun zekası", score: 15}, {text: "Liderlik", score: 25}, {text: "Saçının güzel olması", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Maçın spikerini çıldırtan futbolcu tipi?",
    answers: [{text: "İsmi zor okunan", score: 5}, {text: "Sürekli top kaybeden", score: 5}, {text: "Gol kaçıran", score: 10}, {text: "İkizi olan", score: 15}, {text: "Hareketsiz duran", score: 25}, {text: "Numarası görünmeyen", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "En çok bahis (iddaa) yapılan ligler?",
    answers: [{text: "Premier Lig", score: 5}, {text: "Süper Lig", score: 5}, {text: "La Liga", score: 10}, {text: "Bundesliga", score: 15}, {text: "Serie A", score: 25}, {text: "Şampiyonlar Ligi", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Futbolda en çok kullanılan klişe lakaplar?",
    answers: [{text: "Panter", score: 5}, {text: "Sihirbaz", score: 5}, {text: "Kral", score: 10}, {text: "Örümcek", score: 15}, {text: "Komutan", score: 25}, {text: "Rüzgarın oğlu", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Kaleciyle karşı karşıya kalınca yapılmaması gereken?",
    answers: [{text: "Topa abanmak", score: 5}, {text: "Gözünü kapatmak", score: 5}, {text: "Kalecinin üstüne vurmak", score: 10}, {text: "Çok düşünmek", score: 15}, {text: "Geriye pas vermek", score: 25}, {text: "Aşırtma denerken düşmek", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Taraftarın en sevdiği tezahürat kelimeleri?",
    answers: [{text: "Şampiyon", score: 5}, {text: "Gol", score: 5}, {text: "Saldır", score: 10}, {text: "Vur", score: 15}, {text: "Ölümüne", score: 25}, {text: "Lay lay lom", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Futbolcu olmasaydı manken olacak yakışıklılar?",
    answers: [{text: "David Beckham", score: 5}, {text: "Cristiano Ronaldo", score: 5}, {text: "Olivier Giroud", score: 10}, {text: "Paolo Maldini", score: 15}, {text: "Fernando Torres", score: 25}, {text: "Loris Karius", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Bir futbol maçında görebileceğiniz hayvanlar?",
    answers: [{text: "Köpek", score: 5}, {text: "Kedi", score: 5}, {text: "Kuş", score: 10}, {text: "Sincap", score: 15}, {text: "Arı", score: 25}, {text: "Horoz", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "VAR incelemesi sırasında yapılanlar?",
    answers: [{text: "Ekrana kutu işareti", score: 5}, {text: "Hakeme itiraz", score: 5}, {text: "Su içmek", score: 10}, {text: "Tırnak yemek", score: 15}, {text: "Telefona bakmak", score: 25}, {text: "Dua etmek", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "En ilginç saç stiline sahip futbolcular?",
    answers: [{text: "Taribo West", score: 5}, {text: "Ronaldo (Perçem)", score: 5}, {text: "Valderrama", score: 10}, {text: "Pogba", score: 15}, {text: "Ümit Davala", score: 25}, {text: "Abel Xavier", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Futbol topuna en çok benzeyen şeyler?",
    answers: [{text: "Karpuz", score: 5}, {text: "Kavun", score: 5}, {text: "Bal kabağı", score: 10}, {text: "Kafa (Kel)", score: 15}, {text: "Portakal", score: 25}, {text: "Dünya", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Maç 0-0 giderken spikerin uykusunu getiren takımlar?",
    answers: [{text: "Yunanistan", score: 5}, {text: "Atletico Madrid", score: 5}, {text: "İtalyan Takımları", score: 10}, {text: "Konyaspor", score: 15}, {text: "Küme düşenler", score: 25}, {text: "Mourinho takımları", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Futbolcuların en çok reklamında oynadığı ürünler?",
    answers: [{text: "Şampuan", score: 5}, {text: "Araba", score: 5}, {text: "Krampon", score: 10}, {text: "Cips", score: 15}, {text: "Kola", score: 25}, {text: "Tıraş bıçağı", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Korner kullanırken topun başına en yavaş giden futbolcu?",
    answers: [{text: "Zaman geçiren", score: 5}, {text: "Yorgun oyuncu", score: 5}, {text: "Quaresma", score: 10}, {text: "Hagi", score: 15}, {text: "Emre Belözoğlu", score: 25}, {text: "Kaleci (Son dakika)", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Futbol maçında düdük sesinden sonra duyulan ilk ses?",
    answers: [{text: "Topa vurma sesi", score: 5}, {text: "Taraftar uğultusu", score: 5}, {text: "Küfür", score: 10}, {text: "Spikerin sesi", score: 15}, {text: "Teknik direktör bağırtısı", score: 25}, {text: "Kuş sesi (Pandemi)", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Yedek kulübesinde oturan futbolcu ne yapar?",
    answers: [{text: "Maçı izler", score: 5}, {text: "Isınır", score: 5}, {text: "Sohbet eder", score: 10}, {text: "Tırnak yer", score: 15}, {text: "Su içer", score: 25}, {text: "Uyur", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Bir futbolcunun en büyük kabusu?",
    answers: [{text: "Sakatlanmak", score: 5}, {text: "Penaltı kaçırmak", score: 5}, {text: "Kendi kalesine gol", score: 10}, {text: "Kırmızı kart", score: 15}, {text: "Küme düşmek", score: 25}, {text: "Formanın yırtılması", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Tribündeki taraftarın en çok yediği şey?",
    answers: [{text: "Çekirdek", score: 5}, {text: "Köfte Ekmek", score: 5}, {text: "Tost", score: 10}, {text: "Sandviç", score: 15}, {text: "Tırnak", score: 25}, {text: "Gol (Mecazi)", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Maç sonu röportajında söylenen klasik sözler?",
    answers: [{text: "Önümüzdeki maça bakacağız", score: 5}, {text: "Takımı tebrik ederim", score: 5}, {text: "Top bizi sevmedi", score: 10}, {text: "Hocamızın dediklerini yaptık", score: 15}, {text: "Taraftara armağan olsun", score: 25}, {text: "Hakem hakkında konuşmam", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Sarı kart gerektiren hareketler?",
    answers: [{text: "Forma çıkarmak", score: 5}, {text: "Rakibi çekmek", score: 5}, {text: "İtiraz etmek", score: 10}, {text: "Zaman geçirmek", score: 15}, {text: "Elle oynamak", score: 25}, {text: "Aldatmaya yönelik hareket", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Futbol topu patlarsa ne olur?",
    answers: [{text: "Değiştirilir", score: 5}, {text: "Oyun durur", score: 5}, {text: "Yenisi istenir", score: 10}, {text: "Hakem hava atışı yapar", score: 15}, {text: "Herkes güler", score: 25}, {text: "Maç iptal olur (Tek topsa)", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "En unutulmaz futbol spikerleri?",
    answers: [{text: "Ercan Taner", score: 5}, {text: "İlker Yasin", score: 5}, {text: "Murat Kosova", score: 10}, {text: "Ertem Şener", score: 15}, {text: "Orhan Ayhan", score: 25}, {text: "Sabri Ugan", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Transfer döneminde adı en çok geçen futbolcular?",
    answers: [{text: "Sneijder (Eskiden)", score: 5}, {text: "Messi", score: 5}, {text: "Mbappe", score: 10}, {text: "Ronaldo", score: 15}, {text: "Talisca", score: 25}, {text: "Neymar", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Bir futbolcunun sahada giydiği aksesuarlar?",
    answers: [{text: "Krampon", score: 5}, {text: "Tekmelik", score: 5}, {text: "Eldiven (Kaleci)", score: 10}, {text: "Saç bandı", score: 15}, {text: "Dizlik", score: 25}, {text: "Burun bandı", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Futbolda en sık yaşanan sakatlıklar?",
    answers: [{text: "Adale çekmesi", score: 5}, {text: "Bilek burkulması", score: 5}, {text: "Diz dönmesi (Çapraz bağ)", score: 10}, {text: "Kafa çarpışması", score: 15}, {text: "Kramp girmesi", score: 25}, {text: "Burun kırılması", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "En iyi penaltı kullanan futbolcular?",
    answers: [{text: "Cristiano Ronaldo", score: 5}, {text: "Messi", score: 5}, {text: "Lewandowski", score: 10}, {text: "Jorginho", score: 15}, {text: "Balotelli", score: 25}, {text: "Bruno Fernandes", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "En sinirli teknik direktörler?",
    answers: [{text: "Fatih Terim", score: 5}, {text: "Jose Mourinho", score: 5}, {text: "Diego Simeone", score: 10}, {text: "Jurgen Klopp", score: 15}, {text: "Conte", score: 25}, {text: "Yılmaz Vural", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Bir forvetin en sevdiği şey?",
    answers: [{text: "Gol atmak", score: 5}, {text: "Asist almak", score: 5}, {text: "Boş kale", score: 10}, {text: "Penaltı kullanmak", score: 15}, {text: "Alkışlanmak", score: 25}, {text: "Hattrick topu", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Kalecilerin en sevmediği hava durumu?",
    answers: [{text: "Yağmur (Top kayar)", score: 5}, {text: "Güneş (Göz alır)", score: 5}, {text: "Rüzgar (Top yön değiştirir)", score: 10}, {text: "Kar", score: 15}, {text: "Sis", score: 25}, {text: "Dolu", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Futbol sahasındaki çizgiler?",
    answers: [{text: "Orta saha çizgisi", score: 5}, {text: "Taç çizgisi", score: 5}, {text: "Kale çizgisi", score: 10}, {text: "Ceza sahası çizgisi", score: 15}, {text: "Korner yayı", score: 25}, {text: "Penaltı noktası", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "En çok taraftarı olan Türk takımları?",
    answers: [{text: "Galatasaray", score: 5}, {text: "Fenerbahçe", score: 5}, {text: "Beşiktaş", score: 10}, {text: "Trabzonspor", score: 15}, {text: "Bursaspor", score: 25}, {text: "Göztepe", score: 40}]
  },
  {
    id: uid(), type: 'FEUD', createdAt: Date.now(),
    question: "Futbol maçlarında en çok tüketilen içecek?",
    answers: [{text: "Su", score: 5}, {text: "Bira (Yurt dışı)", score: 5}, {text: "Kola", score: 10}, {text: "Çay", score: 15}, {text: "Kahve", score: 25}, {text: "Enerji içeceği", score: 40}]
  },

  // ==========================================================================================
  // ETAP 2: SAYISAL TAHMİN (NUMERIC) - 50 ADET
  // ==========================================================================================
  { id: uid(), type: 'NUMERIC', question: "Fenerbahçe Şükrü Saracoğlu Stadyumu'nun tam kapasitesi kaçtır?", correctNumber: 47834, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Galatasaray kaç yılında UEFA Kupası'nı kazanmıştır?", correctNumber: 2000, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Bir futbol kalesi (iki direk arası) kaç santimetredir?", correctNumber: 732, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Cristiano Ronaldo kariyerinde toplam kaç resmi gol atmıştır? (Yaklaşık - 2024 başı)", correctNumber: 873, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Türkiye Süper Lig tarihinde en çok gol atan futbolcu (Hakan Şükür) kaç gol atmıştır?", correctNumber: 249, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Dünya Kupası tarihinin en çok gol atan oyuncusu Klose kaç gol atmıştır?", correctNumber: 16, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Bir futbol topunun çevresi en fazla kaç cm olabilir (FIFA standardı)?", correctNumber: 70, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Maradona kaç yılında doğmuştur?", correctNumber: 1960, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Beşiktaş Jimnastik Kulübü kaç yılında kurulmuştur?", correctNumber: 1903, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "İstanbul ile Münih arası kuş uçuşu kaç kilometredir?", correctNumber: 1580, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Camp Nou (Barcelona) stadyumunun kapasitesi kaçtır?", correctNumber: 99354, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "FIFA Dünya Kupası ilk kez hangi yılda düzenlendi?", correctNumber: 1930, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Bir futbol maçı uzatmalar dahil (penaltılar hariç) maksimum kaç dakika sürer (15+15)?", correctNumber: 120, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Pele kariyerinde (dostluk maçları dahil) bin gol barajını kaç yılında aştı?", correctNumber: 1969, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Fatih Terim kaç doğumludur?", correctNumber: 1953, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Süper Lig'de bir sezonda en çok puan toplayan takım kaç puan almıştır? (Galatasaray 23/24)", correctNumber: 102, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Alex de Souza Fenerbahçe formasıyla kaç gol atmıştır?", correctNumber: 171, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Real Madrid Şampiyonlar Ligi'ni kaç kez kazanmıştır? (2024 itibariyle)", correctNumber: 15, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Bir futbol sahasının penaltı noktasının kaleye uzaklığı kaç metredir (Tam sayı)?", correctNumber: 11, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Brezilya Milli Takımı kaç kez Dünya Kupası kazanmıştır?", correctNumber: 5, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Lionel Messi Barcelona'da kaç numaralı formayı efsaneleştirmiştir?", correctNumber: 10, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Türkiye Milli Takımı 2002 Dünya Kupası'nda kaçıncı olmuştur?", correctNumber: 3, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Trabzonspor kaç yılında kurulmuştur?", correctNumber: 1967, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Arda Güler Real Madrid'e kaç milyon Euro bonservisle transfer oldu (Bonuslar hariç)?", correctNumber: 20, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Sergen Yalçın kaç farklı şampiyon takımda oynamıştır (4 Büyükler)?", correctNumber: 4, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Jose Mourinho kariyerinde kaç kez Şampiyonlar Ligi kazanmıştır?", correctNumber: 2, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Hagi Galatasaray'a kaç yaşında transfer oldu?", correctNumber: 31, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Neymar PSG'ye kaç milyon Euro'ya transfer oldu (Dünya Rekoru)?", correctNumber: 222, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Türkiye'nin plakası (Uluslararası kod) kaçtır? (+...)", correctNumber: 90, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Wembley Stadyumu'nun kapasitesi kaçtır?", correctNumber: 90000, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Euro 2008'de Türkiye kaçıncı dakikada Semih Şentürk ile Hırvatistan'a gol attı?", correctNumber: 122, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Futbol kalesinin yüksekliği kaç santimetredir?", correctNumber: 244, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Süper Lig kaç hafta sürer (20 takım varken)?", correctNumber: 38, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Zlatan Ibrahimovic kaç farklı ülkede lig şampiyonluğu yaşamıştır?", correctNumber: 5, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Metin Oktay'ın Galatasaray formasıyla bir sezonda attığı rekor gol sayısı kaçtır (1962-63)?", correctNumber: 38, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Premier Lig (bu isimle) kaç yılında kuruldu?", correctNumber: 1992, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Altın Top (Ballon d'Or) ödülünü Messi kaç kez kazanmıştır (2023 sonu)?", correctNumber: 8, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Bursaspor kaç yılında Süper Lig şampiyonu oldu?", correctNumber: 2010, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Liverpool 'You'll Never Walk Alone' şarkısını kaç yılından beri söylüyor (Yaklaşık)?", correctNumber: 1963, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Hakan Çalhanoğlu İtalya'da kaç farklı takımda oynadı?", correctNumber: 2, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Volkan Demirel Fenerbahçe'de kaç sezon forma giydi?", correctNumber: 17, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Muslera Galatasaray'da kaçıncı sezonunu geçiriyor (2024 itibariyle)?", correctNumber: 13, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Bir futbol takımında sahada en az kaç oyuncu kalırsa maç tatil edilir?", correctNumber: 6, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Johan Cruyff kaç numaralı formayla özdeşleşmiştir?", correctNumber: 14, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Göztepe kaç yılında Fuar Şehirleri Kupası'nda yarı final oynadı?", correctNumber: 1969, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Mustafa Denizli kaç farklı takımı Süper Lig şampiyonu yapmıştır?", correctNumber: 3, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Leicester City kaç oranla Premier Lig şampiyonu oldu (Bahis oranı)?", correctNumber: 5000, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Şampiyonlar Ligi müziği kaç yılında bestelendi?", correctNumber: 1992, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Bayern Münih üst üste kaç kez Bundesliga şampiyonu oldu (Rekor seri)?", correctNumber: 11, createdAt: Date.now() },
  { id: uid(), type: 'NUMERIC', question: "Katar 2022 Dünya Kupası finalinde toplam kaç gol atıldı (Penaltılar hariç)?", correctNumber: 6, createdAt: Date.now() },

  // ==========================================================================================
  // ETAP 3: HARF DOLDURMACA (WORD) - 50 ADET
  // ==========================================================================================
  { id: uid(), type: 'WORD', question: "Futbolda oyun alanını sınırlayan beyaz çizgilerin adı?", correctWord: "TAÇ ÇİZGİSİ", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Hakemin oyunu durdurup inceleme yaptığı sistem?", correctWord: "VAR SİSTEMİ", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Kalecinin ceza sahası dışında topa elle dokunmasının cezası?", correctWord: "KIRMIZI KART", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Bir futbol takımının saha kenarındaki yöneticisi?", correctWord: "TEKNİK DİREKTÖR", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Maçın berabere bitmesi durumunda gidilen ekstra süre?", correctWord: "UZATMA DAKİKALARI", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Futbolcuların bacaklarına taktığı koruyucu?", correctWord: "TEKMELİK", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Köşe vuruşunun diğer adı?", correctWord: "KORNER VURUŞU", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Ceza sahası içindeki beyaz nokta?", correctWord: "PENALTI NOKTASI", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Topun kale çizgisini geçmesi?", correctWord: "GOL", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Ofsayt bayrağını kaldıran hakem?", correctWord: "YAN HAKEM", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Kalecinin oyunu eliyle başlattığı atış?", correctWord: "DEGAJ", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Topun kaleye girmesini engelleyen direkler?", correctWord: "KALE DİREĞİ", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Futbolcunun topa havada ters vuruş yapması?", correctWord: "RÖVEŞATA", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Savunma arkasına atılan sinsi pas?", correctWord: "ARAYA PAS", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Maçın başında yapılan para atışı?", correctWord: "YAZI TURA", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "İki maçlı elemelerde rakip sahada atılan gol kuralı (Eski)?", correctWord: "DEPLASMAN GOLÜ", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Kaleci dışında bir oyuncunun topu elle oynaması?", correctWord: "ELLE OYNAMA", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Bir oyuncunun aynı maçta 3 gol atması?", correctWord: "HATTRICK", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Maçı yöneten en yetkili kişi?", correctWord: "ORTA HAKEM", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Sahaya giren sağlık ekibinin taşıdığı yatak?", correctWord: "SEDYE", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Oyuncu değişikliği tabelasını kaldıran hakem?", correctWord: "DÖRDÜNCÜ HAKEM", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Ceza sahası yayının diğer adı?", correctWord: "CEZA YAYI", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Rakip takımı kendi yarı sahasına hapsetmek?", correctWord: "BASKI KURMAK", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Topun kalecinin bacak arasından girmesi?", correctWord: "BEŞLİK", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Topu rakibin üzerinden aşırtarak geçmek?", correctWord: "ÇALIM", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Kalecinin koruduğu fileli alan?", correctWord: "KALE", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Maçın son düdüğü?", correctWord: "BİTİŞ DÜDÜĞÜ", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Bir ligde sezon sonunda en çok gol atan oyuncu?", correctWord: "GOL KRALI", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Takımların maç öncesi sahaya çıktığı tünel?", correctWord: "SOYUNMA ODASI TÜNELİ", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Topun oyunda olmadığı duran toplar?", correctWord: "DURAN TOP", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Defansın rakibi bilerek ofsaytta bırakması?", correctWord: "OFSAYT TUZAĞI", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Kalecinin pası eline almasının yasak olduğu pas?", correctWord: "GERİ PAS", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Topa kafa ile vurmak?", correctWord: "KAFA VURUŞU", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Sahanın köşesindeki bayrak?", correctWord: "KORNER DİREĞİ", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Futbolcuların giydiği ayakkabı?", correctWord: "KRAMPON", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Takımın sahadaki lideri?", correctWord: "KAPTAN", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Maçın oynandığı zemin?", correctWord: "ÇİM SAHA", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Bir oyuncunun rakibe çift ayakla dalması?", correctWord: "DİREKT KIRMIZI", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Kalecinin topu çelmesi?", correctWord: "KURTARIŞ", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Gol olduktan sonra yapılan sevinç?", correctWord: "GOL SEVİNCİ", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Maçı anlatan kişi?", correctWord: "SPİKER", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Yedek kulübesi?", correctWord: "YEDEK KULÜBESİ", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Sahanın tam ortasındaki yuvarlak?", correctWord: "SANTRA YUVARLAĞI", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Topa çok sert vurmak?", correctWord: "ŞUT ÇEKMEK", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Kaleye 90 tabir edilen yere giden top?", correctWord: "DOKSAN", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Teknik direktörün taktik verdiği alan?", correctWord: "TEKNİK ALAN", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Maç öncesi yapılan ısınma?", correctWord: "ISINMA HAREKETLERİ", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Penaltı vuruşunda kalecinin öne çıkması?", correctWord: "İHLAL", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Rakip oyuncunun formasını çekmek?", correctWord: "FAUL", createdAt: Date.now() },
  { id: uid(), type: 'WORD', question: "Topun kaleye girmeden direkten dönmesi?", correctWord: "DİREKTEN DÖNME", createdAt: Date.now() }
];