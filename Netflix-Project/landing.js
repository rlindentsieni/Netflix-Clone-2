document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("hero-video"); // Video element
    const playButton = document.querySelector(".btn.btn-light"); // Play button
    const infoButton = document.querySelector(".btn.btn-secondary"); // Info button
  
    // INFO MODAL
    const infoModal = document.createElement("div");
    infoModal.id = "infoModal";
    infoModal.style.position = "fixed";
    infoModal.style.top = "50%";
    infoModal.style.left = "50%";
    infoModal.style.transform = "translate(-50%, -50%)";
    infoModal.style.backgroundColor = "#141414";
    infoModal.style.color = "white";
    infoModal.style.padding = "20px";
    infoModal.style.borderRadius = "8px";
    infoModal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.5)";
    infoModal.style.display = "none";
    infoModal.style.zIndex = "1000";
    infoModal.innerHTML = `
      <div>
        <div style="margin-bottom: 16px; display: flex; gap: 16px; align-items: center;">
          <span style="color: #22c55e; font-weight: bold;">97% Match</span>
          <span style="color: white;">2024</span>
          <span style="border: 1px solid white; padding: 2px 6px; color: white;">HD</span>
        </div>
        <p style="color: white;">
          Follow the world's most dynamic surfer John Florence and his closest friends 
          from the North Shore of Oahu to the South Pacific. Experience breathtaking 
          surfing action, stunning cinematography, and an intimate look into the lives 
          of these passionate athletes as they chase the perfect wave.
        </p>
        <div style="margin-top: 16px; color: #9ca3af;">
          <p><span style="color: white;">Director:</span> James Cameron</p>
          <p><span style="color: white;">Cast:</span> John Florence, Kelly Slater, Nathan Florence</p>
          <p><span style="color: white;">Genres:</span> Sports Documentary, Action & Adventure, Nature & Ecology</p>
        </div>
        <button id="closeInfoModal" style="margin-top: 16px; background-color: white; color: black; border: none; padding: 8px; cursor: pointer;">Close</button>
      </div>
    `;
    document.body.appendChild(infoModal);
  
    document.getElementById("closeInfoModal").addEventListener("click", () => {
      infoModal.style.display = "none";
    });
  
    infoButton.addEventListener("click", () => {
      infoModal.style.display = "block";
    });
  
    // PLAY MODAL
    const playModal = document.createElement("div");
    playModal.id = "playModal";
    playModal.style.position = "fixed";
    playModal.style.top = "0";
    playModal.style.left = "0";
    playModal.style.width = "100vw";
    playModal.style.height = "100vh";
    playModal.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    playModal.style.display = "none";
    playModal.style.zIndex = "1000";
    playModal.innerHTML = `
      <div style="position: relative; width: 80%; height: 80%; margin: 5% auto; background-color: black; border-radius: 8px; overflow: hidden;">
        <video controls autoplay style="width: 100%; height: 100%;">
          <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <button id="closePlayModal" style="position: absolute; top: 10px; right: 10px; background-color: red; color: white; border: none; padding: 8px; cursor: pointer;">X</button>
      </div>
    `;
    document.body.appendChild(playModal);
  
    document.getElementById("closePlayModal").addEventListener("click", () => {
      playModal.style.display = "none";
      const playVideo = playModal.querySelector("video");
      playVideo.pause(); // Pause video when modal closes
    });
  
    playButton.addEventListener("click", () => {
      playModal.style.display = "block";
    });
  });
  