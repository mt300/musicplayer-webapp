var data = ["you can't control my heart (ft. shiloh).mp3","children-nick-cave.mpga","ciclo-sem-fim.mpga","vou-vencer.mpga","superman-theme.mpga","marcos"];

// console.log(data)



const fetchPlaylist = function () {
    var playlist = document.getElementById("playlist")
    var child = playlist.querySelector(".playlist-item");
    playlist.removeChild(child)
    
    data.forEach( item => {
        let song = document.createElement("div");
        song.classList.add("row", "playlist-item");
        song.innerText = item
        playlist.appendChild(song)    
    })
}