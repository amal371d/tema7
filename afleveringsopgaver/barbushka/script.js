document.addEventListener("DOMContentLoaded", hentData);

const kategori = document.querySelector("h2");

const url = "https://babushka-dd8a.restdb.io/rest/menu";
const medieurl = "https://babushka-dd8a.restdb.io/media/";

const options = {
    headers: {
        'x-apikey': "600ec2fb1346a1524ff12de4"
    }
};

const section = document.querySelector("section");
const template = document.querySelector("template").content;

async function hentData() {
    const resspons = await fetch(url, options);
    const json = await resspons.json();
    vis(json);
}

function vis(json) {
    console.log(json);
    json.forEach(mad => {
        const klon = template.cloneNode(true);
        klon.querySelector(".billede").src = medieurl + mad.billede;
        klon.querySelector(".ret").textContent = mad.navn;
        klon.querySelector(".pris").textContent = `Pris: ${mad.pris} DKK`;

        section.appendChild(klon);
    })
}
