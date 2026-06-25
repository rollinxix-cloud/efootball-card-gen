function updateCard() {
    const name = document.getElementById("nameInput").value;
    const rating = document.getElementById("ratingInput").value;
    const year = document.getElementById("yearInput").value;
    const cardType = document.getElementById("cardTypeInput").value;
    const stars = parseInt(document.getElementById("starsInput").value);
    const blendMode = document.getElementById("blendInput").value;

    // Manual slider coordinate extraction 
    const zoom = document.getElementById("zoomSlider").value;
    const shiftX = document.getElementById("xSlider").value;
    const shiftY = document.getElementById("ySlider").value;

    // Text Sync Updates
    document.getElementById("cardName").innerText = name || "BINAYA SHRESTHA";
    document.getElementById("cardRating").innerText = rating || "105";
    document.getElementById("cardYear").innerText = year || "2026/27";
    document.getElementById("cardStars").innerText = "⭐".repeat(stars);

    // Swap Background Core Layout Tiers
    const cardElement = document.getElementById("card");
    cardElement.className = "card " + cardType;

    // Apply hardware accelerated parameters safely without stretching original image file dimensions
    const graphicElement = document.getElementById("cardPlayerImg");
    graphicElement.style.setProperty('--img-scale', zoom);
    graphicElement.style.setProperty('--img-x', shiftX + 'px');
    graphicElement.style.setProperty('--img-y', shiftY + 'px');
    graphicElement.style.setProperty('--img-blend', blendMode);
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const outputDiv = document.getElementById('cardPlayerImg');
            outputDiv.style.backgroundImage = "url('" + e.target.result + "')";
            updateCard(); // Fires frame setup instantaneously 
        }
        reader.readAsDataURL(file);
    }
}

function downloadCard() {
    const cardElement = document.getElementById("card");
    
    // Configured at scale 4 with explicitly enabled image smoothing engines for perfect asset output
    html2canvas(cardElement, {
        scale: 4, 
        backgroundColor: null,
        useCORS: true,
        logging: false,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
    }).then(canvas => {
        let link = document.createElement("a");
        link.download = "efootball-ultra-hq-squad-asset.png";
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
    });
}
