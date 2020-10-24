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

  // Define a song as on object with alot of key values
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
  if (song.isPlaying) {
    newSongPlayBtn.src = "https://i.ibb.co/tM331H6/songlist-Pause.png";
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
    : "https://i.ibb.co/N1ZtcqP/heart-Empty.png";
  newSongIcons.appendChild(newSongHeart);
  newSongHeart.addEventListener("click", likeSong);

  ///TRASH BUTTON
  let newSongTrash = document.createElement("img");
  newSongTrash.classList.add("trash");
  newSongTrash.src = "https://i.ibb.co/sJTxwk6/trash.png";
  newSongIcons.appendChild(newSongTrash);
  newSongTrash.addEventListener("click", removeSong);

  //append the audio element to the newsong div
  newSong.appendChild(song.audio);
  if (song.isPlaying) {
    song.audio.play();
  }

  // //audio div
  // let newSongAudio = document.createElement("audio");
  // newSongAudio.classList.add("newAudio");
  // newSongAudio.src = song.audio;
  // songAudios.push(newSongAudio);
  // newSong.appendChild(newSongAudio);
  // if (song.isPlaying) {
  //   newSongAudio.play();
  // }

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

  //this conditional will handle only the song that is playing, but is not current song
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

// menu

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

//PLAYBAR

const playBtn = document.querySelector(".play");
playBtn.addEventListener("click", function () {
  allSongs.forEach((song) => {
    //look for the current song selected
    if (song.currentSong) {
      //if current song isPlaying, set it to !isPlaying
      if (song.isPlaying) {
        song.isPlaying = false; //this needs a pause function
      } else {
        song.isPlaying = true;
      }
    }
    console.log(song.isPlaying);
    resetAllSongsDom();
  });
});

//FORWARD BUTTON

// const forwardBtn = document.querySelector(".forward");
// forwardBtn.addEventListener("click", function () {
//   for (song of allSongs) {
//     //check for current song, and make it not the current song, and make it not playing.
//     //then set the next song to the current song and make it play
//     if (song.currentSong) {
//       song.isPlaying = false;
//       song.currentSong = false;
//       let currentSongIndex = song.songId;
//       let nextSongId = currentSongIndex + 1;

//       //these do not work
//       console.log(allSongs, nextSongId);
//       allSongs[nextSongId].currentSong = true;
//       allSongs[nextSongId].isPlaying = true;
//       console.log("Skipped to next song and set that song to currentSong ");
//       resetAllSongsDom();
//       break;
//     }
//     //resetAllSongsDom();
//   }
// });

//BACK BUTTON
// const backBtn = document.querySelector('.forward')
// forwardBtn.addEventListener('click', function(){
//   allSongs.forEach(song =>{
//     if (song.isPlaying) {
//       song.isPlaying = false;
//       let currentSongIndex = song.songId;
//       let nextSongId = currentSongIndex - 1;
//       allSongs[nextSongId].isPlaying = true;
//     }
//     resetAllSongsDom();
//   });
// });
