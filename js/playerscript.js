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
  const videoContainer = container.querySelector('.videoContainer');
  //videoContainer.setAttribute('class', 'video');
  //col col-12

  //finna takkanna líka inní fallinu, breyta html þá pínu
  const playButton = (container.querySelectorAll('.player .player__button')[1]).querySelector('.play');
  const soundButton = (container.querySelectorAll('.player .player__button')[2]).querySelector('.sound');
  //Er verið að play-a í fyrsta skipti
  let played = true;

  //Setja titil efst á síðu
  const heading = container.querySelector('.heading');
  heading.appendChild(document.createTextNode(videoinfo.title));

  //Búa til myndbandshlut sem við setjum inn þegar ýtt er á play í fyrsta skipti
  const video = document.createElement('video');

  video.setAttribute('class', 'hide');
  video.setAttribute('src', videoinfo.video);
  videoContainer.appendChild(video);

  //setjum poster inn í byrjun
  const poster = document.createElement('img');
  poster.setAttribute('src', videoinfo.poster);
  poster.setAttribute('class', 'vid ');
  videoContainer.appendChild(poster);

  //setjum play takka á poster
  const playImg = document.createElement('img');
  playImg.setAttribute('src', 'img/play.svg');
  playImg.setAttribute('class', 'playImg');
  videoContainer.appendChild(playImg);


  //prufa
  const overlay = document.createElement('div');
  overlay.setAttribute('class', 'overlay ');
  videoContainer.appendChild(overlay);



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

  //atburðarhandler á skjá
  overlay.addEventListener('click', playPause);
  video.addEventListener('click', playPause);


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

//gaura aukafalla til að sleppa við línur gerðar tvisvar
  function playPause() {
    if(played) {
      playImg.setAttribute('class', 'hide');
      videoContainer.removeChild(poster);
      video.setAttribute('class', 'vid ');
      playButton.setAttribute('src', 'img/pause.svg');
      overlay.setAttribute('class', 'hide');
      played = false;
      video.play();

    }else if (video.paused) {
      playImg.setAttribute('class', 'hide');
      playButton.setAttribute('src', 'img/pause.svg');
      overlay.setAttribute('class', 'hide');
      video.play();
    } else {
      overlay.setAttribute('class', 'overlay ');
      playImg.setAttribute('class', 'playImg');
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
