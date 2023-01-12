var data = [
    "you can't control my heart (ft shiloh).mp3",
    "children-nick-cave.mpga","ciclo-sem-fim.mpga",
    "vou-vencer.mpga",
    "superman-theme.mpga"
];

// console.log(data)

document.addEventListener("keydown", (e) => {
    const keyName = e.key
    const keyboard = {
        " ": () => {
            e.preventDefault();
            playPause();
        },
        ArrowUp: () => {
            e.preventDefault()
            volume('+')
        },
        ArrowDown: () => {
            e.preventDefault();
            volume('-');
        }
    }
    // console.log(Object.keys(keyboard))
    if(Object.keys(keyboard).indexOf(keyName) >= 0){
        keyboard[keyName]()
    }
});
document.getElementById("searchInput").addEventListener("input", (e) => {
    searchChange(e.target.value);
})

const volume = function(operation) {
    var player = document.getElementById("player")
    if( operation == '+'){
        player.volume += 0.1
    }else if(operation == '-'){
        player.volume -= 0.1
    }
}
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
                // console.log(" não ta tocando")
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
const clickItem = function (e) {
    let id = e.target.querySelector(".id")
    // if(id == null || id == undefined){
    //     id = e.target.innerText
    //     console.log("QS null but id is " + id)
    // }
    if(id == null){
        id = e.target.parentElement.querySelector(".id")
        
    }
    localStorage.setItem("current-track",id.innerText);
    setSource()
}
const volumeChange = function(e){
    console.log(e.target.volume)
}

const fetchPlaylist = function () {
    // playlist element
    var playlist = document.getElementById("playlist")
    var child = playlist.querySelector(".playlist-item");
    playlist.removeChild(child)
    
    // player element
    var player = document.getElementById("player")
    player.addEventListener("volumechange", volumeChange)


    data.forEach( item => {
        // playlist display
        let song = document.createElement("div");
        song.classList.add("row", "playlist-item");
        song.innerText = item.split(".")[0]

        // description
        let description = document.createElement("div");
        description.classList.add("description");
        description.innerText = "This is an audio file"
        // description.addEventListener("click",(e) => {
        //     console.log("click")
        // })
        //id
        let id = document.createElement("p");
        id.innerText = data.indexOf(item)
        id.classList.add("no-display","id")
        song.appendChild(id)
        song.appendChild(description)
        song.addEventListener("click",clickItem)
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

const searchChange = function (value) {
    var list = document.getElementsByClassName("playlist-item");
    for (let i=0; i< (list.length * 2); i++) {
        // console.log(list[i].innerText)
        if(list[i].innerText.includes(value) == false && value != "" && value != " " && value != undefined){
            list[i].style = "display: none;"
        }else{
            list[i].style = "display: block;"
        }       
    }
    // (value)
}