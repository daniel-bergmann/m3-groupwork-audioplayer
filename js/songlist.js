const songList = document.querySelector(".songList");

const allSongs = [];

function addNewSong() {
  // Define the emoji data
  let song = {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/a/a6/Schoolboy_Q_-_Crash_Talk.png",
    isPlaying: false,
    artist: "Schoolboy Q",
    title: "CrasH",
    liked: false,
    songId: allSongs.length + 1,
    audio: ""
  };
  // Add it to the allSongs array
  allSongs.push(song);

  // Add it to the DOM
  let newSong = document.createElement("div");
  newSong.classList.add("newSong");
  songList.appendChild(newSong);

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
  newSongHeart.src = "https://i.ibb.co/N1ZtcqP/heart-Empty.png";
  newSongIcons.appendChild(newSongHeart);
  ///TRASH BUTTON
  let newSongTrash = document.createElement("img");
  newSongTrash.classList.add("trash");
  newSongTrash.src = "https://i.ibb.co/sJTxwk6/trash.png";
  newSongIcons.appendChild(newSongTrash);
  
  // REMOVE ITEM ON CLICK
  newSongTrash.addEventListener("mouseup", (e)=>  {e.target.parentNode.parentNode.remove()})

  let newSongLine = document.createElement("div");
  newSongLine.classList.add("line");
  newSong.appendChild(newSongLine);
}

addNewSong();
addNewSong();



// LIKED SONGS
//filter songs from allSongs that have liked = true; //NOT WORKING??
const likedSongs = allSongs.filter((song) => song.liked === true);

//declare heart button and give it an event listener for click
let heartBtn = document.querySelector(".heart");
heartBtn.addEventListener("click", function () {
  //give it a new red heart image
  heartBtn.src = "https://i.ibb.co/64QT3X6/heart-Full.png";

  //select song by ID (still constant 1, needs to be a variable)
  let selectedSong = allSongs.find((song) => song.songId === 1);
  //set selectedSong
  selectedSong.liked = true;
});


//ADD NEW SONG BUTTON
var loadFile = function(event) {
    currentSong.src = URL.createObjectURL(event.target.files[0]);
  };