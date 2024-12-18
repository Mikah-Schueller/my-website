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

document.addEventListener('DOMContentLoaded', () => {
   // Define an object that maps element IDs to their respective modal content
   const modalData = {
      typewriter: {
         title: "The Files You Didn’t Know You Needed:",
         content: "(You open the dossier. The name catches your eye: Mikah Schueller. A mind sharp enough to solve any puzzle, digital or physical.)<br><br>A codebreaker in a world of algorithms, Mikah weaves through Java, Python, and C++ like a pro, turning complex problems into elegant solutions. From the halls of Rensselaer Polytechnic Institute to the glow of a midnight laptop screen, Mikah’s been cracking the toughest challenges, one line at a time.<br><br>Off the screen, Mikah’s strategy is just as sharp. As vice president of his college’s pickleball club, he runs drills and tournaments with the precision of a seasoned tactician. Every match, a calculated move; every rally, part of a bigger plan — methodical, analytical, always one step ahead.<br><br>(The dossier ends here, but something tells you there’s more to the story. The question is, are you ready to find out?)"
      },
      phone: {
         title: "Be the Next to Contact This Detective:",
         content: "<i>(...The line’s busy — it always is. Better send an email if you want to get through.)</i><br><br><a href='https://www.linkedin.com/in/mikah-schueller-7a8937272' target='_blank' rel='noopener noreferrer'>mikah.g.schueller@gmail.com</a>"
      },
      invoice: {
         title: "The Price of Innovation:",
         content: "<i>(You pick up the slip. Something about it feels... off. A red herring? A phony? Or maybe it’s just ahead of its time — just like the tech genius behind it.)</i>"
      },
      confidential: {
         title: "A Lead Worth Following:",
         content: "(Inside? A sealed opportunity to collaborate. Mikah’s always on the lookout for teams to work with — are you one of them?)"
      }
   };

   // Add event listeners to all buttons
   Object.keys(modalData).forEach(elementId => {
      openModal(elementId, modalData[elementId]);
   });

   closeModal();
});

function openModal(elementId, modalContent) {
   const element = document.getElementById(elementId);
   const modalContainer = document.getElementById('modalContainer');
   const modalTitle = document.getElementById('modalTitle');
   const modalBody = document.getElementById('modalContent');

   if (element) {
      element.addEventListener('click', () => {
         // Set modal content dynamically based on the clicked element
         modalTitle.innerHTML = modalContent.title;
         modalBody.innerHTML = modalContent.content;

         // Display the modal
         modalContainer.style.display = 'flex';
      });
   } else {
      console.error(`Element with ID '${elementId}' not found.`);
   }
}

function closeModal() {
   const modalContainer = document.getElementById('modalContainer');
   const closeButton = document.getElementById('close');
   
   // Close modal when modalContainer or close button is clicked
   modalContainer.addEventListener('click', (event) => {
      if (event.target === modalContainer || event.target === closeButton) {
         modalContainer.style.display = 'none';
      }
   });
}