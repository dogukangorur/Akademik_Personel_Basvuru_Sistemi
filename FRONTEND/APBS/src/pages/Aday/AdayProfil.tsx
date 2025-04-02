import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import  AnimateHeight  from 'react-animate-height';

const AdayProfil = () => {

    const [active, setActive] = useState<string>('1');
    const togglePara = (value: string) => {
        setActive((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    const egitimTurleri =[
        "Önlisans /lisans dersleri",
        "Önlisans/lisans dersleri (Yabancı dilde)",
        "Lisansüstü dersleri",
        "Lisansüstü dersleri (Yabancı dilde)"
    ];

    const makaleTurleri =[
        "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale(Q1 olarak taranan dergide)",
        "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q2 olarak taranan dergide)",
        "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q3 olarak taranan dergide) ",
        "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q4 olarak taranan dergide)",
        "ESCI tarafından taranan dergilerde yayımlanmış makale",
        "Scopus tarafından taranan dergilerde yayımlanmış makale ",
        "Uluslararası diğer indekslerde taranan dergilerde yayımlanmış makale",
        "ULAKBİM TR Dizin tarafından taranan ulusal hakemli dergilerde yayımlanmış makale ",
        "8. madde dışındaki ulusal hakemli dergilerde yayımlanmış makale "
    ];
    const bilimselToplantiTurleri =[
        "Uluslararası bilimsel toplantılarda sözlü olarak sunulan, tam metni matbu veya elektronik olarak bildiri kitapçığında yayımlanmış çalışmalar",
        "Uluslararası bilimsel toplantılarda sözlü olarak sunulan, özet metni matbu veya elektronik olarak bildiri kitapçığında yayımlanmış çalışmalar ",
        "Uluslararası bilimsel toplantılarda poster olarak sunulan çalışmalar ",
        "Ulusal bilimsel toplantılarda sözlü olarak sunulan, özet metni matbu veya elektronik olarak bildiri kitapçığında yayımlanmış çalışmalar "
    ];
    const kitapTurleri =[
        " Uluslararası yayınevleri tarafından yayımlanmış özgün kitap ",
        " Uluslararası yayınevleri tarafından yayımlanmış özgün kitap editörlüğü, bölüm yazarlığı (Her bir kitap için maksimum 2 bölüm yazarlığı)",
        " Uluslararası yayımlanan ansiklopedi konusu/maddesi (en fazla 3 madde) ",
        " Ulusal yayınevleri tarafından yayımlanmış özgün kitap"
    ];
    const atifTurleri =[
        "SCI-E, SSCI ve AHCI tarafından taranan dergilerde;Uluslararası yayınevleri tarafından yayımlanmış kitaplarda yayımlanan ve adayın yazar olarak yer almadığı yayınlardan her birinde, metin içindeki atıf sayısına bakılmaksızın adayın atıf yapılan her eseri için  ",
        " E-SCI tarafından taranan dergilerde ve adayın yazar olarak yer almadığı yayınlardan her birinde, metin içindeki atıf sayısına bakılmaksızın adayın atıf yapılan her eseri için",
        " SCI-E, SSCI, AHCI, E-SCI dışındaki diğer uluslararası indeksler tarafından taranan dergilerde; Uluslararası yayınevleri tarafından yayımlanmış kitaplarda bölüm yazarı olarak yayımlanan ve adayın yazar olarak yer almadığı yayınlardan her birinde, metin içindeki atıf sayısına bakılmaksızın adayın atıf yapılan her eseri için"
        ];
    const tezTurleri =[
            "Doktora/Sanatta Yeterlik veya Tıp/Diş Hekimliğinde Uzmanlık tez yönetimi  ",
            " Yüksek Lisans Tez Yönetimi  ",
            " Doktora/Sanatta Yeterlik (Eş Danışman) ",
            "Yüksek Lisans/Sanatta Yeterlik Tez Yönetimi (Eş Danışman) "
        ];
        const patentTurleri =[
            "Lisanslanan Uluslararası Patent  ",
            " Tescillenmiş Uluslararası Patent   ",
            " Uluslararası Patent Başvurusu  ",
            " Tescillenmiş Ulusal Patent "
        ];
        const arastirmaTurleri =[
            "AB çerçeve programı/NSF/ERC bilimsel araştırma projesinde koordinatör/alt koordinatör olmak",
            "AB çerçeve programı/NSF/ERC bilimsel araştırma projesinde yürütücü olmak",
            "AB çerçeve programı/NSF/ERC bilimsel araştırma projesinde araştırmacı olmak",
            "AB Çerçeve Programı/NSF/ERC bilimsel araştırma projeleri dışındaki uluslararası destekli bilimsel araştırma projelerinde (derleme ve rapor hazırlama çalışmaları hariç) koordinatör/alt koordinatör olmak "
        ];

        const editorlukTurleri =[
            "SCI-E, SSCI, AHCI veya E-SCI kapsamındaki dergilerde baş editörlük görevinde bulunmak ",
            "SCI-E, SSCI, AHCI veya E-SCI kapsamındaki dergilerde yardımcı/ortak editörlük görevinde bulunmak ",
            "SCI-E, SSCI, AHCI veya E-SCI kapsamındaki dergilerde yayın kurulu üyeliği "
        ];

        const odulTurleri =[
            "Sürekli ve Periyodik olarak Jürili uluslararası bilim ve sanat ödülleri  ",
            "TÜBİTAK tarafından verilen Bilim, Özel ve Hizmet Ödülleri ",
            " TÜBA tarafından verilen Akademi Ödülleri ",
            "TÜBİTAK tarafından verilen Teşvik Ödülü (Yayın teşvik ödülü hariç) "
        ];

        const idariTurleri =[
            "Dekan/Enstitü/Yüksekokul/MYO/Merkez Müdürü",
            "Enstitü Müdür Yrd. / Dekan Yrd. / Yüksekokul Müdür Yrd. / MYO Müdür Yrd. / Merkez Müdürü Yrd./Bölüm Başkanı",
            "Bölüm Başkan Yrd. / Anabilim Dalı Başkanı",
            "Rektörlükçe görevlendirilen Koordinatörlük ",
            "Rektörlükçe görevlendirilen Koordinatör Yardımcıları"
        ];



        const sanatTurleri =[
            "Özgün sanat eserlerinin, tasarım veya yorum çalışmalarının yurt dışında sanat, eğitim ve kültür kurumlarınca satın alınması veya bu eser(ler) için telif ödenmesi (Kurumlar bazında puanlama yapılır)",
            "Özgün sanat eserlerinin, tasarım veya yorum çalışmalarının yurt içinde sanat, eğitim ve kültür kurumlarınca satın alınması veya bu eser(ler) için telif ödenmesi (Kurumlar bazında puanlama yapılır)",
            "Yerel Yönetimler veya Özel Kuruluşların desteklediği kamusal alanda kalıcı olarak gerçekleştirilen sanat projeleri (Heykel, Duvar Resmi / Graffiti, Enstalasyon vb.) (Kurumlar bazında puanlama yapılır)"

        ];


    // Makaleler
    const [articles, setArticles] = useState([
        { id: 1, author: "", title: "", journal: "", volume: "", pages: "", year: "", file: null, isBaslicaYazar: false }
      ]);

    const addArticle = () => {
        setArticles([...articles, { id: Date.now(), author: "", title: "", journal: "", volume: "", pages: "", year: "", file: null, isBaslicaYazar: false}]);
      };
       
    const updateArticle = (id: number, field: string, value: any) => {
        setArticles(articles.map(article => (article.id === id ? { ...article, [field]: value } : article)));
      };

    const removeArticle = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
      };

  // Bilimsel Toplantı Faaliyetleri

  const [conferences, setConferences] = useState([
    { id: 1, author: "", paperTitle: "", conferenceName: "", location: "", pages: "", date: "", isBaslicaYazar: false  }
  ]);


  const addConference = () => {
    setConferences([...conferences, { id: Date.now(), author: "", paperTitle: "", conferenceName: "", location: "", pages: "", date: "", isBaslicaYazar: false }]);
  };

 
  const updateConference = (id: number, field: string, value: any) => {
    setConferences(conferences.map(conf => (conf.id === id ? { ...conf, [field]: value } : conf)));
  };

  
  const removeConference = (id: number) => {
    setConferences(conferences.filter(conf => conf.id !== id));
  };

  // Kitaplar

  const [kitaplar, setKitaplar] = useState([
    { id: 1, author: "", kitapAdi: "", yayinEvi: "", baskiSayisi: "", yayimlandigiYer: "" ,yil:"",isBaslicaYazar: false }
  ]);

  const addKitaplar = () => {
    setKitaplar([...kitaplar, { id: Date.now(), author: "", kitapAdi: "", yayinEvi: "", baskiSayisi: "", yayimlandigiYer: "" , yil:"" ,isBaslicaYazar: false }]);
  };

  const updateKitaplar = (id: number, field: string, value: any) => {
    setKitaplar(kitaplar.map(kitap => (kitap.id === id ? { ...kitap, [field]: value } : kitap)));
  };

  const removeKitaplar = (id: number) => {
    setKitaplar(kitaplar.filter(kitap => kitap.id !== id));
  };


  // Atıflar

  const [atiflar, setAtiflar] = useState([
    { id: 1, atifinYapildigiEser: "", atifSayisi: ""}
  ]);

  const addAtiflar = () => {
    setAtiflar([...atiflar, { id: Date.now(),atifinYapildigiEser: "", atifSayisi: ""}]);
  };

  const updateAtiflar = (id: number, field: string, value: any) => {
    setAtiflar(atiflar.map(atif => (atif.id === id ? { ...atif, [field]: value } : atif)));
  };

  const removeAtiflar = (id: number) => {
    setAtiflar(atiflar.filter(atif => atif.id !== id));
  };

  // Eğitim Faaliyetleri

  const [egitimFaaliyet, setEgitimFaaliyetler] = useState([
    { id: 1, dersinAdi: "", programinAdi: "",donemi:"",yil:""}
  ]);

  const addEgitimFaaliyetler = () => {
    setEgitimFaaliyetler([...egitimFaaliyet, { id: Date.now(),dersinAdi: "", programinAdi: "",donemi:"",yil:""}]);
  };

  const updateEgitimFaaliyetler = (id: number, field: string, value: any) => {
    setEgitimFaaliyetler(egitimFaaliyet.map(egitimF => (egitimF.id === id ? { ...egitimF, [field]: value } : egitimF)));
  };

  const removeEgitimFaaliyetler = (id: number) => {
    setEgitimFaaliyetler(egitimFaaliyet.filter(egitimF => egitimF.id !== id));
  };

 // Tez Yönetmeciği

  const [tezYonetmeciligi, setTezYonetmeciligi] = useState([
    { id: 1, ogrenciAdi: "", tezAdi: "",enstutu:"",yil:""}
  ]);

  const addtezYonetmeciligi = () => {
    setTezYonetmeciligi([...tezYonetmeciligi, { id: Date.now(), ogrenciAdi: "", tezAdi: "",enstutu:"",yil:""}]);
  };

  const updateTezYonetmeciligi = (id: number, field: string, value: any) => {
    setTezYonetmeciligi(tezYonetmeciligi.map(tez => (tez.id === id ? { ...tez, [field]: value } : tez)));
  };

  const removeTezYonetmeciligi = (id: number) => {
    setTezYonetmeciligi(tezYonetmeciligi.filter(tez => tez.id !== id));
  };


 // Patentler

  const [patentler, setPatentler] = useState([
    { id: 1, patentAdi: "", yil:"",isBaslicaYazar: false}
  ]);

  const addPatentler = () => {
    setPatentler([...patentler, { id: Date.now(), patentAdi: "", yil:"",isBaslicaYazar: false}]);
  };

  const updatePatentler = (id: number, field: string, value: any) => {
    setPatentler(patentler.map(tez => (tez.id === id ? { ...tez, [field]: value } : tez)));
  };

  const removePatentler = (id: number) => {
    setPatentler(patentler.filter(tez => tez.id !== id));
  };

   // Araştırma Projeler

   const [arastirmaProje, setArastirmaProjeler] = useState([
    { id: 1, projeAdi: "", projeNumarasi:"",projeKurumAdi:"",yil:""}
  ]);

  const addArastirmaProjeler = () => {
    setArastirmaProjeler([...arastirmaProje, { id: Date.now(), projeAdi: "", projeNumarasi:"",projeKurumAdi:"",yil:""}]);
  };

  const updateArastirmaProjeler = (id: number, field: string, value: any) => {
    setArastirmaProjeler(arastirmaProje.map(arastirma => (arastirma.id === id ? { ...arastirma, [field]: value } : arastirma)));
  };

  const removeArastirmaProjeler = (id: number) => {
    setArastirmaProjeler(arastirmaProje.filter(arastirma => arastirma.id !== id));
  };

  
   // Editörlük

   const [editorluk, setEditorluk] = useState([
    { id: 1, dergiAdi: "", dergiSayisi:"",projeKurumAdi:"",yil:""}
  ]);

  const addEditorluk = () => {
    setEditorluk([...editorluk, { id: Date.now(), dergiAdi: "", dergiSayisi:"",projeKurumAdi:"",yil:""}]);
  };

  const updateEditorluk = (id: number, field: string, value: any) => {
    setEditorluk(editorluk.map(editor => (editor.id === id ? { ...editor, [field]: value } : editor)));
  };

  const removeEditorluk = (id: number) => {
    setEditorluk(editorluk.filter(editor => editor.id !== id));
  };

  // Ödüller

    const [oduller, setOduller] = useState([
        { id: 1, kurumAdi: "",yil:""}
      ]);
    
      const addOduller = () => {
        setOduller([...oduller, { id: Date.now(), kurumAdi: "",yil:""}]);
      };
    
      const updateOduller = (id: number, field: string, value: any) => {
        setOduller(oduller.map(odul => (odul.id === id ? { ...odul, [field]: value } : odul)));
      };
    
      const removeOduller = (id: number) => {
        setOduller(oduller.filter(odul => odul.id !== id));
      };

  // Idari görevler

    const [idariGorev, setIdariGorevler] = useState([
        { id: 1, gorevBirimi: "",yil:""}
      ]);
    
      const addIdariGorevler = () => {
        setIdariGorevler([...idariGorev, { id: Date.now(), gorevBirimi: "",yil:""}]);
      };
    
      const updateIdariGorevler = (id: number, field: string, value: any) => {
        setIdariGorevler(idariGorev.map(gorev => (gorev.id === id ? { ...gorev, [field]: value } : gorev)));
      };
    
      const removeIdariGorevler = (id: number) => {
        setIdariGorevler(idariGorev.filter(gorev => gorev.id !== id));
      };

   // Güzel Sanatlar

   const [guzelSanat, setGuzelSanatlar] = useState([
    { id: 1, faaliyetAdi: "",yil:""}
  ]);

  const addGuzelSanatlar = () => {
    setGuzelSanatlar([...guzelSanat, { id: Date.now(), faaliyetAdi: "",yil:""}]);
  };

  const updateGuzelSanatlar = (id: number, field: string, value: any) => {
    setGuzelSanatlar(guzelSanat.map(sanat => (sanat.id === id ? { ...sanat, [field]: value } : sanat)));
  };

  const removeGuzelSanatlar = (id: number) => {
    setGuzelSanatlar(guzelSanat.filter(sanat => sanat.id !== id));
  };     
    return (
        <div>
            <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full">
                <div className="flex flex-col pb-2">
                    <div className="mb-5">
                        <div className="space-y-2 font-semibold">
                            {/* Makaleler */}

                            <div className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] `}
                                    onClick={() => togglePara('1')}
                                >
                                    MAKALELER
                                    <div className={`ltr:ml-auto rtl:mr-auto `}>
                                        
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '1' ? 'auto' : 0}>
                                        <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                                
                                        {articles.map((article, index) => (

                                                
                                            <div key={article.id} className="p-4 border rounded-lg mb-4 bg-gray-100 relative">
                                            {/* Kaldır Butonu */}
                                            <button
                                                onClick={() => removeArticle(article.id)}
                                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                                            >
                                                Kaldır
                                            </button>

                                            <h3 className="text-md font-semibold mb-2">Makale {index + 1}</h3>

                                            <select className="form-input mb-3">
                                            <option>Faaliyet Türü</option>
                                            {makaleTurleri.map((faaliyet, index) => (
                                                 <option>{faaliyet}</option>
                                            ))}
                                            </select>

                                            <input
                                                type="text"
                                                placeholder="Yazar/Yazarlar"
                                                className="form-input mb-3"
                                                value={article.author}
                                                onChange={(e) => updateArticle(article.id, "author", e.target.value)}
                                            />
                                            
                                            <input
                                                type="text"
                                                placeholder="Makale Adı"
                                               className="form-input mb-3"
                                                value={article.title}
                                                onChange={(e) => updateArticle(article.id, "title", e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Dergi Adı"
                                               className="form-input mb-3"
                                                value={article.journal}
                                                onChange={(e) => updateArticle(article.id, "journal", e.target.value)}
                                            />

                                            <div className="flex gap-2 mt-2">
                                                <input
                                                type="text"
                                                placeholder="Cilt No."
                                                className="form-input mb-3"
                                                value={article.volume}
                                                onChange={(e) => updateArticle(article.id, "volume", e.target.value)}
                                                />
                                                <input
                                                type="text"
                                                placeholder="Sayfa"
                                                className="form-input mb-3"
                                                value={article.pages}
                                                onChange={(e) => updateArticle(article.id, "pages", e.target.value)}
                                                />
                                                <input
                                                type="text"
                                                placeholder="Yıl"
                                                className="form-input mb-3"
                                                value={article.year}
                                                onChange={(e) => updateArticle(article.id, "year", e.target.value)}
                                                />
                                            </div>
                                            <div className="flex gap-2 mt-2">
                                            <label className="flex items-center cursor-pointer">
                                                Başlıca Yazar mı?
                                                <input
                                                type="checkbox"
                                                className="form-checkbox ml-3"
                                                checked={article.isBaslicaYazar}
                                                onChange={(e) => updateArticle(article.id, 'isBaslicaYazar', e.target.checked)}
                                                />
                                            </label>

                                            <select className="form-input mb-3">
                                                <option>Kişi Sayısı</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5-9</option>
                                                <option>10+</option>
                                             </select>
                                            </div>    

                                            <input
                                                type="file"
                                                className="form-input mb-3"
                                                onChange={(e) => updateArticle(article.id, "file", e.target.files?.[0] || null)}
                                            />
                                            </div>
                                        ))}   

                                         {/* Yeni Form Ekleme Butonu */}
                                            <button
                                                onClick={addArticle}
                                                className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
                                            >
                                                + Ekle
                                            </button>
                                            <button
                                                className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600"
                                            >
                                                Kaydet
                                            </button>

                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>

                            {/* Bilimsel Toplantı Faaliyetleri */}

                            <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] `}
                                    onClick={() => togglePara('2')}
                                >
                                    BİLİMSEL TOPLANTI FAALİYETLERİ
                                    <div className={`ltr:ml-auto rtl:mr-auto `}>
                                       
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '2' ? 'auto' : 0}>
                                        <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                        {conferences.map((conf, index) => (
                                            <div key={conf.id} className="p-4 border rounded-lg mb-4 bg-gray-100 relative">
                                            {/* Kaldır Butonu */}
                                            <button
                                                onClick={() => removeConference(conf.id)}
                                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                                            >
                                                Kaldır
                                            </button>

                                            <h3 className="text-md font-semibold">Bildiri {index + 1}</h3>

                                            <select className="form-input mb-3">
                                            <option>Faaliyet Türü</option>
                                            {bilimselToplantiTurleri.map((faaliyet, index) => (
                                                 <option>{faaliyet}</option>
                                            ))}
                                            </select>


                                            <input
                                                type="text"
                                                placeholder="Yazar/Yazarlar"
                                                className="form-input mb-3"
                                                value={conf.author}
                                                onChange={(e) => updateConference(conf.id, "author", e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Bildiri Adı"
                                                className="form-input mb-3"
                                                value={conf.paperTitle}
                                                onChange={(e) => updateConference(conf.id, "paperTitle", e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Konferansın Adı"
                                                className="form-input mb-3"
                                                value={conf.conferenceName}
                                                onChange={(e) => updateConference(conf.id, "conferenceName", e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Yapıldığı Yer"
                                                className="form-input mb-3"
                                                value={conf.location}
                                                onChange={(e) => updateConference(conf.id, "location", e.target.value)}
                                            />

                                            <div className="flex gap-2 mt-2">
                                                <input
                                                type="text"
                                                placeholder="Sayfa Sayıları"
                                                className="form-input mb-3"
                                                value={conf.pages}
                                                onChange={(e) => updateConference(conf.id, "pages", e.target.value)}
                                                />
                                                <input
                                                type="date"
                                                placeholder="Tarih"
                                                className="form-input mb-3"
                                                value={conf.date}
                                                onChange={(e) => updateConference(conf.id, "date", e.target.value)}
                                                />
                                            </div>
                                            <div className="flex gap-2 mt-2">
                                            <label className="flex items-center cursor-pointer">
                                                Başlıca Yazar mı?
                                                <input
                                                type="checkbox"
                                                className="form-checkbox ml-3"
                                                checked={conf.isBaslicaYazar}
                                                onChange={(e) => updateConference(conf.id, 'isBaslicaYazar', e.target.checked)}
                                                />
                                            </label>

                                            <select className="form-input mb-3">
                                                <option>Kişi Sayısı</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5-9</option>
                                                <option>10+</option>
                                             </select>
                                            </div>  
                                            <input
                                                type="file"
                                                className="form-input mb-3"
                                                onChange={(e) => updateArticle(conf.id, "file", e.target.files?.[0] || null)}
                                            />
                                            
                                            </div>
                                        ))}

                                     
                                        <button
                                            onClick={addConference}
                                            className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
                                        >
                                            + Ekle
                                        </button>
                                       
                                        <button
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600"
                                        >
                                            Kaydet
                                        </button>
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>

                            {/* Kitaplar */}

                            <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] `}
                                    onClick={() => togglePara('3')}
                                >
                                    KİTAPLAR<em>( Yabancı dildeki kitapların puanları 1.5 ile çarpıldıktan sonra hesaplama kullanılır. )</em>
                                    <div className={`ltr:ml-auto rtl:mr-auto `}>
                                       
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '3' ? 'auto' : 0}>
                                        <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                        {kitaplar.map((kitap, index) => (
                                            <div key={kitap.id} className="p-4 border rounded-lg mb-4 bg-gray-100 relative">
                                            {/* Kaldır Butonu */}
                                            <button
                                                onClick={() => removeKitaplar(kitap.id)}
                                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                                            >
                                                Kaldır
                                            </button>

                                            <h3 className="text-md font-semibold">Kitap {index + 1}</h3>

                                            <select className="form-input mb-3">
                                            <option>Faaliyet Türü</option>
                                            {kitapTurleri.map((faaliyet, index) => (
                                                 <option>{faaliyet}</option>
                                            ))}
                                            </select>

                                            <input
                                                type="text"
                                                placeholder="Yazar/Yazarlar"
                                                className="form-input mb-3"
                                                value={kitap.author}
                                                onChange={(e) => updateConference(kitap.id, "author", e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Kitap Adı"
                                                className="form-input mb-3"
                                                value={kitap.kitapAdi}
                                                onChange={(e) => updateConference(kitap.id, "paperTitle", e.target.value)}
                                            />


                                            <input
                                                type="text"
                                                placeholder="Yayımlandığı Yer"
                                                className="form-input mb-3"
                                                value={kitap.yayimlandigiYer}
                                                onChange={(e) => updateConference(kitap.id, "location", e.target.value)}
                                            />

                                            <div className="flex gap-2 mt-2">
                                                <input
                                                type="text"
                                                placeholder="Baskı Sayısı"
                                                className="form-input mb-3"
                                                value={kitap.baskiSayisi}
                                                onChange={(e) => updateConference(kitap.id, "pages", e.target.value)}
                                                />
                                                <input
                                                type="date"
                                                placeholder="Yıl"
                                                className="w-1/2 p-2 border rounded"
                                                value={kitap.yil}
                                                onChange={(e) => updateConference(kitap.id, "date", e.target.value)}
                                                />
                                            </div>

                                            <div className="flex gap-2 mt-2">
                                            <label className="flex items-center cursor-pointer">
                                                Başlıca Yazar mı?
                                                <input
                                                type="checkbox"
                                                className="form-checkbox ml-3"
                                                checked={kitap.isBaslicaYazar}
                                                onChange={(e) => updateArticle(kitap.id, 'isBaslicaYazar', e.target.checked)}
                                                />
                                            </label>

                                            <select className="form-input mb-3">
                                                <option>Kişi Sayısı</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5-9</option>
                                                <option>10+</option>
                                             </select>
                                            </div>      


                                            <input
                                                type="file"
                                                className="form-input mb-3"
                                                onChange={(e) => updateArticle(kitap.id, "file", e.target.files?.[0] || null)}
                                            />
                                            </div>
                                        ))}

                                     
                                        <button
                                            onClick={addKitaplar}
                                            className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
                                        >
                                            + Ekle
                                        </button>
                                       
                                        <button
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600"
                                        >
                                            Kaydet
                                        </button>
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>

                            {/* Atıflar */}

                            <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] `}
                                    onClick={() => togglePara('4')}
                                    >
                                     ATIFLAR <em>( Atıf yapan eserlerin belgelenmesi kaydıyla, bu yönetmeliğin Temel İlkeler bölümündeki atıflara ilişkin 
                                        açıklamalar dikkate alınır )</em>         
                                    <div className={`ltr:ml-auto rtl:mr-auto `}>
                                       
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '4' ? 'auto' : 0}>
                                        <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                        {atiflar.map((atif, index) => (
                                            <div key={atif.id} className="p-4 border rounded-lg mb-4 bg-gray-100 relative">
                                            {/* Kaldır Butonu */}
                                            <button
                                                onClick={() => removeAtiflar(atif.id)}
                                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                                            >
                                                Kaldır
                                            </button>

                                            <h3 className="text-md font-semibold">Atıf {index + 1}</h3>

                                            <select className="form-input mb-3">
                                            <option>Faaliyet Türü</option>
                                            {atifTurleri.map((faaliyet, index) => (
                                                 <option>{faaliyet}</option>
                                            ))}
                                            </select>
                                            
                                            <input
                                                type="text"
                                                placeholder="Yazar/Yazarlar"
                                                className="form-input mb-3"
                                                value={atif.atifinYapildigiEser}
                                                onChange={(e) => updateAtiflar(atif.id, "atifinYapildigiEser", e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Yayımlandığı Yer"
                                                className="form-input mb-3"
                                                value={atif.atifSayisi}
                                                onChange={(e) => updateAtiflar(atif.id, "atifSayisi", e.target.value)}
                                            />


                                            <input
                                                type="file"
                                                className="form-input mb-3"
                                                onChange={(e) => updateArticle(atif.id, "file", e.target.files?.[0] || null)}
                                            />   


                                            </div>
                                            
                                        ))}

                                     
                                        <button
                                            onClick={addAtiflar}
                                            className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
                                        >
                                            + Ekle
                                        </button>
                                       
                                        <button
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600"
                                        >
                                            Kaydet
                                        </button>
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>

                            {/* Eğitim Faaliyetleri */ }            
                            <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] `}
                                    onClick={() => togglePara('5')}
                                >
                                    EĞİTİM ÖĞRETİM FAALİYETLERİ <em>(Son üç yılda verdiği aynı veya farklı dersler, Azami 50 puan, doktora 
                                        unvanından sonra) </em>

                                    <div className={`ltr:ml-auto rtl:mr-auto `}>
                                       
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '5' ? 'auto' : 0}>
                                        <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                        {egitimFaaliyet.map((egitim, index) => (
                                            <div key={egitim.id} className="p-4 border rounded-lg mb-4 bg-gray-100 relative">
                                            {/* Kaldır Butonu */}
                                            <button
                                                onClick={() => removeEgitimFaaliyetler(egitim.id)}
                                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                                            >
                                                Kaldır
                                            </button>

                                            <h3 className="text-md font-semibold">Eğitim Faaliyeti {index + 1}</h3>
                                            <select className="form-input mb-3">
                                            <option>Faaliyet Türü</option>
                                            {egitimTurleri.map((faaliyet, index) => (
                                                 <option>{faaliyet}</option>
                                            ))}
                                             </select>
                                            <input
                                                type="text"
                                                placeholder="Programın Adı"
                                                className="form-input mb-3"
                                                value={egitim.programinAdi}
                                                onChange={(e) => updateEgitimFaaliyetler(egitim.id, "atifinYapildigiEser", e.target.value)}
                                            />


                                            <input
                                                type="text"
                                                placeholder="Dersin Adı"
                                                className="form-input mb-3"
                                                value={egitim.dersinAdi}
                                                onChange={(e) => updateEgitimFaaliyetler(egitim.id, "atifSayisi", e.target.value)}
                                            />


                                            <input
                                                type="text"
                                                placeholder="Eğitim Dönemi"
                                                className="form-input mb-3"
                                                value={egitim.donemi}
                                                onChange={(e) => updateEgitimFaaliyetler(egitim.id, "atifSayisi", e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Eğitim Yılı"
                                                className="form-input mb-3"
                                                value={egitim.yil}
                                                onChange={(e) => updateEgitimFaaliyetler(egitim.id, "atifSayisi", e.target.value)}
                                            />

                                            <input
                                                type="file"
                                                className="form-input mb-3"
                                                onChange={(e) => updateEgitimFaaliyetler(egitim.id, "file", e.target.files?.[0] || null)}
                                            />   


                                            </div>
                                            
                                        ))}

                                     
                                        <button
                                            onClick={addAtiflar}
                                            className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
                                        >
                                            + Ekle
                                        </button>
                                       
                                        <button
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600"
                                        >
                                            Kaydet
                                        </button>
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>



                             {/* Tez Yönetmeciliği */}               
                            <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] `}
                                    onClick={() => togglePara('6')}
                                >
                                    TEZ YÖNETİCİLİĞİ <em> (Tamamlanmış olması kaydıyla) </em>
                                    <div className={`ltr:ml-auto rtl:mr-auto `}>
                                       
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '6' ? 'auto' : 0}>
                                        <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                        {tezYonetmeciligi.map((tez, index) => (
                                            <div key={tez.id} className="p-4 border rounded-lg mb-4 bg-gray-100 relative">
                                            {/* Kaldır Butonu */}
                                            <button
                                                onClick={() => removeTezYonetmeciligi(tez.id)}
                                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                                            >
                                                Kaldır
                                            </button>

                                            <h3 className="text-md font-semibold">Eğitim Faaliyeti {index + 1}</h3>
                                            <select className="form-input mb-3">
                                            <option>Faaliyet Türü</option>
                                            {tezTurleri.map((faaliyet, index) => (
                                                 <option>{faaliyet}</option>
                                            ))}
                                             </select>
                                            <input
                                                type="text"
                                                placeholder="Öğrenci Adı"
                                                className="form-input mb-3"
                                                value={tez.ogrenciAdi}
                                                onChange={(e) => updateTezYonetmeciligi(tez.id, "atifinYapildigiEser", e.target.value)}
                                            />


                                            <input
                                                type="text"
                                                placeholder="Tez Adı"
                                                className="form-input mb-3"
                                                value={tez.tezAdi}
                                                onChange={(e) => updateTezYonetmeciligi(tez.id, "atifSayisi", e.target.value)}
                                            />


                                            <input
                                                type="text"
                                                placeholder="Enstütü"
                                                className="form-input mb-3"
                                                value={tez.enstutu}
                                                onChange={(e) => updateTezYonetmeciligi(tez.id, "atifSayisi", e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Tez Yılı"
                                                className="form-input mb-3"
                                                value={tez.yil}
                                                onChange={(e) => updateTezYonetmeciligi(tez.id, "atifSayisi", e.target.value)}
                                            />

                                            <input
                                                type="file"
                                                className="form-input mb-3"
                                                onChange={(e) => updateTezYonetmeciligi(tez.id, "file", e.target.files?.[0] || null)}
                                            />   


                                            </div>
                                            
                                        ))}

                                     
                                        <button
                                            onClick={addtezYonetmeciligi}
                                            className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
                                        >
                                            + Ekle
                                        </button>
                                       
                                        <button
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600"
                                        >
                                            Kaydet
                                        </button>
                 
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>



                            {/* Patent */}         
                            <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] `}
                                    onClick={() => togglePara('7')}
                                >
                                     PATENTLER <em>(Aynı faaliyet sadece bir maddede puanlanır)</em>     
                                    <div className={`ltr:ml-auto rtl:mr-auto `}>
                                       
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '7' ? 'auto' : 0}>
                                        <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                        {patentler.map((patent, index) => (
                                            <div key={patent.id} className="p-4 border rounded-lg mb-4 bg-gray-100 relative">
                                            {/* Kaldır Butonu */}
                                            <button
                                                onClick={() => removePatentler(patent.id)}
                                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                                            >
                                                Kaldır
                                            </button>

                                            <h3 className="text-md font-semibold">Patent {index + 1}</h3>
                                            <select className="form-input mb-3">
                                            <option>Faaliyet Türü</option>
                                            {patentTurleri.map((faaliyet, index) => (
                                                 <option>{faaliyet}</option>
                                            ))}
                                             </select>
                                            <input
                                                type="text"
                                                placeholder="Patent Adı"
                                                className="form-input mb-3"
                                                value={patent.patentAdi}
                                                onChange={(e) => updatePatentler(patent.id, "patentAdi", e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Yılı"
                                                className="form-input mb-3"
                                                value={patent.yil}
                                                onChange={(e) => updatePatentler(patent.id, "yil", e.target.value)}
                                            />
                                           <div className="flex gap-2 mt-2">
                                            <label className="flex items-center cursor-pointer">
                                                Başlıca Yazar mı?
                                                <input
                                                type="checkbox"
                                                className="form-checkbox ml-3"
                                                checked={patent.isBaslicaYazar}
                                                onChange={(e) => updatePatentler(patent.id, 'isBaslicaYazar', e.target.checked)}
                                                />
                                            </label>

                                            <select className="form-input mb-3">
                                                <option>Kişi Sayısı</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5-9</option>
                                                <option>10+</option>
                                             </select>
                                            </div>
                                            <input
                                                type="file"
                                                className="form-input mb-3"
                                                onChange={(e) => updatePatentler(patent.id, "file", e.target.files?.[0] || null)}
                                            />   


                                            </div>
                                            
                                        ))}

                                     
                                        <button
                                            onClick={addPatentler}
                                            className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
                                        >
                                            + Ekle
                                        </button>
                                       
                                        <button
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600"
                                        >
                                            Kaydet
                                        </button>
                 
                 
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>




                            {/* Araştırma Projeleri */}  
                            <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] `}
                                    onClick={() => togglePara('8')}
                                    >
                                     ARAŞTIRMA PROJELERİ        

                                    <div className={`ltr:ml-auto rtl:mr-auto `}>
                                       
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '8' ? 'auto' : 0}>
                                        <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                           {arastirmaProje.map((arastirma, index) => (
                                            <div key={arastirma.id} className="p-4 border rounded-lg mb-4 bg-gray-100 relative">
                                            {/* Kaldır Butonu */}
                                            <button
                                                onClick={() => removeArastirmaProjeler(arastirma.id)}
                                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                                            >
                                                Kaldır
                                            </button>

                                            <h3 className="text-md font-semibold">Arastirma Proje {index + 1}</h3>
                                            <select className="form-input mb-3">
                                            <option>Faaliyet Türü</option>
                                            {arastirmaTurleri.map((faaliyet, index) => (
                                                 <option>{faaliyet}</option>
                                            ))}
                                             </select>
                                            <input
                                                type="text"
                                                placeholder="Proje Adı"
                                                className="form-input mb-3"
                                                value={arastirma.projeAdi}
                                                onChange={(e) => updateArastirmaProjeler(arastirma.id, "atifinYapildigiEser", e.target.value)}
                                            />


                                            <input
                                                type="text"
                                                placeholder="Kurum Adı"
                                                className="form-input mb-3"
                                                value={arastirma.projeKurumAdi}
                                                onChange={(e) => updateArastirmaProjeler(arastirma.id, "atifSayisi", e.target.value)}
                                            />


                                            <input
                                                type="text"
                                                placeholder="Proje Numarası"
                                                className="form-input mb-3"
                                                value={arastirma.projeNumarasi}
                                                onChange={(e) => updateArastirmaProjeler(arastirma.id, "atifSayisi", e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Araştırma Yılı"
                                                className="form-input mb-3"
                                                value={arastirma.yil}
                                                onChange={(e) => updateArastirmaProjeler(arastirma.id, "atifSayisi", e.target.value)}
                                            />

                                            <input
                                                type="file"
                                                className="form-input mb-3"
                                                onChange={(e) => updateArastirmaProjeler(arastirma.id, "file", e.target.files?.[0] || null)}
                                            />   


                                            </div>
                                            
                                        ))}

                                     
                                        <button
                                            onClick={addArastirmaProjeler}
                                            className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
                                        >
                                            + Ekle
                                        </button>
                                       
                                        <button
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600"
                                        >
                                            Kaydet
                                        </button>
                 
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>




                            {/* Editörlük */}  
                            <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] `}
                                    onClick={() => togglePara('9')}
                                    >
                                    EDİTÖRLÜK, YAYIN KURULU ÜYELİĞİ VE HAKEMLİK FAALİYETLERİ 
                                    <div className={`ltr:ml-auto rtl:mr-auto `}>
                                       
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '9' ? 'auto' : 0}>
                                        <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                        {editorluk.map((editor, index) => (
                                            <div key={editor.id} className="p-4 border rounded-lg mb-4 bg-gray-100 relative">
                                            {/* Kaldır Butonu */}
                                            <button
                                                onClick={() => removeEditorluk(editor.id)}
                                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                                            >
                                                Kaldır
                                            </button>

                                            <h3 className="text-md font-semibold">Editörlük {index + 1}</h3>
                                            <select className="form-input mb-3">
                                            <option>Faaliyet Türü</option>
                                            {editorlukTurleri.map((faaliyet, index) => (
                                                 <option>{faaliyet}</option>
                                            ))}
                                             </select>
                                            <input
                                                type="text"
                                                placeholder="Dergi Adi"
                                                className="form-input mb-3"
                                                value={editor.dergiAdi}
                                                onChange={(e) => updateArastirmaProjeler(editor.id, "atifinYapildigiEser", e.target.value)}
                                            />


                                            <input
                                                type="text"
                                                placeholder="Dergi Sayisi"
                                                className="form-input mb-3"
                                                value={editor.dergiSayisi}
                                                onChange={(e) => updateArastirmaProjeler(editor.id, "atifSayisi", e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Dergi Yılı"
                                                className="form-input mb-3"
                                                value={editor.yil}
                                                onChange={(e) => updateArastirmaProjeler(editor.id, "atifSayisi", e.target.value)}
                                            />

                                            <input
                                                type="file"
                                                className="form-input mb-3"
                                                onChange={(e) => updateArastirmaProjeler(editor.id, "file", e.target.files?.[0] || null)}
                                            />   


                                            </div>
                                            
                                        ))}

                                     
                                        <button
                                            onClick={addEditorluk}
                                            className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
                                        >
                                            + Ekle
                                        </button>
                                       
                                        <button
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600"
                                        >
                                            Kaydet
                                        </button>
                 
                 
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>


                            {/* Ödüller */} 
                            <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] `}
                                    onClick={() => togglePara('10')}
                                >
                                    ÖDÜLLER (Temel alanı ile ilgili olmak üzere)     
                                    <div className={`ltr:ml-auto rtl:mr-auto `}>
                                       
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '10' ? 'auto' : 0}>
                                        <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                        {oduller.map((odul, index) => (
                                            <div key={odul.id} className="p-4 border rounded-lg mb-4 bg-gray-100 relative">
                                            {/* Kaldır Butonu */}
                                            <button
                                                onClick={() => removeOduller(odul.id)}
                                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                                            >
                                                Kaldır
                                            </button>

                                            <h3 className="text-md font-semibold">Ödül {index + 1}</h3>
                                            <select className="form-input mb-3">
                                            <option>Faaliyet Türü</option>
                                            {odulTurleri.map((faaliyet, index) => (
                                                 <option>{faaliyet}</option>
                                            ))}
                                             </select>
                                            <input
                                                type="text"
                                                placeholder="Kurum Adi"
                                                className="form-input mb-3"
                                                value={odul.kurumAdi}
                                                onChange={(e) => updateOduller(odul.id, "atifinYapildigiEser", e.target.value)}
                                            />


                                            

                                            <input
                                                type="text"
                                                placeholder="Odul Yılı"
                                                className="form-input mb-3"
                                                value={odul.yil}
                                                onChange={(e) => updateOduller(odul.id, "atifSayisi", e.target.value)}
                                            />

                                            <input
                                                type="file"
                                                className="form-input mb-3"
                                                onChange={(e) => updateOduller(odul.id, "file", e.target.files?.[0] || null)}
                                            />   


                                            </div>
                                            
                                        ))}

                                     
                                        <button
                                            onClick={addOduller}
                                            className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
                                        >
                                            + Ekle
                                        </button>
                                       
                                        <button
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600"
                                        >
                                            Kaydet
                                        </button>
                 
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>



                            {/* İdari Görevler */} 
                            <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] `}
                                    onClick={() => togglePara('11')}
                                >
                                   İDARİ GÖREVLER VE ÜNİVERSİTEYE KATKI FAALİYETLERİ
                                    <div className={`ltr:ml-auto rtl:mr-auto `}>
                                       
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '11' ? 'auto' : 0}>
                                        <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                           {idariGorev.map((idariGorev, index) => (
                                            <div key={idariGorev.id} className="p-4 border rounded-lg mb-4 bg-gray-100 relative">
                                            {/* Kaldır Butonu */}
                                            <button
                                                onClick={() => removeIdariGorevler(idariGorev.id)}
                                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                                            >
                                                Kaldır
                                            </button>

                                            <h3 className="text-md font-semibold">Ödül {index + 1}</h3>
                                            <select className="form-input mb-3">
                                            <option>Faaliyet Türü</option>
                                            {idariTurleri.map((faaliyet, index) => (
                                                 <option>{faaliyet}</option>
                                            ))}
                                             </select>
                                            <input
                                                type="text"
                                                placeholder="Görev Birimi"
                                                className="form-input mb-3"
                                                value={idariGorev.gorevBirimi}
                                                onChange={(e) => updateOduller(idariGorev.id, "atifinYapildigiEser", e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Odul Yılı"
                                                className="form-input mb-3"
                                                value={idariGorev.yil}
                                                onChange={(e) => updateOduller(idariGorev.id, "atifSayisi", e.target.value)}
                                            />

                                            <input
                                                type="file"
                                                className="form-input mb-3"
                                                onChange={(e) => updateOduller(idariGorev.id, "file", e.target.files?.[0] || null)}
                                            />   

                                            </div>
                                            
                                        ))}

                                     
                                        <button
                                            onClick={addIdariGorevler}
                                            className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
                                        >
                                            + Ekle
                                        </button>
                                       
                                        <button
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600"
                                        >
                                            Kaydet
                                        </button>
                 
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>



                            {/* Güzel Sanatlar */} 
                            <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                <button
                                    type="button"
                                    className={`p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b] `}
                                    onClick={() => togglePara('12')}
                                >
                                    GÜZEL SANATLAR FAALİYETLERİ <em>(Konservatuvar dahil)</em>                                         
                                    <div className={`ltr:ml-auto rtl:mr-auto `}>
                                       
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active === '12' ? 'auto' : 0}>
                                        <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                        {guzelSanat.map((sanat, index) => (
                                            <div key={sanat.id} className="p-4 border rounded-lg mb-4 bg-gray-100 relative">
                                            {/* Kaldır Butonu */}
                                            <button
                                                onClick={() => removeGuzelSanatlar(sanat.id)}
                                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                                            >
                                                Kaldır
                                            </button>

                                            <h3 className="text-md font-semibold">Güzel Sanatlar {index + 1}</h3>
                                            <select className="form-input mb-3">
                                            <option>Faaliyet Türü</option>
                                            {sanatTurleri.map((faaliyet, index) => (
                                                 <option>{faaliyet}</option>
                                            ))}
                                             </select>
                                            <input
                                                type="text"
                                                placeholder="Faaliyet Adı"
                                                className="form-input mb-3"
                                                value={sanat.faaliyetAdi}
                                                onChange={(e) => updateGuzelSanatlar(sanat.id, "atifinYapildigiEser", e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Odul Yılı"
                                                className="form-input mb-3"
                                                value={sanat.yil}
                                                onChange={(e) => updateGuzelSanatlar(sanat.id, "atifSayisi", e.target.value)}
                                            />

                                            <input
                                                type="file"
                                                className="form-input mb-3"
                                                onChange={(e) => updateGuzelSanatlar(sanat.id, "file", e.target.files?.[0] || null)}
                                            />   

                                            </div>
                                            
                                        ))}

                                     
                                        <button
                                            onClick={addGuzelSanatlar}
                                            className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
                                        >
                                            + Ekle
                                        </button>
                                       
                                        <button
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600"
                                        >
                                            Kaydet
                                        </button>
                 
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>


                            

                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdayProfil;