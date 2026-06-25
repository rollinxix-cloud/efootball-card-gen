function updateCard() {
    const name = document.getElementById("nameInput").value;
    const rating = document.getElementById("ratingInput").value;
    const year = document.getElementById("yearInput").value;
    const cardType = document.getElementById("cardTypeInput").value;
    const stars = parseInt(document.getElementById("starsInput").value);

    // Layout configuration values
    const size = document.getElementById("sizeSlider").value;
    const shiftX = document.getElementById("xSlider").value;
    const shiftY = document.getElementById("ySlider").value;

    // Direct interface updates
    document.getElementById("cardName").innerText = name || "BINAYA SHRESTHA";
    document.getElementById("cardRating").innerText = rating || "105";
    document.getElementById("cardYear").innerText = year || "2026/27";
    document.getElementById("cardStars").innerText = "⭐".repeat(stars);

    // Swap theme status
    const cardElement = document.getElementById("card");
    cardElement.className = "card " + cardType;

    // Physical position parsing (preserves pure raw pixels from degradation)
    const imgElement = document.getElementById("cardPlayerImg");
    if (imgElement.style.display === "block") {
        imgElement.style.width = size + "px";
        imgElement.style.left = "50%";
        imgElement.style.marginLeft = (parseInt(shiftX) - (parseInt(size) / 2)) + "px";
        imgElement.style.top = shiftY + "px";
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const tempImg = new Image();
        tempImg.onload = function() {
            // Memory optimization engine: caps image boundaries to optimize canvas speed and clarity
            const maxBound = 1000;
            let targetW = tempImg.width;
            let targetH = tempImg.height;

            if (targetW > maxBound || targetH > maxBound) {
                if (targetW > targetH) {
                    targetH *= maxBound / targetW;
                    targetW = maxBound;
                } else {
                    targetW *= maxBound / targetH;
                    targetH = maxBound;
                }
            }

            // Draw to pristine secondary canvas buffer
            const bufferCanvas = document.createElement('canvas');
            bufferCanvas.width = targetW;
            bufferCanvas.height = targetH;
            const context = bufferCanvas.getContext('2d');
            
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';
            context.drawImage(tempImg, 0, 0, targetW, targetH);

            // Output the perfectly optimized data stream
            const imgElement = document.getElementById('cardPlayerImg');
            imgElement.src = bufferCanvas.toDataURL('image/png', 1.0);
            imgElement.style.display = "block";
            
            updateCard();
        };
        tempImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function downloadCard() {
    const cardElement = document.getElementById("card");
    
    // Scale 3 balances absolute sharpness with mobile memory safety guidelines
    html2canvas(cardElement, {
        scale: 3, 
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
        logging: false,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
    }).then(canvas => {
        let downloadLink = document.createElement("a");
        downloadLink.download = "efootball-card-hq.png";
        downloadLink.href = canvas.toDataURL("image/png", 1.0);
        downloadLink.click();
    });
            }
        
