// Funksjon for kjøp av billett
function kjøpAvBillett() {
    // Tømmer feilmeldingene før validering
    $("#ugyldigAntall").html("");
    $("#ikkeNummer").html("");
    $("#ugyldigFornavn").html("");
    $("#ugyldigEtternavn").html("");
    $("#ugyldigEpost").html("");

    const film = $("#filmer").val();
    const antall = $("#antall").val();
    const fornavn = $("#fornavn").val();
    const etternavn = $("#etternavn").val();
    const telefonnr = $("#telefonnr").val();
    const epost = $("#epost").val();


    if (antall === "" || isNaN(antall) || parseInt(antall) <= 0) {
        $("#ugyldigAntall").html("Ugyldig, må fylle inn antall");
    }

    if(isNaN(telefonnr) || telefonnr.length !== 8){
        $("#ikkeNummer").html("Ugyldig, telefonnr må bestå av 8 siffer");
    }

    if (fornavn.length === 0 || !isNaN(fornavn)) {
        $("#ugyldigFornavn").html("Ugyldig, må fylle inn fornavn");
    }

    if (etternavn.length === 0 || !isNaN(etternavn)) {
        $("#ugyldigEtternavn").html("Ugyldig, må fylle inn etternavn");
    }

    if (!epost.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost)) {
        $("#ugyldigEpost").html("Ugyldig e-postadresse");
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
        visKinobillettRegister();

        // Sletter info fra input-boksene
        $("#filmer").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
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