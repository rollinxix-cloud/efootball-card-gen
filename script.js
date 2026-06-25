function updateCard() {
    const name = document.getElementById("nameInput").value;
    const rating = document.getElementById("ratingInput").value;
    const year = document.getElementById("yearInput").value;
    const cardType = document.getElementById("cardTypeInput").value;
    const stars = parseInt(document.getElementById("starsInput").value);

    // Direct High-Density layout inputs
    const size = document.getElementById("sizeSlider").value;
    const shiftX = document.getElementById("xSlider").value;
    const shiftY = document.getElementById("ySlider").value;

    // Synchronize content strings
    document.getElementById("cardName").innerText = name || "BINAYA SHRESTHA";
    document.getElementById("cardRating").innerText = rating || "105";
    document.getElementById("cardYear").innerText = year || "2026/27";
    document.getElementById("cardStars").innerText = "⭐".repeat(stars);

    // Update Theme Class
    const cardElement = document.getElementById("card");
    cardElement.className = "card " + cardType;

    // Pure Layout Mutation Engine (Completely protects pixel density from blurring)
    const imgElement = document.getElementById("cardPlayerImg");
    if (imgElement.style.display === "block") {
        imgElement.style.width = size + "px";
        imgElement.style.left = "50%";
        imgElement.style.marginLeft = (shiftX - (size / 2)) + "px";
        imgElement.style.top = shiftY + "px";
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = document.getElementById('cardPlayerImg');
            imgElement.src = e.target.result;
            imgElement.style.display = "block";
            updateCard(); // Refresh layout setup immediately
        }
        reader.readAsDataURL(file);
    }
}

function downloadCard() {
    const cardElement = document.getElementById("card");
    
    // Scale 4 creates a massively high-res final asset file
    html2canvas(cardElement, {
        scale: 4, 
        backgroundColor: null,
        useCORS: true,
        logging: false,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
    }).then(canvas => {
        let link = document.createElement("a");
        link.download = "efootball-ultra-hd-card.png";
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
    });
        }
            
