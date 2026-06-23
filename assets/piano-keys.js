(function () {
  const keys = Array.from(document.querySelectorAll(".pf-key"));
  const readout = document.querySelector(".pf-note-readout span");
  const keyboardMap = {
    a: "C4",
    w: "C#4",
    s: "D4",
    e: "D#4",
    d: "E4",
    f: "F4",
    t: "F#4",
    g: "G4",
    y: "G#4",
    h: "A4",
    u: "A#4",
    j: "B4",
    k: "C5"
  };

  let audioContext;

  function getAudioContext() {
    if (!audioContext) {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return null;
      audioContext = new AudioCtor();
    }
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
    return audioContext;
  }

  function playFrequency(frequency, note) {
    const context = getAudioContext();
    if (!context) return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.34, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.78);

    if (readout) readout.textContent = note;
  }

  function pressKey(key) {
    const frequency = Number(key.dataset.frequency);
    const note = key.dataset.note || "";
    key.classList.add("active");
    playFrequency(frequency, note);
    window.setTimeout(function () {
      key.classList.remove("active");
    }, 160);
  }

  keys.forEach(function (key) {
    key.addEventListener("pointerdown", function () {
      pressKey(key);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.repeat) return;
    const note = keyboardMap[event.key.toLowerCase()];
    if (!note) return;
    const key = keys.find(function (candidate) {
      return candidate.dataset.note === note;
    });
    if (key) pressKey(key);
  });
})();
