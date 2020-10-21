//SONG LIST

const songList = document.querySelector(".songList");

let allSongs = [];

function addNewSong( songSrc ) {
  // Define the emoji data
  let song = {
    cover:
      "https://i.ibb.co/tM331H6/songlist-Pause.png",
    isPlaying: false,
    artist: "Daddy Yankee",
    title: "terremoto",
    liked: false,
    songId: allSongs.length,
    audio: songSrc
  };
  // Add it to the allSongs array
  allSongs.push(song);
  console.log("Song added to array")
  resetAllSongsDom();
}

let addSongToDom = function( song ) {

  // Add it to the DOM
  let newSong = document.createElement("div");
  newSong.classList.add("newSong");
  songList.appendChild(newSong);

  newSong.setAttribute('data-index', song.songId);

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
  newSongPlayBtn.addEventListener('click', playSong)
  if (song.isPlaying) {
    newSongPlayBtn.src = "https://i.ibb.co/tM331H6/songlist-Pause.png"
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
  newSongHeart.src = song.liked ? "https://i.ibb.co/sWv1GY8/heart-Full.png" : "https://i.ibb.co/N1ZtcqP/heart-Empty.png";
  newSongIcons.appendChild(newSongHeart);
  newSongHeart.addEventListener('click', likeSong)



  ///TRASH BUTTON
  let newSongTrash = document.createElement("img");
  newSongTrash.classList.add("trash");
  newSongTrash.src = "https://i.ibb.co/sJTxwk6/trash.png";
  newSongIcons.appendChild(newSongTrash);
  newSongTrash.addEventListener('click', removeSong)
  
  //audio div
  let newSongAudio = document.createElement("audio");
  newSongAudio.classList.add("newAudio");
  newSongAudio.src = song.audio;
  newSong.appendChild(newSongAudio);
  if (song.isPlaying) {
    newSongAudio.play();
  }

  console.log("Song added or changed in DOM")
}

//a function that removes all html from songlist and then puts it back in with newer data
function resetAllSongsDom(){
document.querySelector('.songList').innerHTML = '';

allSongs.forEach(song => {
  addSongToDom(song);

  console.log("DOM Reset.")
  })
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
  console.log(songSrc)
// the song source has a stupid file path so we 
  songSrc = songSrc.toString();
  songSrc = songSrc.substring(11);
  
  console.log ("Song uploaded.")
  addNewSong( songSrc );
  
});


// PLAY BUTTON
function playSong(e) {
  var currentSong = e.target.parentNode.parentNode.querySelector('audio');
  const currentSongIndex = e.target.parentNode.getAttribute('data-index');
  // loop through all songs and set all song.isPlaying = false
  
  if (allSongs[currentSongIndex].isPlaying !== true){ 
  allSongs.forEach(song =>{
  song.isPlaying = false;
  })
  //set current song.isPlaying = whatever it's not 
  allSongs[currentSongIndex].isPlaying = !allSongs[currentSongIndex].isPlaying;
  } else {
  allSongs[currentSongIndex].isPlaying = !allSongs[currentSongIndex].isPlaying;  
  }
  console.log(`is song playing? ${allSongs[currentSongIndex].isPlaying}`)

// now playing
// image source should equal the song.cover of the song that has the key value isPlaying true

  const songCover = document.querySelector('#currentCover')
  allSongs.forEach( song =>{
    if (song.isPlaying){
      songCover.src = song.cover;
    }
  });

  const songArtist = document.querySelector('#artist')
  allSongs.forEach( song =>{
    if (song.isPlaying){
      songArtist.innerHTML = song.artist;
    }
  });

  const songTitle = document.querySelector('#title')
  allSongs.forEach( song =>{
    if (song.isPlaying){
      songTitle.innerHTML = song.title;
    }
  });
  resetAllSongsDom();
}
  

// liked song function
let likedSongs = [];
function likeSong(e) {
  //target the dom element of the selected objects id
  const songId = e.target.parentNode.parentNode.getAttribute('data-index');
  //set the selected objects liked value to whatevers its not
  allSongs[songId].liked = !allSongs[songId].liked;
  //filers all liked songs into an array called likedSongs
  likedSongs = allSongs.filter((song) => song.liked == true);

  console.log("Song added to likedSongs.")
  resetAllSongsDom();
}
  
//remove song function
function removeSong(e) {
  //get this songs id
  const songId = e.target.parentNode.parentNode.getAttribute('data-index');
  //remove the object with the same id
  var remove = confirm(`Are you sure you want to delete ${allSongs[songId].title}?`);
  if (remove) {
    allSongs.splice(songId)
  }
  //
  //allSongs.splice(songId)
  //refresh dom
  console.log("Song removed.")
  resetAllSongsDom();
}

// menu

const allSongsBtn = document.querySelector('#allSongsBtn');
const likedSongsBtn = document.querySelector('#likedSongsBtn');

likedSongsBtn.addEventListener('click', function() {
  document.querySelector('.songList').innerHTML = '';

//create HTML elements in the songList div from all song objects in allSongs array that have the key liked value = true

//if song objects key liked value is true, run addNewSong function+
  allSongs.forEach(song => {
    if (song.liked) {
      addSongToDom(song);
    }
  })

});

//clear all songList Div elements, then create DOM elements for all allSongs objects in the songList div

allSongsBtn.addEventListener ('click', function(){
  document.querySelector('.songList').innerHTML = '';
  allSongs.forEach(song => {

 addSongToDom(song);
  })
});

