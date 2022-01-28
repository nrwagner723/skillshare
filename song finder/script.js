let term = ''
const songContainer = document.getElementById('songs')

var input = document.getElementById('searchInput');
input.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('btn').click();
    }
});

const updateTerm = () => {
    term = document.getElementById('searchInput').value;

    if(!term || term === '') {
        alert('please enter a search term')
    } else {

        while(songContainer.firstChild) {
            songContainer.removeChild(songContainer.firstChild);
        }

        const url = `https://itunes.apple.com/search?media=music&term=${term}`
        fetch(url)
        .then( (response) => response.json() )
        .then( (data) => {
            // console.log(data.results);
            const artists = data.results;
            return artists.map(result => {

        const article = document.createElement('article'),
              artist = document.createElement('p'),
              song = document.createElement('p'),
              img = document.createElement('img'),
              audio = document.createElement('audio'),
              audioSource = document.createElement('source')

              artist.innerHTML = result.artistName
              song.innerHTML = result.trackName
              img.src = result.artworkUrl100
              audioSource.src = result.previewUrl
              audio.setAttribute('controls', '')

              article.appendChild(img)
              article.appendChild(artist)
              article.appendChild(song)
              article.appendChild(audio)
              audio.appendChild(audioSource)
              songContainer.appendChild(article)
    })
})
        .catch(error => console.log('Request failed:', error))
    }
}

const searchBtn = document.querySelector('button')
searchBtn.addEventListener('click', updateTerm)

document.addEventListener('play', event => {
    const audio = document.getElementsByTagName('audio');
    for(let i =0; i < audio.length; i++) {
        if(audio[i] != event.target) {
            audio[i].pause();
        }
    }
}, true)