import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const AdayProfil = () => {

    const [active, setActive] = useState<string>('1');
    const togglePara = (value: string) => {
        setActive((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    const MySwal = withReactContent(Swal);
    interface Etkinlik {
        id: number;
        baslik_id: number;
        baslik_no: number;
        aciklama: string;
        puan:number;
 
      }
       const storedUserInfo = localStorage.getItem('userInfo');
       const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;



         const [makaleEtkinlik, setMakale] = useState<Etkinlik[]>([]);
         const [bilimselEtkinlik, setBilimsel] = useState<Etkinlik[]>([]);
         const [kitapEtkinlik, setKitap] = useState<Etkinlik[]>([]);
         const [atifEtkinlik, setAtif] = useState<Etkinlik[]>([]);
         const [egitimEtkinlik, setEgitim] = useState<Etkinlik[]>([]);
         const [tezEtkinlik, setTez] = useState<Etkinlik[]>([]);
         const [patentEtkinlik, setPatent] = useState<Etkinlik[]>([]);
         const [arastirmaEtkinlik, setArastirma] = useState<Etkinlik[]>([]);
         const [editorEtkinlik, setEditor] = useState<Etkinlik[]>([]);
         const [odulEtkinlik, setOdul] = useState<Etkinlik[]>([]);
         const [idariEtkinlik, setIdari] = useState<Etkinlik[]>([]);
         const [guzelEtkinlik, setGuzel] = useState<Etkinlik[]>([]);

        useEffect(() => {
          fetch("http://localhost:8080/api/etkinlik/etkinlikGetir")
            .then((res) => {
              if (!res.ok) {
                throw new Error("Veri alınamadı");
              }
              return res.json();
            })
            .then((data) => {
            const makaleFiltre = data.filter((item: any) => item.baslik_id === 1);  
            const bilimselFiltre = data.filter((item: any) => item.baslik_id === 2);
            const kitapFiltre = data.filter((item: any) => item.baslik_id === 3); 
            const atifFiltre = data.filter((item: any) => item.baslik_id === 4);     
            const egitimFiltre = data.filter((item: any) => item.baslik_id === 5);
            const tezFiltre = data.filter((item: any) => item.baslik_id === 6);
            const patentFiltre = data.filter((item: any) => item.baslik_id === 7);
            const arastirmaFiltre = data.filter((item: any) => item.baslik_id === 8);
            const editorFiltre = data.filter((item: any) => item.baslik_id === 9);
            const odulFiltre = data.filter((item: any) => item.baslik_id === 10);
            const idariFiltre = data.filter((item: any) => item.baslik_id === 11);    
            const guzelFiltre = data.filter((item: any) => item.baslik_id === 12);
              setMakale(makaleFiltre);
              setBilimsel(bilimselFiltre);
              setKitap(kitapFiltre);
              setAtif(atifFiltre);
              setEgitim(egitimFiltre);
              setTez(tezFiltre);
              setPatent(patentFiltre);
              setArastirma(arastirmaFiltre);
              setEditor(editorFiltre);
              setOdul(odulFiltre);
              setIdari(idariFiltre);
              setGuzel(guzelFiltre);
            })
            .catch((err) => {
             
            });

        }, []);
  

    // Makaleler
    const [articles, setArticles] = useState([
        { id: 1,faaliyet:"", yazar: "", baslik: "",kisiSayisi:"" ,dergi: "", cilt: "", sayfa: "", yil: "", file: null, isBaslicaYazar: false ,isAsgariCalisma:false}
      ]);

    const addArticle = () => {
        setArticles([...articles, { id: Date.now(), faaliyet:"", kisiSayisi:"",yazar: "", baslik: "", dergi: "", cilt: "", sayfa: "", yil: "", file: null, isBaslicaYazar: false, isAsgariCalisma:false}]);
      };
       
    const updateArticle = (id: number, field: string, value: any) => {
        setArticles(articles.map(article => (article.id === id ? { ...article, [field]: value } : article)));
      };

    const removeArticle = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
      };

  // Bilimsel Toplantı Faaliyetleri

  const [conferences, setConferences] = useState([
    { id: 1,faaliyet:"", yazar: "", bildiriAdi: "", konferansAdi: "", yer: "",kisiSayisi:"", sayfa: "", yil: "",file:null ,isBaslicaYazar: false,isAsgariCalisma:false }
  ]);


  const addConference = () => {
    setConferences([...conferences, { id: Date.now(), faaliyet:"",yazar: "", bildiriAdi: "", konferansAdi: "", yer: "", kisiSayisi:"",sayfa: "", yil: "",file:null ,isBaslicaYazar: false,isAsgariCalisma:false}]);
  };

 
  const updateConference = (id: number, field: string, value: any) => {
    setConferences(conferences.map(conf => (conf.id === id ? { ...conf, [field]: value } : conf)));
  };

  
  const removeConference = (id: number) => {
    setConferences(conferences.filter(conf => conf.id !== id));
  };

  // Kitaplar

  const [kitaplar, setKitaplar] = useState([
    { id: 1, faaliyet:"", yazar: "", kitapAdi: "", yer: "",baskiSayisi:"", yil: "",kisiSayisi:"",file:null ,isBaslicaYazar: false,isAsgariCalisma:false }
  ]);

  const addKitaplar = () => {
    setKitaplar([...kitaplar, { id: Date.now(), faaliyet:"", yazar: "", kitapAdi: "", yer: "",baskiSayisi:"", yil: "",kisiSayisi:"",file:null ,isBaslicaYazar: false,isAsgariCalisma:false  }]);
  };

  const updateKitaplar = (id: number, field: string, value: any) => {
    setKitaplar(kitaplar.map(kitap => (kitap.id === id ? { ...kitap, [field]: value } : kitap)));
  };

  const removeKitaplar = (id: number) => {
    setKitaplar(kitaplar.filter(kitap => kitap.id !== id));
  };


  // Atıflar

  const [atiflar, setAtiflar] = useState([
    { id: 1,faaliyet:"",yazar:"" ,yer:"",file:null}
  ]);

  const addAtiflar = () => {
    setAtiflar([...atiflar, { id: Date.now(),faaliyet:"",yazar:"" ,yer:"",file:null}]);
  };

  const updateAtiflar = (id: number, field: string, value: any) => {
    setAtiflar(atiflar.map(atif => (atif.id === id ? { ...atif, [field]: value } : atif)));
  };

  const removeAtiflar = (id: number) => {
    setAtiflar(atiflar.filter(atif => atif.id !== id));
  };

  // Eğitim Faaliyetleri

  const [egitimFaaliyet, setEgitimFaaliyetler] = useState([
    { id: 1,faaliyet:"", dersinAdi: "", programinAdi: "",egitimDonemi:"",yil:"",file:null}
  ]);

  const addEgitimFaaliyetler = () => {
    setEgitimFaaliyetler([...egitimFaaliyet, { id: Date.now(),faaliyet:"", dersinAdi: "", programinAdi: "",egitimDonemi:"",yil:"",file:null}]);
  };

  const updateEgitimFaaliyetler = (id: number, field: string, value: any) => {
    setEgitimFaaliyetler(egitimFaaliyet.map(egitimF => (egitimF.id === id ? { ...egitimF, [field]: value } : egitimF)));
  };

  const removeEgitimFaaliyetler = (id: number) => {
    setEgitimFaaliyetler(egitimFaaliyet.filter(egitimF => egitimF.id !== id));
  };

 // Tez Yönetmeciği

  const [tezYonetmeciligi, setTezYonetmeciligi] = useState([
    { id: 1,faaliyet:"", ogrenciAdi: "", tezAdi: "",enstutu:"",yil:"",file:null}
  ]);

  const addtezYonetmeciligi = () => {
    setTezYonetmeciligi([...tezYonetmeciligi, { id: Date.now(),faaliyet:"", ogrenciAdi: "", tezAdi: "",enstutu:"",yil:"",file:null}]);
  };

  const updateTezYonetmeciligi = (id: number, field: string, value: any) => {
    setTezYonetmeciligi(tezYonetmeciligi.map(tez => (tez.id === id ? { ...tez, [field]: value } : tez)));
  };

  const removeTezYonetmeciligi = (id: number) => {
    setTezYonetmeciligi(tezYonetmeciligi.filter(tez => tez.id !== id));
  };


 // Patentler

  const [patentler, setPatentler] = useState([
    { id: 1,faaliyet:"", patentAdi: "", yil:"",file:null}
  ]);

  const addPatentler = () => {
    setPatentler([...patentler, { id: Date.now(), faaliyet:"", patentAdi: "", yil:"",file:null}]);
  };

  const updatePatentler = (id: number, field: string, value: any) => {
    setPatentler(patentler.map(tez => (tez.id === id ? { ...tez, [field]: value } : tez)));
  };

  const removePatentler = (id: number) => {
    setPatentler(patentler.filter(tez => tez.id !== id));
  };

   // Araştırma Projeler

   const [arastirmaProje, setArastirmaProjeler] = useState([
    { id: 1,faaliyet:"", projeAdi: "", projeNumarasi:"",projeKurumAdi:"",yil:"",file:null}
  ]);

  const addArastirmaProjeler = () => {
    setArastirmaProjeler([...arastirmaProje, { id: Date.now(), faaliyet:"", projeAdi: "", projeNumarasi:"",projeKurumAdi:"",yil:"",file:null}]);
  };

  const updateArastirmaProjeler = (id: number, field: string, value: any) => {
    setArastirmaProjeler(arastirmaProje.map(arastirma => (arastirma.id === id ? { ...arastirma, [field]: value } : arastirma)));
  };

  const removeArastirmaProjeler = (id: number) => {
    setArastirmaProjeler(arastirmaProje.filter(arastirma => arastirma.id !== id));
  };

  
   // Editörlük

   const [editorluk, setEditorluk] = useState([
    { id: 1,faaliyet:"", dergiAdi: "", dergiSayisi:"",yil:"" ,file:null}
  ]);

  const addEditorluk = () => {
    setEditorluk([...editorluk, { id: Date.now(), faaliyet:"", dergiAdi: "", dergiSayisi:"",yil:"" ,file:null}]);
  };

  const updateEditorluk = (id: number, field: string, value: any) => {
    setEditorluk(editorluk.map(editor => (editor.id === id ? { ...editor, [field]: value } : editor)));
  };

  const removeEditorluk = (id: number) => {
    setEditorluk(editorluk.filter(editor => editor.id !== id));
  };

  // Ödüller

    const [oduller, setOduller] = useState([
        { id: 1,faaliyet:"", kurumAdi: "",yil:"",file:null}
      ]);
    
      const addOduller = () => {
        setOduller([...oduller, { id: Date.now(),faaliyet:"", kurumAdi: "",yil:"",file:null}]);
      };
    
      const updateOduller = (id: number, field: string, value: any) => {
        setOduller(oduller.map(odul => (odul.id === id ? { ...odul, [field]: value } : odul)));
      };
    
      const removeOduller = (id: number) => {
        setOduller(oduller.filter(odul => odul.id !== id));
      };

  // Idari görevler

    const [idariGorev, setIdariGorevler] = useState([
        { faaliyet:"",id: 1, gorevBirimi: "",yil:"",file:null}
      ]);
    
      const addIdariGorevler = () => {  
        setIdariGorevler([...idariGorev, { id: Date.now(), faaliyet:"", gorevBirimi: "",yil:"",file:null}]);
      };
    
      const updateIdariGorevler = (id: number, field: string, value: any) => {
        setIdariGorevler(idariGorev.map(gorev => (gorev.id === id ? { ...gorev, [field]: value } : gorev)));
      };
    
      const removeIdariGorevler = (id: number) => {
        setIdariGorevler(idariGorev.filter(gorev => gorev.id !== id));
      };

   // Güzel Sanatlar

   const [guzelSanat, setGuzelSanatlar] = useState([
    { id: 1,faaliyet:"", faaliyetAdi: "",yil:"",file:null}
  ]);

  const addGuzelSanatlar = () => {
    setGuzelSanatlar([...guzelSanat, { id: Date.now(), faaliyet:"", faaliyetAdi: "",yil:"",file:null}]);
  };

  const updateGuzelSanatlar = (id: number, field: string, value: any) => {
    setGuzelSanatlar(guzelSanat.map(sanat => (sanat.id === id ? { ...sanat, [field]: value } : sanat)));
  };

  const removeGuzelSanatlar = (id: number) => {
    setGuzelSanatlar(guzelSanat.filter(sanat => sanat.id !== id));
  };     
   
    function makaleKaydet() {
        const updatedArticles = articles.map((article) => {
            if (article.file) {
            
                const fileName = article.baslik.toLowerCase().replace(/\s+/g, "_").replace(/[<>:"\/\\|?*]+/g, "") + "_"+article.yil.replace(/-/g, "") +"_"+ userInfo.kullaniciID +`_${Date.now()}`;
                const uzanti= article.file.type.split("/")[1];

                article.fileName = fileName+"."+uzanti; 
                article.makaleUrl = `STORAGE/profil/${fileName}.${uzanti}`; 
            }
            return article;
        });
    
        const data = {
            kullaniciId: userInfo.kullaniciID,
            makaleler: updatedArticles
        };

        const formData = new FormData();
        formData.append("kullaniciId", userInfo.kullaniciID);
        formData.append("makaleler", JSON.stringify(updatedArticles)); // makaleler burada JSON.stringify ile string'e dönüştürülmeli

        updatedArticles.forEach((article) => {
            formData.append("files", article.file); // Dosyaları eklemeyi unutma
        });
        
        fetch("http://localhost:8080/api/aday/profilMakaleKayit", {
          method: "POST",
          body: formData
        }).then(()=>
            MySwal.fire({
                title: 'Makaleler Kayıt Edildi.',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                }
        }));
    }
   
    function bilimselKaydet() {
        const updatedBilimsel = conferences.map((bilimsel) => {
            if (bilimsel.file) {
            
                const fileName = bilimsel.bildiriAdi.toLowerCase().replace(/\s+/g, "_").replace(/[<>:"\/\\|?*]+/g, "") + "_"+ userInfo.kullaniciID +"_"+bilimsel.yil.replace(/-/g, "") +`_${Date.now()}`;
                const uzanti= bilimsel.file.type.split("/")[1];
                bilimsel.fileName = fileName+"."+uzanti; 
                bilimsel.bilimselUrl = `STORAGE/profil/${fileName}.${uzanti}`; 
            }
            return bilimsel;
        });
    
        const data = {
            kullaniciId: userInfo.kullaniciID,
            bilimsel: updatedBilimsel
        };

        const formData = new FormData();
        formData.append("kullaniciId", userInfo.kullaniciID);
        formData.append("bilimsel", JSON.stringify(updatedBilimsel)); // makaleler burada JSON.stringify ile string'e dönüştürülmeli

        updatedBilimsel.forEach((bilimsel) => {
            formData.append("files", bilimsel.file); // Dosyaları eklemeyi unutma
        });
        
        fetch("http://localhost:8080/api/aday/profilBilimselKayit", {
          method: "POST",
          body: formData
        }).then(()=>
            MySwal.fire({
                title: 'Bilimsel Toplanti Faaliyetleri Kaydedildi.',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                }
        }));
    }

    function kitaplarKaydet() {
        const updatedKitaplar = kitaplar.map((kitap) => {
            if (kitap.file) {
                const fileName = kitap.kitapAdi.toLowerCase().replace(/\s+/g, "_").replace(/\s+/g, "_") + "_" + userInfo.kullaniciID +"_"+ kitap.yil.replace(/-/g, "") + `_${Date.now()}`;
                const uzanti = kitap.file.type.split("/")[1];
                kitap.fileName = fileName + "." + uzanti;
                kitap.kitaplarUrl = `STORAGE/profil/${fileName}.${uzanti}`;
            } else {
                kitap.kitaplarUrl = "";
            }
            return kitap;
        });
    
        const data = {
            kullaniciId: userInfo.kullaniciID,
            kitaplar: updatedKitaplar
        };

        const formData = new FormData();
        formData.append("kullaniciId", userInfo.kullaniciID);
        formData.append("kitaplar", JSON.stringify(updatedKitaplar));

        updatedKitaplar.forEach((kitaplar) => {
            formData.append("files", kitaplar.file); 
        });
        
        fetch("http://localhost:8080/api/aday/profilKitaplarKayit", {
          method: "POST",
          body: formData
        }).then(()=>
            MySwal.fire({
                title: 'Kitaplar Kaydedildi.',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                }
        }));
    }

    function atiflarKaydet() {
        const updatedAtiflar = atiflar.map((atif) => {
            if (atif.file) {
                const fileName = atif.yazar.toLowerCase().replace(/\s+/g, "_").replace(/\s+/g, "_") + "_" + userInfo.kullaniciID  + `_${Date.now()}`;
                const uzanti = atif.file.type.split("/")[1];
                atif.fileName = fileName + "." + uzanti;
                atif.atiflarUrl = `STORAGE/profil/${fileName}.${uzanti}`;
            } else {
                atif.atiflarUrl = "";
            }
            return atif;
        });
    
        const data = {
            kullaniciId: userInfo.kullaniciID,
            atiflar: updatedAtiflar
        };

        const formData = new FormData();
        formData.append("kullaniciId", userInfo.kullaniciID);
        formData.append("atiflar", JSON.stringify(updatedAtiflar));

        updatedAtiflar.forEach((atif) => {
            formData.append("files", atif.file); 
        });
        
        fetch("http://localhost:8080/api/aday/profilAtiflarKayit", {
          method: "POST",
          body: formData
        }).then(()=>
            MySwal.fire({
                title: 'Atıflar Kaydedildi.',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                }
        }));
    }
    
    function egitimKaydet() {
        const updatedEgitimler = egitimFaaliyet.map((egitim) => {
            if (egitim.file) {
                const fileName = egitim.programinAdi.toLowerCase().replace(/\s+/g, "_").replace(/\s+/g, "_") + "_" + userInfo.kullaniciID+"_"+egitim.yil.replace(/-/g, "")  + `_${Date.now()}`;
                const uzanti = egitim.file.type.split("/")[1];
                egitim.fileName = fileName + "." + uzanti;
                egitim.egitimlerUrl = `STORAGE/profil/${fileName}.${uzanti}`;
            } else {
                egitim.egitimlerUrl = "";
            }
            return egitim;
        });
    
        const data = {
            kullaniciId: userInfo.kullaniciID,
            atiflar: updatedEgitimler
        };

        const formData = new FormData();
        formData.append("kullaniciId", userInfo.kullaniciID);
        formData.append("egitimler", JSON.stringify(updatedEgitimler));

        updatedEgitimler.forEach((egitim) => {
            formData.append("files", egitim.file); 
        });
        
        fetch("http://localhost:8080/api/aday/profilEgitimKayit", {
          method: "POST",
          body: formData
        }).then(()=>
            MySwal.fire({
                title: 'Eğitimler Kaydedildi.',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                }
        }));
    }

    function tezKaydet() {
        const updatedTezler = tezYonetmeciligi.map((tez) => {
            if (tez.file) {
                const fileName = tez.ogrenciAdi.toLowerCase().replace(/\s+/g, "_").replace(/\s+/g, "_") + "_" + userInfo.kullaniciID+"_"+tez.yil + `_${Date.now()}`;
                const uzanti = tez.file.type.split("/")[1];
                tez.fileName = fileName + "." + uzanti;
                tez.tezlerUrl = `STORAGE/profil/${fileName}.${uzanti}`;
            } else {
                tez.tezlerUrl = "";
            }
            return tez;
        });
    
        const data = {
            kullaniciId: userInfo.kullaniciID,
            tezler: updatedTezler
        };

        const formData = new FormData();
        formData.append("kullaniciId", userInfo.kullaniciID);
        formData.append("tezler", JSON.stringify(updatedTezler));

        updatedTezler.forEach((tez) => {
            formData.append("files", tez.file); 
        });
        
        fetch("http://localhost:8080/api/aday/profilTezKayit", {
          method: "POST",
          body: formData
        }).then(()=>
            MySwal.fire({
                title: 'Tezler Kaydedildi.',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                }
        }));
    }

    function patentKaydet() {
        const updatedPatentler = patentler.map((patent) => {
            if (patent.file) {
                const fileName = patent.patentAdi.toLowerCase().replace(/\s+/g, "_").replace(/\s+/g, "_") + "_" + userInfo.kullaniciID+"_"+patent.yil.replace(/-/g, "") + `_${Date.now()}`;
                const uzanti = patent.file.type.split("/")[1];
                patent.fileName = fileName + "." + uzanti;
                patent.patentlerUrl = `STORAGE/profil/${fileName}.${uzanti}`;
            } else {
                patent.patentlerUrl = "";
            }
            return patent;
        });
    
        const data = {
            kullaniciId: userInfo.kullaniciID,
            tezler: updatedPatentler
        };

        const formData = new FormData();
        formData.append("kullaniciId", userInfo.kullaniciID);
        formData.append("patentler", JSON.stringify(updatedPatentler));

        updatedPatentler.forEach((tez) => {
            formData.append("files", tez.file); 
        });
        
        fetch("http://localhost:8080/api/aday/profilPatentKayit", {
          method: "POST",
          body: formData
        }).then(()=>
            MySwal.fire({
                title: 'Patentler Kaydedildi.',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                }
        }));
    }

    function arastirmaKaydet() {
        const updatedPatentler = arastirmaProje.map((arastirma) => {
            if (arastirma.file) {
                const fileName = arastirma.projeAdi.toLowerCase().replace(/\s+/g, "_").replace(/\s+/g, "_") + "_" + userInfo.kullaniciID+"_"+arastirma.yil.replace(/-/g, "") + `_${Date.now()}`;
                const uzanti = arastirma.file.type.split("/")[1];
                arastirma.fileName = fileName + "." + uzanti;
                arastirma.arastirmalarUrl = `STORAGE/profil/${fileName}.${uzanti}`;
            } else {
                arastirma.arastirmalarUrl = "";
            }
            return arastirma;
        });
    
        const data = {
            kullaniciId: userInfo.kullaniciID,
            tezler: updatedPatentler
        };

        const formData = new FormData();
        formData.append("kullaniciId", userInfo.kullaniciID);
        formData.append("arastirmalar", JSON.stringify(updatedPatentler));

        updatedPatentler.forEach((tez) => {
            formData.append("files", tez.file); 
        });
        
        fetch("http://localhost:8080/api/aday/profilArastirmaKayit", {
          method: "POST",
          body: formData
        }).then(()=>
            MySwal.fire({
                title: 'Araştırmalar Kaydedildi.',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                }
        }));
    }

    function editorlukKaydet() {
        const updatedEditorler = editorluk.map((editor) => {
            if (editor.file) {
                const fileName = editor.dergiAdi.toLowerCase().replace(/\s+/g, "_").replace(/\s+/g, "_") + "_" + userInfo.kullaniciID+"_"+editor.yil.replace(/-/g, "") + `_${Date.now()}`;
                const uzanti = editor.file.type.split("/")[1];
                editor.fileName = fileName + "." + uzanti;
                editor.editorlerUrl = `STORAGE/profil/${fileName}.${uzanti}`;
            } else {
                editor.editorlerUrl = "";
            }
            return editor;
        });
    
        const data = {
            kullaniciId: userInfo.kullaniciID,
            tezler: updatedEditorler
        };

        const formData = new FormData();
        formData.append("kullaniciId", userInfo.kullaniciID);
        formData.append("editorler", JSON.stringify(updatedEditorler));

        updatedEditorler.forEach((editor) => {
            formData.append("files", editor.file); 
        });
        
        fetch("http://localhost:8080/api/aday/profilEditorKayit", {
          method: "POST",
          body: formData
        }).then(()=>
            MySwal.fire({
                title: 'Araştırmalar Kaydedildi.',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                }
        }));
    }

    function odulKaydet() {
        const updatedOduller = oduller.map((odul) => {
            if (odul.file) {
                const fileName = odul.kurumAdi.toLowerCase().replace(/\s+/g, "_").replace(/\s+/g, "_") + "_" + userInfo.kullaniciID+"_"+odul.yil.replace(/-/g, "") + `_${Date.now()}`;
                const uzanti = odul.file.type.split("/")[1];
                odul.fileName = fileName + "." + uzanti;
                odul.odullerUrl = `STORAGE/profil/${fileName}.${uzanti}`;
            } else {
                odul.odullerUrl = "";
            }
            return odul;
        });
    
        const data = {
            kullaniciId: userInfo.kullaniciID,
            tezler: updatedOduller
        };

        const formData = new FormData();
        formData.append("kullaniciId", userInfo.kullaniciID);
        formData.append("oduller", JSON.stringify(updatedOduller));

        updatedOduller.forEach((odul) => {
            formData.append("files", odul.file); 
        });
        
        fetch("http://localhost:8080/api/aday/profilOdulKayit", {
          method: "POST",
          body: formData
        }).then(()=>
            MySwal.fire({
                title: 'Ödüller Kaydedildi.',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                }
        }));
    }

    function idariKaydet() {
        const updatedIdari = idariGorev.map((idari) => {
            if (idari.file) {
                const fileName = idari.gorevBirimi.toLowerCase().replace(/\s+/g, "_").replace(/\s+/g, "_") + "_" + userInfo.kullaniciID+"_"+idari.yil.replace(/-/g, "") + `_${Date.now()}`;
                const uzanti = idari.file.type.split("/")[1];
                idari.fileName = fileName + "." + uzanti;
                idari.idarilerUrl = `STORAGE/profil/${fileName}.${uzanti}`;
            } else {
                idari.idarilerUrl = "";
            }
            return idari;
        });
    
        const data = {
            kullaniciId: userInfo.kullaniciID,
            tezler: updatedIdari
        };

        const formData = new FormData();
        formData.append("kullaniciId", userInfo.kullaniciID);
        formData.append("idariler", JSON.stringify(updatedIdari));

        updatedIdari.forEach((idari) => {
            formData.append("files", idari.file); 
        });
        
        fetch("http://localhost:8080/api/aday/profilIdariKayit", {
          method: "POST",
          body: formData
        }).then(()=>
            MySwal.fire({
                title: 'İdari Görevler Kaydedildi.',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                }
        }));
    }

    function guzelKaydet() {
        const updatedGuzelSanat = guzelSanat.map((guzelSanat) => {
            if (guzelSanat.file) {
                const fileName = guzelSanat.faaliyetAdi.toLowerCase().replace(/\s+/g, "_").replace(/\s+/g, "_") + "_" + userInfo.kullaniciID+"_"+guzelSanat.yil.replace(/-/g, "") + `_${Date.now()}`;
                const uzanti = guzelSanat.file.type.split("/")[1];
                guzelSanat.fileName = fileName + "." + uzanti;
                guzelSanat.guzelSanatlarUrl = `STORAGE/profil/${fileName}.${uzanti}`;
            } else {
                guzelSanat.guzelSanatlarUrl = "";
            }
            return guzelSanat;
        });
    
        const data = {
            kullaniciId: userInfo.kullaniciID,
            tezler: updatedGuzelSanat
        };

        const formData = new FormData();
        formData.append("kullaniciId", userInfo.kullaniciID);
        formData.append("guzelSanatlar", JSON.stringify(updatedGuzelSanat));

        updatedGuzelSanat.forEach((guzelSanat) => {
            formData.append("files", guzelSanat.file); 
        });
        
        fetch("http://localhost:8080/api/aday/profilGuzelSanatlarKayit", {
          method: "POST",
          body: formData
        }).then(()=>
            MySwal.fire({
                title: 'Güzel Sanatlar Faaliyetleri Kaydedildi.',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                }
        }));
    }


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

                                            <select className="form-input mb-3" onChange={(e) => updateArticle(article.id, "faaliyet", e.target.value)}>
                                            <option >Faaliyet Türü</option>
                                            {makaleEtkinlik.map((faaliyet:any) => (
                                            <option key={faaliyet.id} value={faaliyet.id} >
                                                {faaliyet.aciklama}
                                            </option>
                                            ))}
                                            </select>

                                            <input
                                                type="text"
                                                placeholder="Yazar/Yazarlar"
                                                className="form-input mb-3"
                                                value={article.yazar}
                                                onChange={(e) => updateArticle(article.id, "yazar", e.target.value)}
                                            />
                                            
                                            <input
                                                type="text"
                                                placeholder="Makale Adı"
                                               className="form-input mb-3"
                                                value={article.baslik}
                                                onChange={(e) => updateArticle(article.id, "baslik", e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Dergi Adı"
                                               className="form-input mb-3"
                                                value={article.dergi}
                                                onChange={(e) => updateArticle(article.id, "dergi", e.target.value)}
                                            />

                                            <div className="flex gap-2 mt-2">
                                                <input
                                                type="text"
                                                placeholder="Cilt No."
                                                className="form-input mb-3"
                                                value={article.cilt}
                                                onChange={(e) => updateArticle(article.id, "cilt", e.target.value)}
                                                />
                                                <input
                                                type="text"
                                                placeholder="Sayfa"
                                                className="form-input mb-3"
                                                value={article.sayfa}
                                                onChange={(e) => updateArticle(article.id, "sayfa", e.target.value)}
                                                />
                                                <input
                                                type="date"
                                                placeholder="Yıl"
                                                className="form-input mb-3"
                                                value={article.yil}
                                                onChange={(e) => updateArticle(article.id, "yil", e.target.value)}
                                                />
                                            </div>
                                            <div className="flex gap-2 mt-2">
                                            <label className="flex items-center cursor-pointer">
                                                Başlıca Yazar mı ?
                                                <input
                                                type="checkbox"
                                                className="form-checkbox ml-3"
                                                checked={article.isBaslicaYazar}
                                                onChange={(e) => updateArticle(article.id, 'isBaslicaYazar', e.target.checked)}
                                                />
                                            </label>
                                            <br />
                                            <label className="flex items-center cursor-pointer">
                                                Asgari Çalışma ?
                                                <input
                                                type="checkbox"
                                                className="form-checkbox ml-3"
                                                checked={article.isAsgariCalisma}
                                                onChange={(e) => updateArticle(article.id, 'isAsgariCalisma', e.target.checked)}
                                                />
                                            </label>

                                            <select className="form-input mb-3" onChange={(e) => updateArticle(article.id, 'kisiSayisi', e.target.value)}>
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
                                            <button className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600" onClick={()=> makaleKaydet()}>
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

                                            <select className="form-input mb-3" onChange={(e) => updateConference(conf.id, "faaliyet", e.target.value)}>
                                            <option>Faaliyet Türü</option>
                                            {bilimselEtkinlik.map((faaliyet:any) => (
                                            <option key={faaliyet.id} value={faaliyet.id}>
                                                {faaliyet.aciklama}
                                            </option>
                                            ))}
                                            </select>


                                            <input
                                                type="text"
                                                placeholder="Yazar/Yazarlar"
                                                className="form-input mb-3"
                                                value={conf.yazar}
                                                onChange={(e) => updateConference(conf.id, "yazar", e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Bildiri Adı"
                                                className="form-input mb-3"
                                                value={conf.bildiriAdi}
                                                onChange={(e) => updateConference(conf.id, "bildiriAdi", e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Konferansın Adı"
                                                className="form-input mb-3"
                                                value={conf.konferansAdi}
                                                onChange={(e) => updateConference(conf.id, "konferansAdi", e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Yapıldığı Yer"
                                                className="form-input mb-3"
                                                value={conf.yer}
                                                onChange={(e) => updateConference(conf.id, "yer", e.target.value)}
                                            />

                                            <div className="flex gap-2 mt-2">
                                                <input
                                                type="text"
                                                placeholder="Sayfa Sayıları"
                                                className="form-input mb-3"
                                                value={conf.sayfa}
                                                onChange={(e) => updateConference(conf.id, "sayfa", e.target.value)}
                                                />
                                               <input
                                                type="date"
                                                placeholder="Yıl"
                                                className="form-input mb-3"
                                                value={conf.yil}
                                                onChange={(e) => updateConference(conf.id, "yil", e.target.value)}
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
                                            <br />
                                            <label className="flex items-center cursor-pointer">
                                                Asgari Çalışma 
                                                <input
                                                type="checkbox"
                                                className="form-checkbox ml-3"
                                                checked={conf.isAsgariCalisma}
                                                onChange={(e) => updateConference(conf.id, 'isAsgariCalisma', e.target.checked)}
                                                />
                                            </label>

                                            <select className="form-input mb-3" onChange={(e) => updateConference(conf.id, "kisiSayisi", e.target.value)}>
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
                                                onChange={(e) => updateConference(conf.id, "file", e.target.files?.[0] || null)}
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
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600" onClick={()=>bilimselKaydet()}
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

                                            <select className="form-input mb-3"  onChange={(e) => updateKitaplar(kitap.id, "faaliyet", e.target.value)} >
                                            <option>Faaliyet Türü</option>
                                            {kitapEtkinlik.map((faaliyet:any) => (
                                            <option key={faaliyet.id} value={faaliyet.id}>
                                                {faaliyet.aciklama}
                                            </option>
                                            ))}
                                            </select>

                                            <input
                                                type="text"
                                                placeholder="Yazar/Yazarlar"
                                                className="form-input mb-3"
                                                value={kitap.yazar}
                                                onChange={(e) => updateKitaplar(kitap.id, "yazar", e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Kitap Adı"
                                                className="form-input mb-3"
                                                value={kitap.kitapAdi}
                                                onChange={(e) => updateKitaplar(kitap.id, "kitapAdi", e.target.value)}
                                            />


                                            <input
                                                type="text"
                                                placeholder="Yayımlandığı Yer"
                                                className="form-input mb-3"
                                                value={kitap.yer}
                                                onChange={(e) => updateKitaplar(kitap.id, "yer", e.target.value)}
                                            />

                                            <div className="flex gap-2 mt-2">
                                                <input
                                                type="text"
                                                placeholder="Baskı Sayısı"
                                                className="form-input mb-3"
                                                value={kitap.baskiSayisi}
                                                onChange={(e) => updateKitaplar(kitap.id, "baskiSayisi", e.target.value)}
                                                />
                                                <input
                                                type="date"
                                                placeholder="Yıl"
                                                className="w-1/2 p-2 border rounded"
                                                value={kitap.yil}
                                                onChange={(e) => updateKitaplar(kitap.id, "yil", e.target.value)}
                                                />
                                            </div>

                                            <div className="flex gap-2 mt-2">
                                            <label className="flex items-center cursor-pointer">
                                                Başlıca Yazar mı?
                                                <input
                                                type="checkbox"
                                                className="form-checkbox ml-3"
                                                checked={kitap.isBaslicaYazar}
                                                onChange={(e) => updateKitaplar(kitap.id, 'isBaslicaYazar', e.target.checked)}
                                                />
                                            </label>
                                            <label className="flex items-center cursor-pointer">
                                                Başlıca Yazar mı?
                                                <input
                                                type="checkbox"
                                                className="form-checkbox ml-3"
                                                checked={kitap.isAsgariCalisma}
                                                onChange={(e) => updateKitaplar(kitap.id, 'isAsgariCalisma', e.target.checked)}
                                                />
                                            </label>

                                            <select className="form-input mb-3" onChange={(e) => updateKitaplar(kitap.id, 'kisiSayisi', e.target.value)}>
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
                                                onChange={(e) => updateKitaplar(kitap.id, "file", e.target.files?.[0] || null)}
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
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600" onClick={()=>kitaplarKaydet()}
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

                                            <select className="form-input mb-3" onChange={(e) => updateAtiflar(atif.id, "faaliyet", e.target.value)}>
                                            <option>Faaliyet Türü</option>
                                            {atifEtkinlik.map((faaliyet:any) => (
                                            <option key={faaliyet.id} value={faaliyet.id}>
                                                {faaliyet.aciklama}
                                            </option>
                                            ))}
                                            </select>
                                            
                                            <input
                                                type="text"
                                                placeholder="Atıfın Yapıldığı Eser"
                                                className="form-input mb-3"
                                                value={atif.yazar}
                                                onChange={(e) => updateAtiflar(atif.id, "yazar", e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Atıf Sayısı"
                                                className="form-input mb-3"
                                                value={atif.yer}
                                                onChange={(e) => updateAtiflar(atif.id, "yer", e.target.value)}
                                            />


                                            <input
                                                type="file"
                                                className="form-input mb-3"
                                                onChange={(e) => updateAtiflar(atif.id, "file", e.target.files?.[0] || null)}
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
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600" onClick={()=>atiflarKaydet()}
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
                                            <select className="form-input mb-3" onChange={(e) => updateEgitimFaaliyetler(egitim.id, "faaliyet", e.target.value)}>
                                            <option>Faaliyet Türü</option>
                                            {egitimEtkinlik.map((faaliyet:any) => (
                                            <option key={faaliyet.id} value={faaliyet.id}>
                                                {faaliyet.aciklama}
                                            </option>
                                            ))}
                                             </select>
                                            <input
                                                type="text"
                                                placeholder="Programın Adı"
                                                className="form-input mb-3"
                                                value={egitim.programinAdi}
                                                onChange={(e) => updateEgitimFaaliyetler(egitim.id, "programinAdi", e.target.value)}
                                            />


                                            <input
                                                type="text"
                                                placeholder="Dersin Adı"
                                                className="form-input mb-3"
                                                value={egitim.dersinAdi}
                                                onChange={(e) => updateEgitimFaaliyetler(egitim.id, "dersinAdi", e.target.value)}
                                            />


                                            <select className="form-input mb-3" onChange={(e) => updateEgitimFaaliyetler(egitim.id, "egitimDonemi", e.target.value)}>
                                            <option value={"güz"}>Güz</option>
                                            <option value={"bahar"}>Bahar</option>
                                            <option value={"yaz"}>Yaz</option>
                                             </select>
                                            <input
                                                type="date"
                                                placeholder="Eğitim Yılı"
                                                className="form-input mb-3"
                                                value={egitim.yil}
                                                onChange={(e) => updateEgitimFaaliyetler(egitim.id, "yil", e.target.value)}
                                            />

                                            <input
                                                type="file"
                                                className="form-input mb-3"
                                                onChange={(e) => updateEgitimFaaliyetler(egitim.id, "file", e.target.files?.[0] || null)}
                                            />   


                                            </div>
                                            
                                        ))}

                                     
                                        <button
                                            onClick={addEgitimFaaliyetler}
                                            className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
                                        >
                                            + Ekle
                                        </button>
                                       
                                        <button
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600" onClick={()=>{egitimKaydet()}} 
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
                                            <select className="form-input mb-3" onChange={(e) => updateTezYonetmeciligi(tez.id, "faaliyet", e.target.value)}>
                                            <option>Faaliyet Türü</option>
                                            {tezEtkinlik.map((faaliyet:any) => (
                                            <option key={faaliyet.id} value={faaliyet.id}>
                                                {faaliyet.aciklama}
                                            </option>
                                            ))}
                                             </select>
                                            <input
                                                type="text"
                                                placeholder="Öğrenci Adı"
                                                className="form-input mb-3"
                                                value={tez.ogrenciAdi}
                                                onChange={(e) => updateTezYonetmeciligi(tez.id, "ogrenciAdi", e.target.value)}
                                            />


                                            <input
                                                type="text"
                                                placeholder="Tez Adı"
                                                className="form-input mb-3"
                                                value={tez.tezAdi}
                                                onChange={(e) => updateTezYonetmeciligi(tez.id, "tezAdi", e.target.value)}
                                            />


                                            <input
                                                type="text"
                                                placeholder="Enstütü"
                                                className="form-input mb-3"
                                                value={tez.enstutu}
                                                onChange={(e) => updateTezYonetmeciligi(tez.id, "enstutu", e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Tez Yılı"
                                                className="form-input mb-3"
                                                value={tez.yil}
                                                onChange={(e) => updateTezYonetmeciligi(tez.id, "yil", e.target.value)}
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
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600" onClick={()=>{tezKaydet()}}
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
                                            <select className="form-input mb-3"  onChange={(e) => updatePatentler(patent.id, "faaliyet", e.target.value)}>
                                            <option>Faaliyet Türü</option>
                                            {patentEtkinlik.map((faaliyet:any) => (
                                            <option key={faaliyet.id} value={faaliyet.id}>
                                                {faaliyet.aciklama}
                                            </option>
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
                                                type="date"
                                                placeholder="Yılı"
                                                className="form-input mb-3"
                                                value={patent.yil}
                                                onChange={(e) => updatePatentler(patent.id, "yil", e.target.value)}
                                            />
                            
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
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600" onClick={()=>{patentKaydet()}}
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
                                            <select className="form-input mb-3" onChange={(e) => updateArastirmaProjeler(arastirma.id, "faaliyet", e.target.value)}>
                                            <option>Faaliyet Türü</option>
                                            {arastirmaEtkinlik.map((faaliyet:any) => (
                                            <option key={faaliyet.id} value={faaliyet.id}>
                                                {faaliyet.aciklama}
                                            </option>
                                            ))}
                                             </select>
                                            <input
                                                type="text"
                                                placeholder="Proje Adı"
                                                className="form-input mb-3"
                                                value={arastirma.projeAdi}
                                                onChange={(e) => updateArastirmaProjeler(arastirma.id, "projeAdi", e.target.value)}
                                            />


                                            <input
                                                type="text"
                                                placeholder="Kurum Adı"
                                                className="form-input mb-3"
                                                value={arastirma.projeKurumAdi}
                                                onChange={(e) => updateArastirmaProjeler(arastirma.id, "projeKurumAdi", e.target.value)}
                                            />


                                            <input
                                                type="text"
                                                placeholder="Proje Numarası"
                                                className="form-input mb-3"
                                                value={arastirma.projeNumarasi}
                                                onChange={(e) => updateArastirmaProjeler(arastirma.id, "projeNumarasi", e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Araştırma Yılı"
                                                className="form-input mb-3"
                                                value={arastirma.yil}
                                                onChange={(e) => updateArastirmaProjeler(arastirma.id, "yil", e.target.value)}
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
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600" onClick={()=>{arastirmaKaydet()}}
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
                                            <select className="form-input mb-3" onChange={(e) => updateEditorluk(editor.id, "faaliyet", e.target.value)}>
                                            <option>Faaliyet Türü</option>
                                            {editorEtkinlik.map((faaliyet:any) => (
                                                <option key={faaliyet.id} value={faaliyet.id}>
                                                    {faaliyet.aciklama}
                                                </option>
                                            ))}
                                             </select>
                                            <input
                                                type="text"
                                                placeholder="Dergi Adi"
                                                className="form-input mb-3"
                                                value={editor.dergiAdi}
                                                onChange={(e) => updateEditorluk(editor.id, "dergiAdi", e.target.value)}
                                            />


                                            <input
                                                type="text"
                                                placeholder="Dergi Sayisi"
                                                className="form-input mb-3"
                                                value={editor.dergiSayisi}
                                                onChange={(e) => updateEditorluk(editor.id, "dergiSayisi", e.target.value)}
                                            />

                                            <input
                                                type="date"
                                                placeholder="Dergi Yılı"
                                                className="form-input mb-3"
                                                value={editor.yil}
                                                onChange={(e) => updateEditorluk(editor.id, "yil", e.target.value)}

                                            />

                                            <input
                                                type="file"
                                                className="form-input mb-3"
                                                onChange={(e) => updateEditorluk(editor.id, "file", e.target.files?.[0] || null)}
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
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600" onClick={()=>{editorlukKaydet()}}
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
                                            <select className="form-input mb-3" onChange={(e) => updateOduller(odul.id, "faaliyet", e.target.value)}>
                                            <option>Faaliyet Türü</option>
                                            {odulEtkinlik.map((faaliyet:any) => (
                                            <option key={faaliyet.id} value={faaliyet.id}>
                                                {faaliyet.aciklama}
                                            </option>
                                            ))}
                                             </select>
                                            <input
                                                type="text"
                                                placeholder="Kurum Adi"
                                                className="form-input mb-3"
                                                value={odul.kurumAdi}
                                                onChange={(e) => updateOduller(odul.id, "kurumAdi", e.target.value)}
                                            />


                                            

                                            <input
                                                type="date"
                                                placeholder="Odul Yılı"
                                                className="form-input mb-3"
                                                value={odul.yil}
                                                onChange={(e) => updateOduller(odul.id, "yil", e.target.value)}
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
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600" onClick={()=>{odulKaydet()}}
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
                                            <select className="form-input mb-3"  onChange={(e) => updateIdariGorevler(idariGorev.id, "faaliyet", e.target.value)}>
                                            <option>Faaliyet Türü</option>
                                            {idariEtkinlik.map((faaliyet:any) => (
                                            <option key={faaliyet.id} value={faaliyet.id}>
                                                {faaliyet.aciklama}
                                            </option>
                                            ))}
                                             </select>
                                            <input
                                                type="text"
                                                placeholder="Görev Birimi"
                                                className="form-input mb-3"
                                                value={idariGorev.gorevBirimi}
                                                onChange={(e) => updateIdariGorevler(idariGorev.id, "gorevBirimi", e.target.value)}
                                            />

                                            <input
                                                type="date"
                                                placeholder="Görev Yılı"
                                                className="form-input mb-3"
                                                value={idariGorev.yil}
                                                onChange={(e) => updateIdariGorevler(idariGorev.id, "yil", e.target.value)}
                                            />

                                            <input
                                                type="file"
                                                className="form-input mb-3"
                                                onChange={(e) => updateIdariGorevler(idariGorev.id, "file", e.target.files?.[0] || null)}
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
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600" onClick={()=>{idariKaydet()}}
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
                                            <select className="form-input mb-3"  onChange={(e) => updateGuzelSanatlar(sanat.id, "faaliyet", e.target.value)}>
                                            <option>Faaliyet Türü</option>
                                            {guzelEtkinlik.map((faaliyet:any) => (
                                            <option key={faaliyet.id} value={faaliyet.id}>
                                                {faaliyet.aciklama}
                                            </option>
                                            ))}
                                             </select>
                                            <input
                                                type="text"
                                                placeholder="Faaliyet Adı"
                                                className="form-input mb-3"
                                                value={sanat.faaliyetAdi}
                                                onChange={(e) => updateGuzelSanatlar(sanat.id, "faaliyetAdi", e.target.value)}
                                            />

                                            <input
                                                type="date"
                                                placeholder="Odul Yılı"
                                                className="form-input mb-3"
                                                value={sanat.yil}
                                                onChange={(e) => updateGuzelSanatlar(sanat.id, "yil", e.target.value)}
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
                                            className="w-full p-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600" onClick={()=>guzelKaydet()}
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