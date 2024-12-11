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

