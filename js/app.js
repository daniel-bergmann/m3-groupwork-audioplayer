// Defining all the variables
let now_playing = document.querySelector(".now-playing"); 
let track_art = document.querySelector(".track-art"); 
let track_name = document.querySelector(".track-name"); 
let track_artist = document.querySelector(".track-artist"); 
  
let playpause_btn = document.querySelector(".playpause-track"); 
let next_btn = document.querySelector(".next-track"); 
let prev_btn = document.querySelector(".prev-track"); 
  
let seek_slider = document.querySelector(".seek_slider");  
let curr_time = document.querySelector(".current-time"); 
let total_duration = document.querySelector(".total-duration");

// Specify globally used values 
let track_index = 0; 
let isPlaying = false; 
let updateTimer; 

// Create the audio element for the player 
let curr_track = document.createElement('audio'); 

// list of tracks that have to be played 
// All the tracks that have to be played are defined in the tracklist as objects. These objects contain properties like the name, artist, image and path to the track. Each of the tracks can then be accessed using its track index.
let track_list = [ 
    { 
      name: "Floating ft. 21 Savage", 
      artist: "ScHoolboy Q", 
      image: "../img/schoolboy_q.svg", 
      path: "../audio/scoolboyq-Floating-ft-21-Savage.mp3"
    }, 
    { 
      name: "Beach Aldente", 
      artist: "KieLoKaz", 
      image: "../img/img2.svg", 
      path: "../audio/KieLoKaz_Beach_Aldente_KieLoKaz_ID_109.mp3"
    }, 
    { 
      name: "Pas Normal", 
      artist: "Silvia Toms Trio", 
      image: "../img/img3.svg", 
      path: "../audio/Slvia_Toms_Trio_-_02_-_Pas_normal.mp3", 
    }, 
  ]; 







// Loading a new track from the tracklist



  function loadTrack(track_index) { 
    // Clear the previous seek timer 
    clearInterval(updateTimer); 
    // A resetValues() is created which handles the resetting of the duration value and the slider to their initial values before a new track starts. This prevents the jumping of the seek slider while the new track loads.
    resetValues(); 
    
    // Load a new track 
    curr_track.src = track_list[track_index].path; 
    // The audio element is assigned a new source using its src property. It may be given any path from the filesystem or a URL. The load() method is then used on the audio element to get the track ready.
    curr_track.load(); 
    
    // Update details of the track 
    // The track art is fetched from the array and assigned with the help of the backgroundImage property.
    track_art.style.backgroundImage =  
       "url(" + track_list[track_index].image + ")"; 
    track_name.textContent = track_list[track_index].name; 
    track_artist.textContent = track_list[track_index].artist; 
    // The track details are fetched from the array and assigned with the help of the textContent property.
    
    
    // Set an interval of 1000 milliseconds 
    // for updating the seek slider 
    updateTimer = setInterval(seekUpdate, 1000); 
    
    // Move to the next track if the current finishes playing 
    // using the 'ended' event 
    // The media element has two event listeners added to it, the first one to update the current seek position and the second one to load the next track when the current track finishes.
    curr_track.addEventListener("ended", nextTrack);  
  } 
    
  // Functiom to reset all values to their default 
  function resetValues() { 
    curr_time.textContent = "00:00"; 
    total_duration.textContent = "00:00"; 
    seek_slider.value = 0; 
  } 









// Configuring the player buttons

// The playpause() function handles the actual play/pause control of the track.

  function playpauseTrack() { 
    // Switch between playing and pausing 
    // depending on the current state 
    if (!isPlaying) playTrack(); 
    else pauseTrack(); 
  } 
    
  function playTrack() { 
    // Play the loaded track 
    // playTrack() handles the playing of the currently loaded track. The play() method of the HTMLMediaElement API is used for this function. The icon of the button also changes to the pause icon.
    curr_track.play(); 
    isPlaying = true; 
    
    // Replace icon with the pause icon 
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'; 
  } 
    
  function pauseTrack() { 
    // Pause the loaded track 
    // It handles the playing of the currently loaded track. The pause() method of the HTMLMediaElement API is used for this function. The icon of the button also changes back to the play icon.
    curr_track.pause(); 
    isPlaying = false; 
    
    // Replace icon with the play icon 
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';; 
  } 
    
  function nextTrack() { 
    // Go back to the first track if the 
    // current one is the last in the track list 
    if (track_index < track_list.length - 1) 
      track_index += 1; 
    else track_index = 0; 
    
    // Load and play the new track 
    loadTrack(track_index); 
    playTrack(); 
  } 
    // A function prevTrack() handles the loading of the previous track and moving the index backward.The loadTrack() method defined below is used for loading the new track.
  function prevTrack() { 
    // Go back to the last track if the 
    // current one is the first in the track list 
    if (track_index > 0) 
      track_index -= 1; 
    else track_index = track_list.length; 
      
    // Load and play the new track 
    loadTrack(track_index); 
    playTrack(); 
  } 






//   Configuring the sliders portion
// The seekTo() function has to be called every time the track progresses further. This can be done by scheduling it to be updated every second. This can be done using the setInterval() method with an interval of 1000 milliseconds. This timer is cleared every time a new track is loaded.

function seekTo() { 
    // Calculate the seek position by the 
    // percentage of the seek slider 
    // and get the relative duration to the track 
    seekto = curr_track.duration * (seek_slider.value / 100); 
    
    // Set the current track position to the calculated seek position 
    curr_track.currentTime = seekto; 
    } 
    
    function setVolume() { 
    // Set the volume according to the 
    // percentage of the volume slider set 
    curr_track.volume = volume_slider.value / 100; 
    } 
    
    function seekUpdate() { 
    let seekPosition = 0; 
    
    // Check if the current track duration is a legible number 
    if (!isNaN(curr_track.duration)) { 
        seekPosition = curr_track.currentTime * (100 / curr_track.duration); 
        seek_slider.value = seekPosition; 
    
        // Calculate the time left and the total duration 
        let currentMinutes = Math.floor(curr_track.currentTime / 60); 
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60); 
        let durationMinutes = Math.floor(curr_track.duration / 60); 
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60); 
    
        // Add a zero to the single digit time values 
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; } 
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; } 
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; } 
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; } 
    
        // Display the updated duration 
        curr_time.textContent = currentMinutes + ":" + currentSeconds; 
        total_duration.textContent = durationMinutes + ":" + durationSeconds; 
    } 
} 
    

  // Load the first track in the tracklist 
//   The first track is loaded by calling the loadTrack() function. This will load the first track from the tracklist and update all the details of the track. The user can then start playing the track using the play button. The next track is automatically loaded when a track finishes playing. The user can seek to a position in the track using the seek slider.
loadTrack(track_index); 