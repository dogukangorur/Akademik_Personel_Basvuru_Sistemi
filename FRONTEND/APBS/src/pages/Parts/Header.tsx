const Header = () => {

return (
    <>
        <div className="flex  align-center p-2 bg-green-700">
            <a href="/" className="w-[200px] flex items-center mx-3"><img src="../assets/images/kouLogo.png" alt="" className="w-full h-20 mx-3" /></a>
            <h4 className="flex justify-between items-center w-full text-white text-xl ml-4">Akademik Personel Basvuru Sistemi</h4>
            <div className="w-full flex justify-end items-center mr-5">
                <a href="/login" className="btn bg-white text-green h-10 mx-1">Giriş Yap</a>   
                <a href="/register" className="btn bg-white text-danger h-10 mx-1">Kayıt Ol</a>  
            </div>
        </div>
    </>
);

}
export default Header;
