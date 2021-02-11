const overskrift = document.querySelector("h2");
const medieurl = "https://babushka-dd8a.restdb.io/media/";

const myHeaders = {
    "x-apikey": "600ec2fb1346a1524ff12de4"
}

document.addEventListener("DOMContentLoaded", start)
let kategori;
let filter = "alle";

// første funktion der kaldes efter DOM er loaded
function start() {
    const filterKnapper = document.querySelectorAll("nav button");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerRetter));
    loadJSON();
}

// eventlistener knyttet til knapperne der vælger hvilket filter der er aktivt
function filtrerRetter() {
    filter = this.dataset.kategorier; //sæt variablen "filter" til værdien af data-kategorier på den knap der er trykket på

    // fjerne classen fra tidligere knap
    document.querySelector(".valgt").classList.remove("valgt");

    //markerer den knap der er blevet trykket på
    this.classList.add("valgt");

    visRetter(); //kalder funktionen visPersoner, efter det nye filter er sat

    console.log(this);
    overskrift.textContent = this.textContent;
}

async function loadJSON() {
    const JSONData = await fetch("https://babushka-dd8a.restdb.io/rest/menu", {
        headers: myHeaders
    });
    kategori = await JSONData.json();
    console.log("Kategorierne", kategori);
    visRetter();
}

//funktion der viser personer i liste view
function visRetter() {

    const dest = document.querySelector("#liste"); // container til articles med en person
    const skabelon = document.querySelector("template").content; // select indhold af html skabelon (article)

    //ryd container inden loop
    dest.textContent = "";

    kategori.forEach(ret => {
        console.log("Kategori", ret.kategori);
        if (filter == ret.kategori || filter == "alle") {

            // loop igennem json (personer)
            const klon = skabelon.cloneNode(true);
            klon.querySelector(".billede").src = medieurl + ret.billede;
            klon.querySelector(".ret").textContent = ret.navn;
            klon.querySelector(".information").textContent = ret.kortbeskrivelse;
            klon.querySelector(".pris").textContent += ` ${ret.pris} DKK`;
            klon.querySelector(".more").addEventListener("click", () => visDetaljer(ret));
            dest.appendChild(klon);
        }
    })
}

function visDetaljer(hvilken) {
    location.href = `specifikation.html?id=${hvilken._id}`;
}
