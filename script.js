document.addEventListener("mousemove", (event) => {
   const flashlight = document.getElementById("flashlight");
   flashlight.style.left = `${event.clientX}px`;
   flashlight.style.top = `${event.clientY}px`;
});

let size = 200;
document.addEventListener("wheel", (event) => {
   size += event.deltaY > 0 ? 10 : -10; // Increase/decrease size
   size = Math.max(50, Math.min(size, 400)); // Clamp size between 50 and 400
   const flashlight = document.getElementById("flashlight");
   flashlight.style.width = `${size}px`;
   flashlight.style.height = `${size}px`;
});

document.addEventListener('DOMContentLoaded', () => {
   const gramophoneImage = document.getElementById('gramophoneOverlay');
   const recordImage = document.getElementById('record');
   const audio = document.getElementById('music');

   // Variable to store the last saved rotateZ angle
   let currentAngle = 0;

   // Helper function to get the current rotateZ angle
   function getCurrentAngle(element) {
      const transform = window.getComputedStyle(element).transform;

      if (transform === 'none') {
         return 0; // No transformation applied
      }

      // Extract the matrix values
      const matrix = new DOMMatrix(transform);

      // Calculate the angle in degrees from the matrix (rotation in Z-axis)
      const angle = Math.round(Math.atan2(matrix.m21, matrix.m11) * (180 / Math.PI));

      // Return a positive angle (0 to 360 degrees)
      return angle < 0 ? 360 + angle*-1 : angle*-1;
   }

   // Toggle the spin animation
   gramophoneImage.addEventListener('click', () => {
      if (recordImage.classList.contains('spin')) {
         // Get the current angle when the animation stops
         currentAngle = getCurrentAngle(recordImage);

         // Save the angle in the custom property
         recordImage.style.setProperty('--start-angle', `${currentAngle}deg`);
         recordImage.style.transform = `rotateX(80deg) rotateZ(${currentAngle}deg)`;

         
         // Stop the animation
         recordImage.classList.remove('spin');
         audio.pause();
         
      } else {
         // Start the animation
         recordImage.classList.add('spin');
         audio.play();
      }
   });
});
