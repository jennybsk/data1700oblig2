// Oppretter array for billettregister
const kinobillettRegister=[];

// Funksjon for kjøp av billett
function kjøpAvBillett() {
    // Tømmer feilmeldingene før validering
    document.getElementById("ugyldigAntall").innerHTML = "";
    document.getElementById("ikkeNummer").innerHTML = "";
    document.getElementById("ugyldigFornavn").innerHTML = "";
    document.getElementById("ugyldigEtternavn").innerHTML = "";
    document.getElementById("ugyldigEpost").innerHTML = "";

    const film = document.getElementById("filmer").value;
    const antall = document.getElementById("antall").value;
    const fornavn = document.getElementById("fornavn").value;
    const etternavn = document.getElementById("etternavn").value;
    const telefonnr = document.getElementById("telefonnr").value;
    const epost = document.getElementById("epost").value;


    if (antall === "" || isNaN(antall) || parseInt(antall) <= 0) {
        document.getElementById("ugyldigAntall").innerHTML="Ugyldig, må fylle inn antall";
    }

    if(isNaN(telefonnr) || telefonnr.length !== 8){
        document.getElementById("ikkeNummer").innerHTML="Ugyldig, telefonnr må bestå av 8 siffer";
    }

    if (fornavn.length === 0 || !isNaN(fornavn)) {
        document.getElementById("ugyldigFornavn").innerHTML="Ugyldig, må fylle inn fornavn";
    }

    if (etternavn.length === 0 || !isNaN(etternavn)) {
        document.getElementById("ugyldigEtternavn").innerHTML="Ugyldig, må fylle inn etternavn";
    }

    if (!epost.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost)) {
        document.getElementById("ugyldigEpost").innerHTML ="Ugyldig e-postadresse";
    }

    else {
        const registrert = {
            film: film,
            antall: antall,
            fornavn: fornavn,
            etternavn: etternavn,
            telefonnr: telefonnr,
            epost: epost
        };

        // Registrerer den nye infoen i arrayet
        kinobillettRegister.push(registrert);

        // Viser den nye infoen i arrayet
        visKinobillettRegister()


        // Sletter info fra input-boksene
        document.getElementById("filmer").value="";
        document.getElementById("antall").value="";
        document.getElementById("fornavn").value="";
        document.getElementById("etternavn").value="";
        document.getElementById("telefonnr").value="";
        document.getElementById("epost").value="";
    }
}

function hentAlle() {
    $.get("/hentAlle", function(kinobillettRegister) {
        formaterData(kinobillettRegister);
    });
}

// Skriver ut array med registrerte
function visKinobillettRegister(kinobillettRegister) {
    let ut = "<table><tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" +
        "</tr>";
    for (let r of kinobillettRegister) {
        ut += "<tr>";
        ut += "<td>" + r.film + "</td><td>" + r.antall + "</td><td>" + r.fornavn + "</td><td>" + r.etternavn + "</td><td>" + r.telefonnr + "</td><td>" + r.epost + "</td>";
        ut += "</tr>";
    }
    ut += "</table>";
    $("#kinobillettRegister").html(ut);
}

// Funksjon for å tømme arrayet for all registrert info
function slettAlle() {
    $.get("/slettAlle", function () {
       hentAlle();
    });
}