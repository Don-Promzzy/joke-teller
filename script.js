// Targeting the HTML ELement
const buttonEl = document.getElementById("button");
const showJokeText = document.querySelector(".joke__text");
const audioEl = document.getElementById("audio");

// Passing Joke to VoiceRSS API Inorder to Voice the Joke
const sayJoke = (joke) => {
  VoiceRSS.speech({
    key: "6ce3272b5f734f27a2fc39b74f576eef",
    src: joke,
    hl: "en-us",
    v: "Luli",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

// Getting the Jokes from Joke API
const getJoke = async () => {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup}...${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    sayJoke(joke);
    // Disable Button
    toogleBtn();
    // Adding the showJokeText to the getJoke Function Inorder to Show a Joke Text When telling a Joke
    showJokeText.style.display = "block";
    showJokeText.textContent = joke;
  } catch (err) {
    //  Catch Errors Here
    console.log("whoops", err);
  }
};

// Creating a Function for Disable/Enable button when playing a joke and when the joke has ended.
const toogleBtn = () => {
  buttonEl.disabled = !buttonEl.disabled;
  showJokeText.style.display = "none";
};

// Adding Event Listener to the Button to say a Joke when user click on it
buttonEl.addEventListener("click", getJoke, false);
audioEl.addEventListener("ended", toogleBtn, false);
