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
   EMOTION ANALYSIS
=================================*/
function analyzeEmotion() {

  let text = document.getElementById("textInput").value.trim().toLowerCase();
  let emotion = "";

  const emojiMap = {
    "😊": "happy",
    "😢": "sad",
    "😡": "angry",
    "😌": "calm",
    "💪": "motivated"
  };

  if (selectedEmoji !== "") {
    emotion = emojiMap[selectedEmoji];
  }

  else if (/happy|great|awesome|good|excited|joy/.test(text))
    emotion = "happy";

  else if (/sad|cry|down|lonely|upset|depressed/.test(text))
    emotion = "sad";

  else if (/angry|mad|frustrated|irritated/.test(text))
    emotion = "angry";

  else if (/stress|exam|pressure|overwhelmed|anxious/.test(text))
    emotion = "stressed";

  else if (/calm|relaxed|peaceful|chill/.test(text))
    emotion = "calm";

  else if (/motivated|productive|focused|gym|energy/.test(text))
    emotion = "motivated";

  else
    emotion = "calm";

  showResult(emotion);
}


/* ===============================
   SHOW RESULTS (Music + Movies)
=================================*/
function showResult(emotion) {

  const musicMap = {

    happy: [
      { name: "Happy – Pharrell Williams", link: "https://youtu.be/ZbZSe6N_BXs" },
      { name: "Shape of You – Ed Sheeran", link: "https://youtu.be/JGwWNGJdvx8" }
    ],

    sad: [
      { name: "Fix You – Coldplay", link: "https://youtu.be/k4V3Mo61fJM" },
      { name: "Someone Like You – Adele", link: "https://youtu.be/hLQl3WQQoQ0" }
    ],

    angry: [
      { name: "Believer – Imagine Dragons", link: "https://youtu.be/7wtfhZwyrcc" },
      { name: "Numb – Linkin Park", link: "https://youtu.be/kXYiU_JCYtU" }
    ],

    calm: [
      { name: "Lofi Chill Beats", link: "https://youtu.be/jfKfPfyJRdk" },
      { name: "Weightless", link: "https://youtu.be/UfcAVejslrU" }
    ],

    motivated: [
      { name: "Eye of the Tiger", link: "https://youtu.be/btPJPFnesV4" },
      { name: "Hall of Fame", link: "https://youtu.be/mk48xRzuNvA" }
    ],

    stressed: [
      { name: "Relaxing Piano", link: "https://youtu.be/2OEL4P1Rz04" },
      { name: "Let It Be – Beatles", link: "https://youtu.be/QDYfEBY9NM4" }
    ]
  };


  const movieMap = {

    happy: [
      {
        name: "3 Idiots",
        trailer: "https://youtu.be/K0eDlFX9GMc",
        imdb: "https://www.imdb.com/title/tt1187043/"
      }
    ],

    sad: [
      {
        name: "The Pursuit of Happyness",
        trailer: "https://youtu.be/89Kq8SDyvfg",
        imdb: "https://www.imdb.com/title/tt0454921/"
      }
    ],

    angry: [
      {
        name: "John Wick",
        trailer: "https://youtu.be/2AUmvWm5ZDQ",
        imdb: "https://www.imdb.com/title/tt2911666/"
      }
    ],

    calm: [
      {
        name: "Life of Pi",
        trailer: "https://youtu.be/3mMN693-F3U",
        imdb: "https://www.imdb.com/title/tt0454876/"
      }
    ],

    motivated: [
      {
        name: "Rocky",
        trailer: "https://youtu.be/3VUblDwa648",
        imdb: "https://www.imdb.com/title/tt0075148/"
      }
    ],

    stressed: [
      {
        name: "Forrest Gump",
        trailer: "https://youtu.be/bLvqoHBptjg",
        imdb: "https://www.imdb.com/title/tt0109830/"
      }
    ]
  };


  /* Generate Music Cards */
  let songsHTML = musicMap[emotion]
    .map(song => `
      <div class="music-card">
        <strong>${song.name}</strong><br><br>
        <a href="${song.link}" target="_blank">▶ Play Song</a>
      </div>
    `).join("");


  /* Generate Movie Cards */
  let moviesHTML = movieMap[emotion]
    .map(movie => `
      <div class="movie-card">
        <strong>${movie.name}</strong><br><br>
        <a href="${movie.trailer}" target="_blank">▶ Watch Trailer</a><br>
        <a href="${movie.imdb}" target="_blank">ℹ View Details</a>
      </div>
    `).join("");


  const resultEl = document.getElementById("result");

  resultEl.classList.remove("visible");

  resultEl.innerHTML = `
    <h2 style="margin-bottom:15px;">You are feeling: ${emotion.toUpperCase()}</h2>

    <div class="section-title">🎵 Music Recommendations</div>
    <div class="music-grid">
      ${songsHTML}
    </div>

    <div class="section-title">🎬 Movie Recommendations</div>
    <div class="movie-row">
      ${moviesHTML}
    </div>
  `;

  void resultEl.offsetWidth;
  resultEl.classList.add("visible");

  selectedEmoji = "";
}