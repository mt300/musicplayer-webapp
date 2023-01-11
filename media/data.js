var data = ["you can't control my heart (ft shiloh).mp3","children-nick-cave.mpga","ciclo-sem-fim.mpga","vou-vencer.mpga","superman-theme.mpga"];

// console.log(data)

const setSource = function () {
    var currentTrack = localStorage.getItem("current-track");
    var player = document.getElementById("player")
    var source = document.getElementsByTagName("source")[0];

    playPause() 
    source.src = "./media/" + data[currentTrack];
    player.load()
    var duration
    player.ondurationchange =  (e) => {
        
        document.getElementById("end-time").innerText = Math.round(e.target.duration/60) + ":" + (Math.round(e.target.duration%60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) 
        duration = e.target.duration

        var items = (document.getElementsByClassName("playlist-item"));
        // console.log(items)
        let count = 0;
        for (let item of items){
            if (count == currentTrack){
                item.classList.add("highlight")
            }else {
                item.classList.remove("highlight")
                console.log(" não ta tocando")
            }
            count++;
        }
    }
    player.ontimeupdate = (e) => {
        document.getElementById("current-time").innerText = Math.round(e.currentTarget.currentTime/60) + ":" + (Math.round(e.currentTarget.currentTime%60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        var dot = document.getElementsByClassName("timescope-dot")[0];
        dot.style.left = (e.currentTarget.currentTime/duration)*100+"%"
        var bar = document.querySelector(".timescope").style;
        bar.setProperty('--percentage',(e.currentTarget.currentTime/duration)*100+"%")
        // console.log(e.currentTarget.currentTime/duration)
    }
    
    playPause()
}

const fetchPlaylist = function () {
    // playlist element
    var playlist = document.getElementById("playlist")
    var child = playlist.querySelector(".playlist-item");
    playlist.removeChild(child)
    
    // player element
    var player = document.getElementById("player")

    data.forEach( item => {
        // playlist display
        let song = document.createElement("div");
        song.classList.add("row", "playlist-item");
        song.innerText = item.split(".")[0]

        // description
        let description = document.createElement("div");
        description.classList.add("description");
        description.innerText = "This is an audio file"
        song.appendChild(description)
        playlist.appendChild(song)
        
    });
    // source playlist
    let source = document.createElement("source");
    source.src = "./media/" + data[0];
    source.type = "audio/mpeg"
    player.appendChild(source);

    // local storege system to store track
    var currentTrack = localStorage.getItem("current-track");
    if (currentTrack == undefined || isNaN(currentTrack)){
        currentTrack = 0;
        localStorage.setItem("current-track",currentTrack)
        localStorage.setItem("frequency-length", data.length)
    }else{
        setSource()
        // playPause()
    }   
    
}
