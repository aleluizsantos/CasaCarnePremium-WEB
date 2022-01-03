const alertSound = new Audio("/notification2.mp3");

const playAudio = () => {
  alertSound.loop = true;
  alertSound.volume = 1.0;
  alertSound.play().catch((error) => console.log(error));
};

const pauseAudio = () => {
  alertSound.pause();
  alertSound.currentTime = 0;
};

/**
 * Reproduz som de alert
 * @param {string} action play || pause
 * @returns {Function} retorna uma função
 */
const Alert_Sound = (action = "play") => {
  switch (action) {
    case "play":
      return playAudio();
    case "pause":
      return pauseAudio();
    default:
      return pauseAudio();
  }
};
export default Alert_Sound;
