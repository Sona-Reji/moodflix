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

  document.getElementById("choiceSection").style.display = "block";
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
   SHOW MUSIC (Malayalam + English Mix)
=================================*/
async function showMusic() {

  const resultEl = document.getElementById("result");
  resultEl.innerHTML = "<h3>Loading music...</h3>";

  try {

    const emotionKeywordMap = {
      happy: "happy feel good",
      sad: "sad emotional",
      angry: "angry intense",
      calm: "calm relaxing",
      motivated: "motivational energetic"
    };

    const baseKeyword = emotionKeywordMap[currentEmotion] || currentEmotion;

    const malQuery = `${baseKeyword} malayalam song`;
    const engQuery = `${baseKeyword} song`;

    const malResponse = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(malQuery)}&media=music&limit=3`
    );

    const engResponse = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(engQuery)}&media=music&limit=3`
    );

    const malData = await malResponse.json();
    const engData = await engResponse.json();

    const songs = [
      ...(malData.results || []),
      ...(engData.results || [])
    ]
      .filter(song => song.previewUrl)
      .slice(0, 6);

    if (songs.length === 0) {
      resultEl.innerHTML = "<h3>No songs found.</h3>";
      return;
    }

    let songsHTML = songs.map(song => `
      <div class="music-card">
        <img src="${song.artworkUrl100}">
        <h4>${song.trackName}</h4>
        <p>${song.artistName}</p>
        <audio controls src="${song.previewUrl}"></audio>
      </div>
    `).join("");

    resultEl.innerHTML = `
      <h2>${currentEmotion.toUpperCase()} Songs (Malayalam + English)</h2>
      <div class="music-grid">${songsHTML}</div>
    `;

  } catch (error) {
    resultEl.innerHTML = "<h3>Error loading music.</h3>";
    console.error(error);
  }
}

/* ===============================
   SHOW MOVIES (Malayalam Included)
=================================*/
async function showMovies() {

  const resultEl = document.getElementById("result");
  resultEl.innerHTML = "<h3>Loading movies...</h3>";

  const movieMap = {

    happy: [
      { title: "Charlie", year: 2015 },
      { title: "Bangalore Days", year: 2014 },
      { title: "Premam", year: 2015 },
      { title: "Ustad Hotel", year: 2012 },
      { title: "The Intern", year: 2015 },
      { title: "Paddington", year: 2014 }
    ],

    motivated: [
      { title: "Maheshinte Prathikaaram", year: 2016 },
      { title: "Dangal", year: 2016 },
      { title: "Rocky", year: 1976 },
      { title: "Chak De India", year: 2007 },
      { title: "October Sky", year: 1999 }
    ],

    sad: [
      { title: "Thanmathra", year: 2005 },
      { title: "Sufiyum Sujatayum", year: 2020 },
      { title: "The Fault in Our Stars", year: 2014 },
      { title: "A Walk to Remember", year: 2002 }
    ],

    angry: [
      { title: "Lucifer", year: 2019 },
      { title: "Kammatipaadam", year: 2016 },
      { title: "John Wick", year: 2014 },
      { title: "Gladiator", year: 2000 }
    ],

    calm: [
      { title: "Sudani from Nigeria", year: 2018 },
      { title: "Android Kunjappan Version 5.25", year: 2019 },
      { title: "Life of Pi", year: 2012 },
      { title: "Into the Wild", year: 2007 }
    ]
  };

  const selectedMovies = movieMap[currentEmotion] || movieMap["happy"];
  const apiKey = "8c5a3cd8b7c7fae2ed50b18b490dbf3b";

  try {

    const moviePromises = selectedMovies.map(async movie => {

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie.title}&year=${movie.year}`
      );

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        return data.results[0];
      }

      return null;
    });

    const moviesData = await Promise.all(moviePromises);

    const validMovies = moviesData
      .filter(movie => movie && movie.poster_path)
      .slice(0, 8);

    if (validMovies.length === 0) {
      resultEl.innerHTML = "<h3>No movies found.</h3>";
      return;
    }

    let moviesHTML = validMovies.map(movie => `
      <div class="movie-card">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
        <h4>${movie.title}</h4>
        <p>⭐ ${movie.vote_average}</p>
      </div>
    `).join("");

    resultEl.innerHTML = `
      <h2>${currentEmotion.toUpperCase()} Movies</h2>
      <div class="movie-grid">${moviesHTML}</div>
    `;

  } catch (error) {
    resultEl.innerHTML = "<h3>Error loading movies.</h3>";
    console.error(error);
  }
}