//SONG LIST

const songList = document.querySelector(".songList");

let allSongs = [];

//
function addNewSong(songSrc) {
  //1. audio element created.
  let newSongAudio = document.createElement("audio");
  newSongAudio.classList.add("newAudio");
  newSongAudio.src = songSrc;

  //2. Define the song as an object with the following keys and starting values
  let song = {
    cover: "https://i.ytimg.com/vi/oYadGMVZm0E/hqdefault.jpg",
    artist: "Daddy Yankee",
    title: "terremoto",
    audio: newSongAudio,
    liked: false,
    songId: allSongs.length,
    isPlaying: false,
    currentSong: false,
  };
  //3. Add it to the allSongs array
  allSongs.push(song);
  console.log("Song added to array");
  resetAllSongsDom();
}

//
let addSongToDom = function (song) {
  // 1. Create a DOM Div for the new song
  let newSong = document.createElement("div");
  newSong.classList.add("newSong");
  songList.appendChild(newSong);
  newSong.setAttribute("data-index", song.songId);

  //2. Song cover added to the div
  let newSongCover = document.createElement("img");
  newSongCover.classList.add("newSongCover");
  newSongCover.src = song.cover;
  newSong.appendChild(newSongCover);

  //3. Play button added to the div
  let newSongPlayBtn = document.createElement("img");
  newSongPlayBtn.src = "https://i.ibb.co/j59Mq8R/songlist-Play.png";
  newSongPlayBtn.classList.add("newSongPlayBtn");
  newSong.appendChild(newSongPlayBtn);
  newSongPlayBtn.addEventListener("click", playSong);
  //3.1 Check if song is playing, and show play or pause accordingly
  if (song.isPlaying) {
    newSongPlayBtn.src = "https://i.ibb.co/tM331H6/songlist-Pause.png";
    playBtnImg.src = "img/pause.png";
  } else {
    playBtnImg.src = "img/play.png";
  }

  //4. Song info div element created and added to the div
  let newSongInfo = document.createElement("div");
  newSongInfo.classList.add("newSongInfo");
  newSong.appendChild(newSongInfo);

  //4.1 Artist name element created in song info div
  let newSongArtist = document.createElement("h3");
  newSongArtist.innerHTML = song.artist;
  newSongInfo.appendChild(newSongArtist);

  //4.2 Song title element created in song info div
  let newSongTitle = document.createElement("h4");
  newSongTitle.innerHTML = song.title;
  newSongInfo.appendChild(newSongTitle);

  //5. Icons div created and added to new song div
  let newSongIcons = document.createElement("div");
  newSongIcons.classList.add("icons");
  newSong.appendChild(newSongIcons);

  //5.1.1 Heart icon created and added to new song div
  let newSongHeart = document.createElement("img");
  newSongHeart.classList.add("heart");
  //5.1.2 Show red heart if liked = true, else show empty heart
  newSongHeart.src = song.liked
    ? "https://i.ibb.co/sWv1GY8/heart-Full.png"
    : "https://i.ibb.co/5xt3Wnh/heart.png";
  newSongIcons.appendChild(newSongHeart);
  //5.1.3 Run likeSong function on click
  newSongHeart.addEventListener("click", likeSong);

  //5.2.1 Trash button created and added to new song div
  let newSongTrash = document.createElement("img");
  newSongTrash.classList.add("trash");
  newSongTrash.src = "https://i.ibb.co/48cHjGg/Delete.png";
  newSongIcons.appendChild(newSongTrash);
  //5.2.2 Run removeSong function on click
  newSongTrash.addEventListener("click", removeSong);

  //6. Append the audio element from addNewSong function to the newSong div
  newSong.appendChild(song.audio);
  if (song.isPlaying) {
    song.audio.play();
  }
  //7. Create a line div below all new songs to match style.
  let newSongLine = document.createElement("div");
  newSongLine.classList.add("line");
  newSong.parentNode.appendChild(newSongLine);

  console.log("Song added or changed in DOM");
};

// RESET ALL DOM - a function that removes all html from songlist and then puts it back in with newer data
function resetAllSongsDom() {
  //1. Clear the song list DOM element
  document.querySelector(".songList").innerHTML = "";
  //2. Add a song to the DOM for each song in the allSongs array
  allSongs.forEach((song) => {
    addSongToDom(song);
    console.log("DOM Reset.");
  });
}

// UPLOAD BUTTONS
const realUploadBtn = document.querySelector("#real-upload");
const addSongBtn = document.querySelector("#addSongBtn");

//1. click the input button on click
addSongBtn.addEventListener("click", function (e) {
  e.preventDefault();
  realUploadBtn.click();
});
//2. when input changes (gets a file), set the files source as songSrc
realUploadBtn.addEventListener("change", function (e) {
  e.preventDefault();
  const fileInput = e.target;
  let songSrc = fileInput.value;
  console.log(songSrc);
  // the song source has a stupid file path so we
  songSrc = songSrc.toString();
  songSrc = songSrc.substring(11);

  console.log("Song uploaded.");
  //3. Run the addNewSong with the songSrc (filepath of uploaded song) argument
  addNewSong(songSrc);
});

// PLAY BUTTON
function playSong(e) {
  const clickedSongIndex = e.target.parentNode.getAttribute("data-index");
  const clickedSong = allSongs[clickedSongIndex];
  const currentlyPlayingSong = allSongs.find(function (song) {
    return song.isPlaying;
  });

  //1. set all songs to not the current song, then set clickedSong to current song.
  allSongs.forEach((song) => {
    song.currentSong = false;
  });
  clickedSong.currentSong = true;

  //2. find song that is playing but is not current song, pause it, and set it to not the current song nor the one that isPlaying
  if (currentlyPlayingSong && clickedSong !== currentlyPlayingSong) {
    currentlyPlayingSong.audio.pause();
    // MISSING: set songs duration to 00:00
    currentlyPlayingSong.isPlaying = false;
    currentlyPlayingSong.currentSong = false;
  }

  //3. check if the clicked song is playing, if it is then  set isplaying to false and pause, otherwise set it to true and play.
  if (clickedSong.isPlaying) {
    clickedSong.isPlaying = false;
    clickedSong.audio.pause();
  } else {
    clickedSong.isPlaying = true;
    clickedSong.audio.play();
  }
  //4. give the nowPlaying footer section the cover, artist name and song title of the clicked song
  const songCover = document.querySelector("#currentCover");
  songCover.src = clickedSong.cover;

  const songArtist = document.querySelector("#artist");
  songArtist.innerHTML = clickedSong.artist;

  const songTitle = document.querySelector("#title");
  songTitle.innerHTML = clickedSong.title;
  //5. reset the dom to match the true state of the array
  resetAllSongsDom();
}

//SONG LIST ICONS
// liked song function
let likedSongs = [];
function likeSong(e) {
  //1. target the dom element of the selected objects id
  const songId = e.target.parentNode.parentNode.getAttribute("data-index");
  //2. set the selected objects liked value to whatevers its not
  allSongs[songId].liked = !allSongs[songId].liked;
  //3. filter all liked songs into an array called likedSongs
  likedSongs = allSongs.filter((song) => song.liked == true);
  console.log("Song added to likedSongs.");
  //4. //5. reset the dom to match the true state of the array
  resetAllSongsDom();
}

//remove song function
function removeSong(e) {
  //1. get this songs id
  const songId = e.target.parentNode.parentNode.getAttribute("data-index");
  //2. alert a confirmation window, remove the song object from the array if confirmed.
  var remove = confirm(
    `Are you sure you want to delete ${allSongs[songId].title}?`
  );
  if (remove) {
    allSongs.splice(songId);
  }
  console.log("Song removed.");
  //3. reset the dom to match the true state of the array
  resetAllSongsDom();
}

//PLAYBAR

////Play button
const playBtn = document.querySelector(".play");
const playBtnImg = document.querySelector("#playBtnImg");
playBtn.addEventListener("click", function () {
  //1. change the image depending if a song is playing or not
  allSongs.forEach((song) => {
    if (song.isPlaying) {
      playBtnImg.src = "img/play.png";
    } else {
      playBtnImg.src = "img/pause.png";
    }
  });
  //2. check if the current song is playing and pause if it is, else play.
  allSongs.forEach((song) => {
    if (song.currentSong) {
      if (song.isPlaying) {
        song.isPlaying = false;
        song.audio.pause();
      } else {
        song.isPlaying = true;
        song.audio.play();
      }
    }
    //3. everytime we make any change we have to reset dom to match the true state of array
    resetAllSongsDom();
  });
});

////Forward button
const forwardBtn = document.querySelector(".forward");
forwardBtn.addEventListener("click", function () {
  allSongs.forEach((song) => {
    if (song.isPlaying) {
      song.isPlaying = false;
      let currentSongIndex = song.songId;
      let nextSongId = currentSongIndex + 1;
      allSongs[nextSongId].isPlaying = true;
    }
    resetAllSongsDom();
  });
});

////Back Button
//definition: on click, set current songs duration to 0 and play again. if current song duration = 0, play the song with the index -1

// MENU
const allSongsBtn = document.querySelector("#allSongsBtn");
const likedSongsBtn = document.querySelector("#likedSongsBtn");

////Liked songs
likedSongsBtn.addEventListener("click", function () {
  //1. clear the songLists DOM elements
  document.querySelector(".songList").innerHTML = "";

  //2. create DOM elements in the songList div for all song objects in allSongs array that have the key liked value = true
  allSongs.forEach((song) => {
    if (song.liked) {
      addSongToDom(song);
    }
  });
});

////All songs
//clear all songList Div elements, then create DOM elements for all allSongs objects in the songList div
allSongsBtn.addEventListener("click", function () {
  //1. clear the songLists DOM elements
  document.querySelector(".songList").innerHTML = "";
  //2. add DOM elements for all songs in the array
  allSongs.forEach((song) => {
    addSongToDom(song);
  });
});
