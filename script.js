document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const videoElement = document.querySelector('video');
  const captionElement = document.querySelector('.caption');

  let startTime, endTime, captionText;

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const videoUrl = document.querySelector("#videourl").value;
    captionText = document.querySelector("#captionText").value;
    startTime = parseFloat(document.querySelector("#start").value);
    endTime = parseFloat(document.querySelector("#end").value);

    if (!videoUrl || !captionText || isNaN(startTime) || isNaN(endTime)) {
      alert('Please enter all fields correctly.');
      return;
    }

  

    if(startTime >= endTime){
      alert("enter start time is greater than end time")
      return
    }

    videoElement.src = videoUrl;

    videoElement.addEventListener('loadedmetadata', function() {
      const duration = videoElement.duration;

      if (startTime >= duration || endTime >= duration) {
        alert("Entered time is greater than video duration.");
        videoElement.style.display="none"
        return;
      }

      videoElement.play();
    }, { once: true });

    videoElement.load();
  });

  videoElement.addEventListener('timeupdate', function() {
    const currentTime = videoElement.currentTime;

    if (currentTime >= startTime && currentTime <= endTime) {
      captionElement.innerText = captionText;
      captionElement.style.display = "block";
    } else {
      captionElement.innerText = "";
      captionElement.style.display = "none";
    }
  });
});
