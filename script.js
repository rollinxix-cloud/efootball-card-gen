function updateCard() {
    const name = document.getElementById("nameInput").value;
    const rating = document.getElementById("ratingInput").value;
    const year = document.getElementById("yearInput").value;
    const cardType = document.getElementById("cardTypeInput").value;
    const stars = parseInt(document.getElementById("starsInput").value);

    document.getElementById("cardName").innerText = name || "BINAYA SHRESTHA";
    document.getElementById("cardRating").innerText = rating || "105";
    document.getElementById("cardYear").innerText = year || "2026/27";
    document.getElementById("cardStars").innerText = "⭐".repeat(stars);

    const cardElement = document.getElementById("card");
    cardElement.className = "card " + cardType;
}

// Computer Vision Matrix Execution
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const mainCardImg = document.getElementById('cardPlayerImg');
        const tempTrackerImg = document.getElementById('tempTrackerImg');

        // Set sources
        mainCardImg.src = e.target.result;
        tempTrackerImg.src = e.target.result;

        tempTrackerImg.onload = function() {
            const naturalWidth = tempTrackerImg.naturalWidth;
            const naturalHeight = tempTrackerImg.naturalHeight;

            // Instantiate Client-Side Tracking Algorithm Object
            const tracker = new tracking.ObjectTracker('face');
            tracker.setInitialScale(4);
            tracker.setStepSize(2);
            tracker.setEdgesDensity(0.1);

            tracking.track('#tempTrackerImg', tracker);

            tracker.once('track', function(trackEvent) {
                // Target framework anchor points
                const frameWidth = 340;
                const frameHeight = 495;
                const targetFaceWidth = 125; // Perfect face composition rule scale

                if (trackEvent.data && trackEvent.data.length > 0) {
                    // Target Face Detected Successfully!
                    const face = trackEvent.data[0];
                    
                    // Math Matrix Calculations
                    const scaleFactor = targetFaceWidth / face.width;
                    const computedWidth = naturalWidth * scaleFactor;
                    const computedHeight = naturalHeight * scaleFactor;

                    const scaledFaceCenterX = (face.x + (face.width / 2)) * scaleFactor;
                    const scaledFaceCenterY = (face.y + (face.height / 2)) * scaleFactor;

                    // Compute clean position values
                    const finalLeft = (frameWidth / 2) - scaledFaceCenterX;
                    const finalTop = 165 - scaledFaceCenterY; // Positions face at the perfect 1/3 height level

                    // Apply precise coordinates
                    mainCardImg.style.width = computedWidth + "px";
                    mainCardImg.style.height = computedHeight + "px";
                    mainCardImg.style.left = finalLeft + "px";
                    mainCardImg.style.top = finalTop + "px";
                } else {
                    // Fallback configuration if face tracking misses
                    const scaleFactor = frameWidth / naturalWidth;
                    mainCardImg.style.width = frameWidth + "px";
                    mainCardImg.style.height = (naturalHeight * scaleFactor) + "px";
                    mainCardImg.style.left = "0px";
                    mainCardImg.style.top = "30px";
                }
            });
        };
    };
    reader.readAsDataURL(file);
}

function downloadCard() {
    const cardElement = document.getElementById("card");
    
    // Configured with high-definition rendering parameters
    html2canvas(cardElement, {
        scale: 4, // Anti-blur upscaling depth level
        backgroundColor: null,
        useCORS: true,
        logging: false,
        imageSmoothingEnabled: true
    }).then(canvas => {
        let link = document.createElement("a");
        link.download = "efootball-squad-asset.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
                         }
                        
