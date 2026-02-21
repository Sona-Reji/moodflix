let selectedEmoji = "";

/* ===============================
   EMOJI SELECTION
=================================*/
function selectEmoji(event, emoji) {
  selectedEmoji = emoji;

  document.querySelectorAll('.emoji-section span')
    .forEach(el => el.classList.remove('selected'));

  event.target.classList.add('selected');
}

/* ===============================
   ANALYZE EMOTION (Emoji Only)
=================================*/
function analyzeEmotion() {

  const emojiMap = {
    "😊": "happy",
    "😢": "sad",
    "😡": "angry",
    "😌": "calm",
    "💪": "motivated"
  };

  let emotion = emojiMap[selectedEmoji] || "calm";

  changeBackground(emotion);
  fetchMusic(emotion);
}

/* ===============================
   MOOD BACKGROUND CHANGE
=================================*/
function changeBackground(emotion) {

  const colors = {
    happy: "linear-gradient(135deg, #f6d365, #fda085)",
    sad: "linear-gradient(135deg, #4facfe, #00f2fe)",
    angry: "linear-gradient(135deg, #ff512f, #dd2476)",
    calm: "linear-gradient(135deg, #a8edea, #fed6e3)",
    motivated: "linear-gradient(135deg, #667eea, #764ba2)"
  };

  document.body.style.background = colors[emotion];
}

/* ===============================
   FETCH MUSIC (iTunes API)
=================================*/
async function fetchMusic(emotion) {

  const resultEl = document.getElementById("result");
  resultEl.innerHTML = "<h3>Loading music...</h3>";

  try {

    const response = await fetch(
      `https://itunes.apple.com/search?term=${emotion}&media=music&limit=6`
    );

    const data = await response.json();

    let songsHTML = data.results.map(song => `
      <div class="music-card">
        <img src="${song.artworkUrl100}">
        <h4>${song.trackName}</h4>
        <p>${song.artistName}</p>
        <audio controls src="${song.previewUrl}"></audio>
      </div>
    `).join("");

    resultEl.innerHTML = `
      <h2>You are feeling: ${emotion.toUpperCase()}</h2>
      <div class="music-grid">${songsHTML}</div>
    `;

  } catch (error) {
    resultEl.innerHTML = "<h3>Error loading music.</h3>";
    console.error(error);
  }
}