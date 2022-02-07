const container = document.querySelector("section");
const template = document.querySelector("template");
let filter;
//hent json fil, og hent key til fil
const fil = "https://babushka-dd8a.restdb.io/rest/menu";
const key = "600ec2fb1346a1524ff12de4";
const options = { headers: { "x-apikey": key } };

//asynkron funktion der kan hente data vha. json
async function hentData() {
  const resultat = await fetch(fil, options);
  const json = await resultat.json();
  vis(json);
}

function vis(menu) {
  console.log(menu);
  menu.forEach((ret) => {
    const klon = template.cloneNode(true).content;
    klon.querySelector("img").src = "medium/" + ret.billednavn + "-md.jpg";
    klon.querySelector("h3").textContent = ret.navn;
    klon.querySelector("#info").textContent = ret.kortbeskrivelse;
    klon.querySelector("#pris").textContent = ret.pris;
    container.appendChild(klon);
  });
}

hentData(fil);

//"vis" funktion, der kloner indhold, og indsætter data fra json
//og vha. appendChild igen indsætter.
