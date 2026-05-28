// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Shape of You", filePath: "songs/1.mp3", coverPath: "cover1.jpg"},
    {songName: "Blinding Lights", filePath: "songs/2.mp3", coverPath: "cover2.jpg"},
    {songName: "Rolling in the Deep", filePath: "songs/3.mp3", coverPath: "cover3.jpg"},
    {songName: "Radioactive", filePath: "songs/4.mp3", coverPath: "cover4.jpg"},
    {songName: "Bad Guy", filePath: "songs/5.mp3", coverPath: "cover5.jpg"},
    {songName: "Uptown Funk", filePath: "songs/6.mp3", coverPath: "cover6.jpg"},
    {songName: "Counting Stars", filePath: "songs/7.mp3", coverPath: "cover7.jpg"},
    {songName: "Someone Like You", filePath: "songs/8.mp3", coverPath: "cover8.jpg"},
    {songName: "Viva La Vida", filePath: "songs/9.mp3", coverPath: "cover9.jpg"},
    {songName: "Salam-e-ishq", filePath: "songs/10.mp3", coverPath: "cover10.jpg"},
];

// Set cover images
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
});

// Handle play / pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
});

// Seekbar change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset all play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Song item play click
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id) - 1;  // index fix
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songIndex].filePath;   // fixed template string
        masterSongName.innerText = songs[songIndex].songName;  
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    });
});

// Next button
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;   // fixed
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;   // fixed
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
