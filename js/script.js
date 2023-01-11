// var sound = new sound("./../media/you ")   
// import data from "../media/data.json" assert { type: 'JSON'}


const progressBar = function(duration) {
    console.log("hello")
}
const playPause = function () {
    var button = document.getElementById("playPauseBtn");
    var player = document.getElementById("player");

    if(button.classList[1] == "_play"){
        button.classList.replace("_play","_pause")
        player.play()
    }else{
        button.classList.replace("_pause","_play")
        player.pause()        
    }
}

const nextTrack = function () {
    var currentTrack = localStorage.getItem("current-track")
    var frequencyLength = localStorage.getItem("frequency-length");
    var nextTrack = Number(currentTrack) + 1;
        
    if( nextTrack == frequencyLength){
        nextTrack = 0;
    }
    localStorage.setItem("current-track", nextTrack)
    setSource()
}

const previousTrack = function () {
    var currentTrack = localStorage.getItem("current-track")
    var frequencyLength = localStorage.getItem("frequency-length");
    var nextTrack = Number(currentTrack) - 1;
    if( nextTrack < 0){
        nextTrack = frequencyLength-1;
    }
    localStorage.setItem("current-track", nextTrack)
    setSource()
}

