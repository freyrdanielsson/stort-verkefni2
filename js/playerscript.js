class Player {

  constructor() {
    // local .json file
    this.API_URL = '/js/videos.json';
  }

  go() {
    load(this.API_URL, this);
  }

  init(data) {
    //Tæma síðu
    empty((document.querySelector('main')));
    this.data = data;
    //nota search parameter til að finna ID
    const sParameter = new URLSearchParams(window.location.search);
    this.videoinfo = this.videofind(sParameter.get('id'));

    //Búa til container á síðunni
    this.container = document.createElement('div');
    (this.container).setAttribute('class', 'container');
    (document.querySelector('main')).appendChild(this.container);

    //Búa til titil á síðuna
    this.heading = document.createElement('h1');
    (this.heading).setAttribute('class', 'heading');
    //Búa til videocontainer
    this.videoContainer = document.createElement('div');
    (this.videoContainer).setAttribute('class', 'videoContainer');
    //Búa til playerinn
    this.player = document.createElement('div');
    (this.player).setAttribute('class', 'player');
    //Búa til 'til baka' takka
    this.tilBaka = document.createElement('div');
    (this.tilBaka).setAttribute('class', 'backBut');
    this.tilBakahref = document.createElement('a');
    (this.tilBakahref).setAttribute('href', 'index.html');
    (this.tilBakahref).setAttribute('class', 'backBut__button');
    (this.tilBakahref).appendChild(document.createTextNode('Til baka'));
    (this.tilBaka).appendChild(this.tilBakahref);

    //Setja inní container
    (this.container).appendChild(this.heading);
    (this.container).appendChild(this.videoContainer);
    (this.container).appendChild(this.player);
    (this.container).appendChild(this.tilBaka);

    //Búa til takka og setja í player
    this.back = this.makeButton('back');
    this.playButton = this.makeButton('play');
    this.muteButton = this.makeButton('mute');
    this.fullscreen = this.makeButton('fullscreen');
    this.next = this.makeButton('next');

    //Er verið að play-a í fyrsta skipti
    this.played = true;

    //Setja titil í head title síðu
    document.title = (this.videoinfo).title;

    //Setja titil efst á síðu
    this.heading.appendChild(document.createTextNode((this.videoinfo).title));

    //Búum til myndbandshlut
    this.video = document.createElement('video');
    //Video er falið í byrjun því þá er poster sýnt
    this.video.setAttribute('class', 'hide');
    this.video.setAttribute('src', this.videoinfo.video);
    this.videoContainer.appendChild(this.video);

    //Búum til og setjum inn poster
    this.poster = document.createElement('img');
    this.poster.setAttribute('src', (this.videoinfo).poster);
    this.poster.setAttribute('class', 'vid');
    this.videoContainer.appendChild(this.poster);

    //Búum til og setjum inn play takka (ofan á poster/video)
    this.playImg = document.createElement('img');
    this.playImg.setAttribute('src', 'img/play.svg');
    this.playImg.setAttribute('class', 'playImg');
    this.videoContainer.appendChild(this.playImg);

    //Búum til og setjum ofan á overlay skugga
    this.overlay = document.createElement('div');
    this.overlay.setAttribute('class', 'overlay ');
    this.videoContainer.appendChild(this.overlay);

    //Setja atburðarhandler á takkana
    this.back.addEventListener('click', this.setBack.bind(this));
    this.playButton.addEventListener('click', this.playPause.bind(this));
    this.muteButton.addEventListener('click', this.soundMute.bind(this));
    this.fullscreen.addEventListener('click', this.fullscr.bind(this));
    this.next.addEventListener('click', this.setFor.bind(this));

    //atburðarhandler á skjá
    this.overlay.addEventListener('click', this.playPause.bind(this));
    this.video.addEventListener('click', this.playPause.bind(this));

    //Setja atburðahandler á myndband, sjá hvenar það klárast, skipta um myndband
    this.video.addEventListener('ended', this.show.bind(this));
  }

  makeButton(name) {
    //button element með klasa player__button
    const button = (document.createElement('button'));
    button.setAttribute('class', 'player__button');
    const imgElement = (document.createElement('img'));
    imgElement.setAttribute('class', name);
    imgElement.setAttribute('src', `img/${name}.svg`);
    button.appendChild(imgElement);
    (this.player).appendChild(button);
    return imgElement;
  }

  //gaura aukafalla til að sleppa við línur gerðar tvisvar
  playPause() {
    //Þetta er fyrsta sinn sem er ýtt á play, þá eyða posterinu,
    //sýna myndband og spila það
    if(this.played) {
      this.hide();
      this.videoContainer.removeChild(this.poster);
      this.video.setAttribute('class', 'vid ');
      this.played = false;
    } else if (this.video.paused) {
      this.hide();
    } else {
      this.show();
      this.video.pause();
    }
  }

  show() {
    this.overlay.setAttribute('class', 'overlay ');
    this.playImg.setAttribute('class', 'playImg');
    this.playButton.setAttribute('src', 'img/play.svg');
  }

  //fela overlay og play taka þegar myndband er play-a (play-a og toggla takka)
  hide() {
    this.playImg.setAttribute('class', 'hide');
    this.overlay.setAttribute('class', 'hide');
    this.playButton.setAttribute('src', 'img/pause.svg');
    this.video.play();
  }

  //afmute-a/mute-a myndband og toggla takka í samræmi
  soundMute() {
    if(this.video.muted){
      this.muteButton.setAttribute('src', 'img/mute.svg');
      this.video.muted = false;
    } else {
      this.muteButton.setAttribute('src', 'img/unmute.svg');
      this.video.muted = true;
    }
  }

  //Setja í fullscreen
  fullscr() {
      this.video.webkitRequestFullscreen();
  }

  //Spóla 3 sek afturábak
  setBack() {
      this.video.currentTime -= 3;
  }
  //Spóla 3 sek áfram
  setFor() {
      this.video.currentTime += 3;
  }

  //notar ID úr querystring til að finna hvaða video var smellt á
  videofind(id) {
    for(var i = 0; i<(this.data).length; i++){
      if(this.data[i].id == id) {
        return this.data[i];
      }
    }
    //Ef myndband finnst ekki þá errorMessage
    errorMessage();
  }
}
//Fall til að hreinsa hlut
function empty(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

// framleiðir villuskilaboð ef axaj klikkar eða önnur villa í ajax kalli.
function errorMessage() {
  const main = document.querySelector('main');
  const error = document.createElement('div');
  empty(main);
  error.setAttribute('class', 'error');
  error.appendChild(document.createTextNode('Gat ekki hlaðið gögnum'));
  main.appendChild(error);
}
//Hlaða gögnum
function load(url, player) {
  const json = new XMLHttpRequest();
  json.open('GET', '/js/videos.json', true);
  json.onload = () => {
    if(json.status < 400 && json.status >= 200){
      const jsondata = JSON.parse(json.response);
      player.init(jsondata.videos);
    } else {
      errorMessage();
    }
  };
  json.send();
}

document.addEventListener('DOMContentLoaded', function () {
  if(document.location.pathname.indexOf('player') >-1) {
    const player = new Player();
    player.go();
  }
});
