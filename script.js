function updateCard() {
    const name = document.getElementById("nameInput").value;
    const squad = document.getElementById("squadInput").value;
    const playstyle = document.getElementById("playstyleInput").value;
    const rating = document.getElementById("ratingInput").value;

    document.getElementById("cardName").innerText = name || "MANAGER NAME";
    document.getElementById("cardSquad").innerText = squad || "SQUAD NAME";
    document.getElementById("cardPlaystyle").innerText = playstyle;
    document.getElementById("cardRating").innerText = rating || "--";
}

function downloadCard() {
    const cardElement = document.getElementById("card");
    
    // Captures card using html2canvas in crisp 2x resolution
    html2canvas(cardElement, {
        scale: 2, 
        backgroundColor: null 
    }).then(canvas => {
        let link = document.createElement("a");
        link.download = "efootball-2026-squad-card.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}