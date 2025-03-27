
// E-devlet api

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
const PORT = 8080;
app.post("/verify", async (req, res) => {
    const { TCKimlikNo, Ad, Soyad, DogumYili } = req.body;

    if (!TCKimlikNo || !Ad || !Soyad || !DogumYili) {
        return res.status(400).json({ error: "Eksik bilgi girdiniz!" });
    }

    const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                     xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                     xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
          <TCKimlikNo>${TCKimlikNo}</TCKimlikNo>
          <Ad>${Ad}</Ad>
          <Soyad>${Soyad}</Soyad>
          <DogumYili>${DogumYili}</DogumYili>
        </TCKimlikNoDogrula>
      </soap12:Body>
    </soap12:Envelope>`;

    try {
        const { data } = await axios.post("https://tckimlik.nvi.gov.tr/service/kpspublic.asmx", soapRequest, {
            headers: {
                "Content-Type": "application/soap+xml; charset=utf-8"
            }
        });

        const result = data.match(/<TCKimlikNoDogrulaResult>(.*?)<\/TCKimlikNoDogrulaResult>/);
        if (result) {
            return res.json({ success: result[1] === "true" });
        } else {
            return res.status(500).json({ error: "Geçersiz yanıt alındı." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Servis hatası", details: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});