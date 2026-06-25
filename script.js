function updateCard() {
    const name = document.getElementById("nameInput").value;
    const rating = document.getElementById("ratingInput").value;
    const year = document.getElementById("yearInput").value;
    const cardType = document.getElementById("cardTypeInput").value;
    const stars = parseInt(document.getElementById("starsInput").value);

    // Update Text Blocks with clear fallbacks
    document.getElementById("cardName").innerText = name || "BINAYA SHRESTHA";
    document.getElementById("cardRating").innerText = rating || "105";
    document.getElementById("cardYear").innerText = year || "2026/27";

    // Handle Star Output dynamically
    document.getElementById("cardStars").innerText = "⭐".repeat(stars);

    // Swap Background Core Layout Engine Tiers smoothly
    const cardElement = document.getElementById("card");
    cardElement.className = "card " + cardType;
}

// FIXED: Converts uploaded media safely into CSS background-image paths to stop download warping bugs
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const outputDiv = document.getElementById('cardPlayerImg');
            outputDiv.style.backgroundImage = "url('" + e.target.result + "')";
        }
        reader.readAsDataURL(file);
    }
}

function downloadCard() {
    const cardElement = document.getElementById("card");
    
    // Captures canvas elements at high-definition zoom layers flawlessly
    html2canvas(cardElement, {
        scale: 3, 
        backgroundColor: null,
        useCORS: true,
        logging: false
    }).then(canvas => {
        let link = document.createElement("a");
        link.download = "efootball-squad-asset.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
