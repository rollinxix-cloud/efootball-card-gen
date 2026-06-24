function updateCard() {
    const name = document.getElementById("nameInput").value;
    const pos = document.getElementById("posInput").value;
    const rating = document.getElementById("ratingInput").value;
    const year = document.getElementById("yearInput").value;

    // Direct interface injection values
    document.getElementById("cardName").innerText = name || "CRISTIANO RONALDO";
    document.getElementById("cardPos").innerText = pos || "CF";
    document.getElementById("cardRating").innerText = rating || "110";
    document.getElementById("cardYear").innerText = year || "2014/15";
}

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
    
    html2canvas(cardElement, {
        scale: 3, // Premium ultra-high resolution asset generation
        backgroundColor: null,
        useCORS: true
    }).then(canvas => {
        let link = document.createElement("a");
        link.download = "efootball-epic-card-asset.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}