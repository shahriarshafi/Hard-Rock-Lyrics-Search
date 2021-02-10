// Display Error
const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}



const searchSongs = () => {
   const searchText =  document.getElementById("search-field").value;
//    console.log(searchValue);
   const url = `https://api.lyrics.ovh/suggest/${searchText}`
//    console.log(url);
   fetch(url)
   .then(res => res.json())
   .then(data => displaySongs(data.data))
   .catch(error => displayError("Can't Find Data"))

}


const displaySongs = songs => {
    // console.log(songs);
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = "";
    // show me single songs
    songs.forEach(song => {
        // console.log(song.preview);
         const li = document.createElement('div');
         li.className =`single-result row align-items-center my-3 p-3`;
         li.innerHTML = `
         <div class="col-md-9">
             <h3 class="lyrics-name">${song.title}</h3>
             <p class="author lead">Album by <span>${song.artist.name}</span></p>
             <audio controls>
                <source src="${song.preview}" type="audio/ogg">
            </audio>
         </div>
         <div class="col-md-3 text-md-right text-center">
             <button onclick="getLyric('${song.artist.name}','${song.title}' )"  class="btn btn-success">Get Lyrics</button>
         </div>
         `;
         songContainer.appendChild(li);
    });

}

// Lyrics


const getLyric = async(artist,title)=>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        const res = await fetch(url);
    const data = await  res.json();
    displayLyrics(data.lyrics);
    }
    catch(error) {
        displayError("Sorry Something is missing!!!!")
    }
}


const displayLyrics = lyrics => {
    const lyricDiv = document.getElementById('song-lyrics');
    lyricDiv.innerText = lyrics;
}