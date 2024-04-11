function regKinobillett() {
    const kinobillett = {
    filmer : $("#filmer").val(),
    antall : $("#antall").val(),
    fornavn : $("#fornavn").val(),
    etternavn : $("#etternavn").val(),
    telefonnr : $("#telefonnr").val(),
    epost : $("#epost").val(),
};
    $.post("/lagre", kinobillett, function(){
    hentAlle();
});
    $("#filmer").val("");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#telefonnr").val("");
    $("#epost").val("");
}

    function hentAlle() {
    $.get("/hentAlle", function(billetter) {
        formaterData(billett);
    });
}

    function formaterData(billetter) {
    let ut = "<table><tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
    "<th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>";
    for (const billett of billetter) {
    ut += "<tr><td>" + billett.filmer + "</td><td>" + billett.antall + "</td><td>" + billett.fornavn + "</td>" +
    "<td>" + billett.etternavn + "</td><td>" + billett.telefonnr + "</td><td>" + billett.epost + "</td></tr>";
}
    ut += "</table>";
    $("#kinobillettRegister").html(ut);
}

    function slettAlle() {
    $.get( "/slettAlle", function() {
        hentAlle();
    });
}