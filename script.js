function updateCard() {
    const name = document.getElementById("nameInput").value;
    const squad = document.getElementById("squadInput").value;
    const playstyle = document.getElementById("playstyleInput").value;
    const rating = document.getElementById("ratingInput").value;
    const stars = parseInt(document.getElementById("starsInput").value);

    // Update Text Fields
    document.getElementById("cardName").innerText = name || "JON BONZ";
    document.getElementById("cardSquad").innerText = squad || "REAL MADRID";
    document.getElementById("cardPlaystyle").innerText = playstyle;
    document.getElementById("cardRating").innerText = rating || "74";

    // Update Star Element Output
    document.getElementById("cardStars").innerText = "⭐".repeat(stars);
}

// Convert local image files into absolute visual canvas memory layers safely
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const outputImg = document.getElementById('cardPlayerImg');
            outputImg.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

function downloadCard() {
    const cardElement = document.getElementById("card");
    
    // Captures layout cleanly at high pixel density with no artifacts
    html2canvas(cardElement, {
        scale: 2, 
        backgroundColor: null,
        useCORS: true
    }).then(canvas => {
        let link = document.createElement("a");
        link.download = "efootball-2026-pro-card.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}