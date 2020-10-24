//SONG LIST

const songList = document.querySelector(".songList");

let allSongs = [];
let songAudios = [];

function addNewSong(songSrc) {
  //audio div
  let newSongAudio = document.createElement("audio");
  newSongAudio.classList.add("newAudio");
  newSongAudio.src = songSrc;
  songAudios.push(newSongAudio);

  // Define the song data
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
  // Add it to the allSongs array
  allSongs.push(song);
  console.log("Song added to array");
  resetAllSongsDom();
}

let addSongToDom = function (song) {
  // Add it to the DOM
  let newSong = document.createElement("div");
  newSong.classList.add("newSong");
  songList.appendChild(newSong);

  newSong.setAttribute("data-index", song.songId);

  //song cover
  let newSongCover = document.createElement("img");
  newSongCover.classList.add("newSongCover");
  newSongCover.src = song.cover;
  newSong.appendChild(newSongCover);

  //play button
  let newSongPlayBtn = document.createElement("img");
  newSongPlayBtn.src = "https://i.ibb.co/j59Mq8R/songlist-Play.png";
  newSongPlayBtn.classList.add("newSongPlayBtn");
  newSong.appendChild(newSongPlayBtn);
  newSongPlayBtn.addEventListener("click", playSong);
  //if song is playing ,set its
  if (song.isPlaying) {
    newSongPlayBtn.src = "https://i.ibb.co/tM331H6/songlist-Pause.png";
    playBtnImg.src = "img/pause.png";
  } else {
    playBtnImg.src = "img/play.png";
  }

  //song artist and title div
  let newSongInfo = document.createElement("div");
  newSongInfo.classList.add("newSongInfo");
  newSong.appendChild(newSongInfo);

  //artist
  let newSongArtist = document.createElement("h3");
  newSongArtist.innerHTML = song.artist;
  newSongInfo.appendChild(newSongArtist);

  //title
  let newSongTitle = document.createElement("h4");
  newSongTitle.innerHTML = song.title;
  newSongInfo.appendChild(newSongTitle);

  //icons div
  let newSongIcons = document.createElement("div");
  newSongIcons.classList.add("icons");
  newSong.appendChild(newSongIcons);

  let newSongHeart = document.createElement("img");
  newSongHeart.classList.add("heart");
  newSongHeart.src = song.liked
    ? "https://i.ibb.co/sWv1GY8/heart-Full.png"
    : "https://i.ibb.co/5xt3Wnh/heart.png";
  newSongIcons.appendChild(newSongHeart);
  newSongHeart.addEventListener("click", likeSong);

  ///TRASH BUTTON
  let newSongTrash = document.createElement("img");
  newSongTrash.classList.add("trash");
  newSongTrash.src = "https://i.ibb.co/48cHjGg/Delete.png";
  newSongIcons.appendChild(newSongTrash);
  newSongTrash.addEventListener("click", removeSong);

  //append the audio element to the newsong div
  newSong.appendChild(song.audio);
  if (song.isPlaying) {
    song.audio.play();
  }
  // //line div
  let newSongLine = document.createElement("div");
  newSongLine.classList.add("line");
  newSong.parentNode.appendChild(newSongLine);

  console.log("Song added or changed in DOM");
};

//a function that removes all html from songlist and then puts it back in with newer data
function resetAllSongsDom() {
  document.querySelector(".songList").innerHTML = "";

  allSongs.forEach((song) => {
    addSongToDom(song);

    console.log("DOM Reset.");
  });
}

// UPLOAD BUTTONS
const realUploadBtn = document.querySelector("#real-upload");
const addSongBtn = document.querySelector("#addSongBtn");

//click the input button on click
addSongBtn.addEventListener("click", function (e) {
  e.preventDefault();
  realUploadBtn.click();
});
//when input changes (gets a file), sets the files source as songSrc and runs addNewSong with the songSrc as an argument
realUploadBtn.addEventListener("change", function (e) {
  e.preventDefault();
  const fileInput = e.target;
  let songSrc = fileInput.value;
  console.log(songSrc);
  // the song source has a stupid file path so we
  songSrc = songSrc.toString();
  songSrc = songSrc.substring(11);

  console.log("Song uploaded.");
  addNewSong(songSrc);
});

// PLAY BUTTON
function playSong(e) {
  const clickedSongIndex = e.target.parentNode.getAttribute("data-index");
  const clickedSong = allSongs[clickedSongIndex];
  const currentlyPlayingSong = allSongs.find(function (song) {
    return song.isPlaying;
  });

  //set all songs to not the current song, then set clickedSong to current song.
  allSongs.forEach((song) => {
    song.currentSong = false;
  });
  clickedSong.currentSong = true;

  //this conditional will handle only the song that is playing, but is not current song
  /////it pauses the currently playing song and sets it to not playing and not current song
  if (currentlyPlayingSong && clickedSong !== currentlyPlayingSong) {
    currentlyPlayingSong.audio.pause();
    // MISSING: set songs duration to 00:00
    currentlyPlayingSong.isPlaying = false;
    currentlyPlayingSong.currentSong = false;
  }

  // loop through all songs and set all song.isPlaying = false
  if (clickedSong.isPlaying) {
    clickedSong.isPlaying = false;
    clickedSong.audio.pause();
  } else {
    clickedSong.isPlaying = true;
    clickedSong.audio.play();
  }

  console.log(currentlyPlayingSong);

  const songCover = document.querySelector("#currentCover");
  songCover.src = clickedSong.cover;

  const songArtist = document.querySelector("#artist");
  songArtist.innerHTML = clickedSong.artist;

  const songTitle = document.querySelector("#title");
  songTitle.innerHTML = clickedSong.title;
  resetAllSongsDom();
}

//SONG LIST ICONS
// liked song function
let likedSongs = [];
function likeSong(e) {
  //target the dom element of the selected objects id
  const songId = e.target.parentNode.parentNode.getAttribute("data-index");
  //set the selected objects liked value to whatevers its not
  allSongs[songId].liked = !allSongs[songId].liked;
  //filers all liked songs into an array called likedSongs
  likedSongs = allSongs.filter((song) => song.liked == true);

  console.log("Song added to likedSongs.");
  resetAllSongsDom();
}

//remove song function
function removeSong(e) {
  //get this songs id
  const songId = e.target.parentNode.parentNode.getAttribute("data-index");
  //remove the object with the same id
  var remove = confirm(
    `Are you sure you want to delete ${allSongs[songId].title}?`
  );
  if (remove) {
    allSongs.splice(songId);
  }
  //
  //allSongs.splice(songId)
  //refresh dom
  console.log("Song removed.");
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

likedSongsBtn.addEventListener("click", function () {
  document.querySelector(".songList").innerHTML = "";

  //create HTML elements in the songList div from all song objects in allSongs array that have the key liked value = true

  //if song objects key liked value is true, run addNewSong function+
  allSongs.forEach((song) => {
    if (song.liked) {
      addSongToDom(song);
    }
  });
});

//clear all songList Div elements, then create DOM elements for all allSongs objects in the songList div
allSongsBtn.addEventListener("click", function () {
  document.querySelector(".songList").innerHTML = "";
  allSongs.forEach((song) => {
    addSongToDom(song);
  });
});
