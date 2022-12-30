// var sound = new sound("./../media/you ")   
// import data from "../media/data.json" assert { type: 'JSON'}

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


