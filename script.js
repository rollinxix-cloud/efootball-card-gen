function updateCard() {
    const name = document.getElementById("nameInput").value;
    const pos = document.getElementById("posInput").value;
    const rating = document.getElementById("ratingInput").value;

    document.getElementById("cardName").innerText = name || "PLAYER NAME";
    document.getElementById("cardPos").innerText = pos || "POS";
    document.getElementById("cardRating").innerText = rating || "--";
}

function downloadCard() {
    html2canvas(document.getElementById("card")).then(canvas => {
        let link = document.createElement("a");
        link.download = "my-card.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}