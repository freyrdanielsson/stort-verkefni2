/*
class Player {
  constructor(data) {

    this.data = data;
    this.container = document.querySelector('.container');
    this.heading = (this.container).querySelector('.heading');
    this.videocontainer = (this.container).querySelector('.video');
    //finna takka
    this.prev = (this.container).querySelector('.player .prev');
    this.play = (this.container).querySelector('.player .play');
    this.sound = (this.container).querySelector('.player .sound');
    this.fullscreen = (this.container).querySelector('.player .fullscreen');
    this.next = (this.container).querySelector('.player .next');

  }

  playfun() {
    this.video = this.process(this.data);
    this.create();
  }

//hugmynd
  create() {

    //setja <h1> sem titil myndbands
    (this.heading).appendChild(document.createTextNode((this.video).title));

    this.videoElement = document.createElement('video');
    (this.videoElement).setAttribute('width',  '320');
    (this.videoElement).setAttribute('height',  '240');
    const source = document.createElement('source');
    source.setAttribute('src',  (this.video).video);
    (this.videoElement).appendChild(source);
    (this.videocontainer).appendChild((this.videoElement));

    //video playast automatically i byrjun, breyta?
    (this.videoElement).play();

    //Event listener fyrir takka, þarf að búa til þessi föll

    (this.prev).addEventListener('click', this.setTime(-3) ,false);
    //(this.play).addEventListener('click', this.playfun.bind(this));
    //(this.sound).addEventListener('click', this.soundfun.bind(this));
    //(this.fullscreen).addEventListener('click', this.fullscreenfun.bind(this));
    (this.next).addEventListener('click', function(){setTime(3);} ,false);


  }

  setTime(time) {
    try {
      (this.videoElement).currentTime += time;
    } catch (error) {
      errorMessage('No video loaded');
    }
  }

  process(data){
    const videos = data.videos;
    const id = (window.location.search).charAt(4);

    return this.videofind(videos, id);
  }

  videofind(videos, id) {
    //nota sniðugu loopuna, ekki þessa
    for(var i = 0; i<videos.length; i++){
      if(videos[i].id == id) {
        return videos[i];
      }
    }
  }
}
*/

function load() {
  const json = new XMLHttpRequest();
  json.open('GET', '/js/videos.json', true);

  json.onload = function() {
    const jsondata = JSON.parse(json.response);
    init(jsondata.videos);
  };
  json.send();
}

function init(data) {

  const videoinfo = videofind(data,  (window.location.search).charAt(4));
  const container =  document.querySelector('.container');
  //finna takkanna líka inní fallinu, breyta html þá pínu
  const playButton = (container.querySelectorAll('.player .player__button')[1]).querySelector('.play');
  const soundButton = (container.querySelectorAll('.player .player__button')[2]).querySelector('.sound');

  //Setja titil efst á síðu
  const heading = container.querySelector('.heading');
  heading.appendChild(document.createTextNode(videoinfo.title));

  //setja myndband inn
  const video = document.createElement('video');
  //Ath sleppa þessum og nota css til að ákvaðra stærð
  video.setAttribute('width',  '500');
  video.setAttribute('height',  '500');
  const source = document.createElement('source');
  source.setAttribute('src',  videoinfo.video);
  video.appendChild(source);
  (container.querySelector('.video')).appendChild(video);


  //Sækja takka
  const prev = container.querySelector('.player .prev');
  const play = container.querySelector('.player .play');
  const sound = container.querySelector('.player .sound');
  const fullscreen = container.querySelector('.player .fullscreen');
  const next = container.querySelector('.player .next');

  //atburðahandler á takka
  prev.addEventListener('click', function () { setTime(-3); });
  play.addEventListener('click', playPause);
  sound.addEventListener('click', soundMute);
  fullscreen.addEventListener('click', fullscr);
  next.addEventListener('click', function () { setTime (3); });


  function fullscr() {
    video.webkitRequestFullscreen();
  }

  function soundMute() {
    if(video.muted){
      soundButton.setAttribute('src', 'img/mute.svg');
      video.muted = false;
    } else {
      soundButton.setAttribute('src', 'img/unmute.svg');
      video.muted = true;

    }
  }

  function playPause() {
    if (video.paused) {
      playButton.setAttribute('src', 'img/pause.svg');
      video.play();
    } else {
      playButton.setAttribute('src', 'img/play.svg');
      video.pause();
    }
  }

  function setTime(time) {
      try {
        video.currentTime += time;
      } catch (error) {
        errorMessage('No video loaded');
      }
    }


  function videofind(videos, id) {
    //nota sniðugu loopuna, ekki þessa
    for(var i = 0; i<videos.length; i++){
      if(videos[i].id == id) {
        return videos[i];
      }
    }
  }

}

document.addEventListener('DOMContentLoaded', function () {
  load();
});
