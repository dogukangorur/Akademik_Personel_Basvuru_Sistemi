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

    
    return (
        <div>
            <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full">
                <div className="flex flex-col pb-2">
                    <div className="mb-5">
                        <div className="space-y-2 font-semibold">
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
                                        <div className="space-y-2 p-4 text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                           
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>
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
                                            
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>
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
                                           
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>


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
                                           
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>


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
                                           
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>




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
                                           
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>




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
                                           
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>





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
                                           
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>





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
                                           
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>



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
                                           
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>




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
                                           
                 
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>




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