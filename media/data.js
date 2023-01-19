var data = [
    "you can't control my heart (ft shiloh).mp3",
    "children-nick-cave.mpga","ciclo-sem-fim.mpga",
    "vou-vencer.mpga",
    "superman-theme.mpga",
    "you can't control my heart (ft shiloh).mp3",
    "children-nick-cave.mpga","ciclo-sem-fim.mpga",
    "vou-vencer.mpga",
    "superman-theme.mpga",
    "dsad3.mpga",
    "children-nick-cave.mpga","ciclo-sem-fim.mpga",
    "vou-vencer.mpga",
    "Tentando.mpga",
    "you can't control my heart (ft shiloh).mp3",
    "children-nick-cave.mpga","ciclo-sem-fim.mpga",
    "vou-vencer.mpga",
    "superman-theme.mpga",
    "you can't control my heart (ft shiloh).mp3",
    "lastpage.mpga",
    "ciclo-sem-fim.mpga",
    "vou-vencer.mpga",
    "you can't control my heart (ft shiloh).mp3",
    "children-nick-cave.mpga","ciclo-sem-fim.mpga",
    "vou-vencer.mpga",
    "superman-theme.mpga",
    "dsad3.mpga",
    "children-nick-cave.mpga","ciclo-sem-fim.mpga",
    "vou-vencer.mpga",
    "Tentando.mpga",
    "you can't control my heart (ft shiloh).mp3",
    "children-nick-cave.mpga","ciclo-sem-fim.mpga",
    "vou-vencer.mpga",
    "superman-theme.mpga",
    "you can't control my heart (ft shiloh).mp3",
    "lastpage.mpga",
    "ciclo-sem-fim.mpga",
    "vou-vencer.mpga"
];

var page = 1;
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
    }else if( operation == "x"){
        if(player.volume == 0){
            player.volume = 0.5
        }else {
            player.volume = 0
        }
    }
}
const setSource = function () {
    var currentTrack = localStorage.getItem("current-track");
    var player = document.getElementById("player")
    var source = document.getElementsByTagName("source")[0];

    playPause() 
    source.src = "./media/" + data[currentTrack];
    player.load()

    // set track tittle
    var title = document.getElementById("track-title");
    title.textContent = data[currentTrack].split('.')[0]
    // duration and highlight
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
    goHome()
}
const volumeChange = function(e){
    console.log(e.target.volume);
    fetchVolume();
}

const fetchVolume = function () {
    var player = document.getElementById("player");
    var volume = player.volume
    var bar = document.querySelector(".volumescope").style;
    bar.setProperty("--vol-percentage",volume * 100 + "%");
    var dot = document.getElementsByClassName("volumescope-dot")[0];
    dot.style.left = volume*100 + "%";
    var volumeIcon = document.querySelector("._volume");

    console.log(volumeIcon)
    // volumeIcon.setProperty("background-image","")
}
const goHome = function () {
    window.location.hash = "home"
}

const fetchPlaylist = function () {
    // playlist element
    var playlist = document.getElementById("playlist")
    var child = playlist.querySelector(".playlist-item");
    playlist.removeChild(child)
    var pagination = document.getElementById("pagination");
    playlist.removeChild(pagination)
    
    // player element
    var player = document.getElementById("player")
    player.addEventListener("volumechange", volumeChange)

    var itemCount = 0
    data.forEach( item => {
        // playlist display
        let song = document.createElement("div");
        song.classList.add("row", "playlist-item");
        song.innerText = item.split(".")[0]
        if(itemCount > 9){
            song.style.display = "none";
        }else {
            song.style.display = "block";
        }
        itemCount++;
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

    // pagination
    playlist.appendChild(pagination)
    var paginationItem = pagination.querySelector(".number-item");
    var listItems = document.getElementsByClassName("page-item")
    // pagination.removeChild(listItems[1])
    var lastChild = pagination.removeChild(listItems[2])
    
    for ( let i=1; i <= (data.length/10)+1; i++){
        if( i != 1){
            var newItem = document.createElement("li");
            newItem.innerHTML = paginationItem.innerHTML
            newItem.classList.add("page-item", "number-item")
            let link = newItem.querySelector('a');
            link.href="#home";
            link.innerText=i;
            link.addEventListener("click", (e) => {
                var list = document.getElementsByClassName("playlist-item");
                page = e.target.innerHTML;
                let max = Number(e.target.innerText)*10;
                let min = max-10;
                console.log(list.length)
                for ( let i=0; i < list.length; i++){
                    if( i < min || i >= max){
                        list[i].style.display = "none"
                        console.log("hide")
                    }else {
                        list[i].style.display = "block"
                        console.log("show")
                    }
                }
            })                    
            console.log(newItem)
            pagination.appendChild(newItem)
        }else {
            // href
            paginationItem.querySelector("a").addEventListener("click", (e) => {
                var list = document.getElementsByClassName("playlist-item");
                let max = Number(e.target.innerText)*10;
                let min = max-10;
                console.log(list.length)
                for ( let i=0; i < list.length; i++){
                    if( i < min || i >= max){
                        list[i].style.display = "none"
                        // console.log("hide")
                    }else {
                        list[i].style.display = "block"
                        // console.log("show")
                    }
                }
            })                   
        }
        // console.log("oi")
    }
    pagination.appendChild(lastChild)
    // console.log(data.length)
    

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
    if(value != "" && value != undefined){

        for (let i=0; i< (list.length * 2); i++) {
            // console.log(list[i].innerText)
            if(list[i].innerText.toLowerCase().includes(value.toLowerCase()) == false && value != " "){
                list[i].style = "display: none;"
            }else{
                list[i].style = "display: block;"
            }       
        }
    }else {
        for ( let i=0; i < list.length; i++){
            if( i < (page * 10) - 10 || i >= page * 10){
                list[i].style.display = "none"
                // console.log("hide")
            }else {
                list[i].style.display = "block"
                // console.log("show")
            }
        }
    }
    // (value)
}

const nextPage = function() {
    var list = document.getElementsByClassName("playlist-item")
    // let max = Number(e.target.innerText)*10;   
    // let min = max-10;            
    if(page * 10 < list.length){
        page++;
        console.log(list.length)
        for ( let i=0; i < list.length; i++){
            if( i < (page * 10) - 10 || i >= page * 10){
                list[i].style.display = "none"
                // console.log("hide")
            }else {
                list[i].style.display = "block"
                // console.log("show")
            }
        }

    }
}

const previousPage = function() {
    var list = document.getElementsByClassName("playlist-item")
    // let max = Number(e.target.innerText)*10;   
    // let min = max-10;            
    if(page  > 1){
        page--;
        console.log(list.length)
        for ( let i=0; i < list.length; i++){
            if( i < (page * 10) - 10 || i >= page * 10){
                list[i].style.display = "none"
                // console.log("hide")
            }else {
                list[i].style.display = "block"
                // console.log("show")
            }
        }

    }
}