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

// Convert uploaded media cleanly into absolute visual layout pixels
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
    
    // Captures canvas elements at high-definition zoom layers flawlessly
    html2canvas(cardElement, {
        scale: 3, 
        backgroundColor: null,
        useCORS: true
    }).then(canvas => {
        let link = document.createElement("a");
        link.download = "efootball-squad-asset.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
