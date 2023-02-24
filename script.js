const scanBtn = document.getElementById('scan-btn');
const resultDiv = document.getElementById('result');

// Function to handle when the scan button is clicked
scanBtn.addEventListener('click', function() {
  // Use the getUserMedia method to access the user's camera
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function(stream) {
    // Create a new Instascan scanner instance
    const scanner = new Instascan.Scanner({ video: stream });
    
    // Add a function to handle when a QR code is detected
    scanner.addListener('scan', function(content) {
      // Stop scanning and close the camera stream
      scanner.stop();
      stream.getTracks().forEach(function(track) {
        track.stop();
      });
      
      // Display the decoded QR code data
      resultDiv.innerHTML = content;
    });
    
    // Start scanning for QR codes
    Instascan.Camera.getCameras().then(function(cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    }).catch(function(e) {
      console.error(e);
    });
  }).catch(function(e) {
    console.error(e);
  });
});
