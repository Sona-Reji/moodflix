let selectedEmoji = "";
let currentEmotion = "";

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
   ANALYZE EMOTION
=================================*/
function analyzeEmotion() {

  const emojiMap = {
    "😊": "happy",
    "😢": "sad",
    "😡": "angry",
    "😌": "calm",
    "💪": "motivated"
  };

  currentEmotion = emojiMap[selectedEmoji] || "calm";

  changeBackground(currentEmotion);

  // Show choice section
  document.getElementById("choiceSection").style.display = "block";

  // Clear previous results
  document.getElementById("result").innerHTML = "";
}

/* ===============================
   BACKGROUND CHANGE
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
   SHOW MUSIC (iTunes API)
=================================*/
async function showMusic() {

  const resultEl = document.getElementById("result");
  resultEl.innerHTML = "<h3>Loading music...</h3>";

  try {

    const response = await fetch(
      `https://itunes.apple.com/search?term=${currentEmotion}&media=music&limit=6`
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
      <h2>Music for ${currentEmotion.toUpperCase()}</h2>
      <div class="music-grid">${songsHTML}</div>
    `;

  } catch (error) {
    resultEl.innerHTML = "<h3>Error loading music.</h3>";
    console.error(error);
  }
}

/* ===============================
   SHOW MOVIES (Static Based on Mood)
=================================*/
function showMovies() {

  const resultEl = document.getElementById("result");

  const movieMap = {
    happy: ["3 Idiots", "The Intern", "Jumanji"],
    sad: ["The Pursuit of Happyness", "The Fault in Our Stars"],
    angry: ["John Wick", "Gladiator"],
    calm: ["Life of Pi", "Into the Wild"],
    motivated: ["Rocky", "Dangal", "Creed"]
  };

  let moviesHTML = movieMap[currentEmotion]
    .map(movie => `
      <div class="music-card">
        <h4>${movie}</h4>
      </div>
    `).join("");

  resultEl.innerHTML = `
    <h2>Movies for ${currentEmotion.toUpperCase()}</h2>
    <div class="music-grid">${moviesHTML}</div>
  `;
}