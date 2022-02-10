//variabler til at komme objekter ind i, senere
const container = document.querySelector("section");
const template = document.querySelector("template");
const modal = document.querySelector("#modal");
const header = document.querySelector("h2");
let retter;
//variabler til filtrering
let filter = "alle";
const filterKnapper = document.querySelectorAll("nav button");
//hent json fil, og hent key til fil
const fil = "https://babushka-dd8a.restdb.io/rest/menu";
const key = "600ec2fb1346a1524ff12de4";
const options = { headers: { "x-apikey": key } };

//Sætter eventlistener på alle knapper. Venter på at igangsætte funktionen:
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerMad));
//når der klikkes, sætter den variablen filter = den knap der er
//trykket+dataattributten der hører til. fx. desserter.
function filtrerMad() {
  filter = this.dataset.kategori;
  //Kald denne funktion igen, for at få vist det nu valgte.
  vis();
  header.textContent = `Viser nu:  ${this.textContent}`;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
}

//asynkron funktion der kan hente data vha. json
async function hentData() {
  const resultat = await fetch(fil, options);
  retter = await resultat.json();
  vis();
}

function vis() {
  console.log(retter);
  //start funktionen med at tømme listen for retter, for derefter at kunne fylde på fra ny.
  container.textContent = "";
  //headers textContent, skal blive til this'(altså den knap der er trykket på's) textContent.
  retter.forEach((ret) => {
    //hver gang menuen lopes igennem, tjekkes hvilken kategori/værdi filteret ,
    //eller om det er = alle.
    if (filter == ret.kategori || filter == "alle") {
      const klon = template.cloneNode(true).content;
      klon.querySelector("img").src = "medium/" + ret.billednavn + "-md.jpg";
      klon.querySelector("h3").textContent = ret.navn;
      klon.querySelector("#info").textContent = ret.kortbeskrivelse;
      klon.querySelector("#pris").textContent = ret.pris + " kr.";
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(ret)); //sørg for at der kan klikkes på artiklerne, og vha. anonymfunktion henvises til al data om én ret
      container.appendChild(klon);
    }
  });
}

//funktionen hvor detaljer om enkelt ret vises
function visDetaljer(ret) {
  console.log(ret);
  modal.querySelector("h3").textContent = ret.navn;
  modal.querySelector("img").src = "medium/" + ret.billednavn + "-md.jpg";
  modal.querySelector("#beskrivelse").textContent =
    "Historien bag: " + ret.langbeskrivelse;
  modal.querySelector("#land").textContent =
    "Stammer fra: " + ret.oprindelsesregion;
  modal.style.display = "block"; //fjerner display:none fra css'en
  modal.addEventListener("click", () => (modal.style.display = "none"));
}

hentData(fil);
