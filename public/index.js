let qrInput = document.getElementById("qr-input");
let generateBtn = document.getElementById("generateBtn");
let qrCodeContainer = document.getElementById("qr-code");
let loader = document.getElementById("loader");
let downloadContainer = document.getElementById("download-container");
let shareBtn = document.getElementById("share");

function generateFunction() {
    qrCodeContainer.innerHTML = '';

    let qrInputValue = qrInput.value;
    if (qrInputValue.trim() === "") {
        alert("pls input a text or link to generate a qr code");
        return;
    }

    loader.classList.remove("hidden");
    qrCodeContainer.classList.add("hidden");

    setTimeout(() => {
        loader.classList.add("hidden");
        qrCodeContainer.classList.remove("hidden");

        let qrCode = new QRCode(qrCodeContainer, {
            text: qrInputValue,
            width: 200,
            height: 200,
        });

        downloadContainer.classList.remove("hidden");
        shareBtn.classList.remove("hidden");

        downloadContainer.addEventListener("click", downloadQRCode)
    }, 3000);
}

function downloadQRCode() {
    const canvas = qrCodeContainer.querySelector('canvas');
    if (!canvas) {
        alert("No QR code to download.");
        return;
    }

    const qrCodeDataURL = canvas.toDataURL("image/png");
    const downloadLink = document.createElement('a');
    downloadLink.href = qrCodeDataURL;
    downloadLink.download = 'qr-code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function shareQRCode() {
    const canvas = qrCodeContainer.querySelector('canvas');
    if (!canvas) {
        console.error("No QR code found to share.");
        return;
    }

    canvas.toBlob(function (blob) {
        if (!blob) {
            console.error("Failed to convert canvas to Blob.");
            return;
        }

        const file = new File([blob], "qr-code.png", { type: "image/png" });


        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({
                title: 'Share QR Code',
                text: 'Check out my generated QR code!',
                files: [file]
            }).then(() => {
                console.log('QR Code shared successfully!');
            }).catch((error) => {
                console.error('Error sharing the QR Code:', error);
            });
        } else {
            console.error("Sharing is not supported or the file is not compatible.");
        }
    }, "image/png");
}

generateBtn.addEventListener('click', generateFunction);
downloadContainer.addEventListener('click', downloadQRCode);
shareBtn.addEventListener('click', shareQRCode);

// generateBtn.addEventListener("click", generateFunction)

// function downloadQRCode() {
//     let qrCodeCanvas = qrCodeContainer.querySelector('canvas');

//     if (qrCodeCanvas) {
//         let qrCodeImage = qrCodeCanvas.toDataURL("image/png");

//         let downloadLink = document.createElement('a');
//         downloadLink.href = qrCodeImage;
//         downloadLink.download = 'qrcode.png';
//         downloadLink.click();
//     } else {
//         alert("QR code not found. Please generate one first.");
//     }
// }






// generateBtn.addEventListener("click", generateFunction);
// shareBtn.addEventListener('click', shareQRCode);