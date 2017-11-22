
class Player {
  constructor (data) {
    this.data = data;
    //TODO nota search parameter til að finna ID
    this.videoinfo = this.videofind((window.location.search).charAt(4));
    this.container = document.querySelector('.container');
    this.videoContainer = (this.container).querySelector('.videoContainer');
    //finna takkanna líka inní fallinu, breyta html þá pínu
    this.playButton = (this.container.querySelectorAll('.player .player__button')[1]).querySelector('.play');
    this.soundButton = (this.container.querySelectorAll('.player .player__button')[2]).querySelector('.sound');
    //Er verið að play-a í fyrsta skipti
    this.played = true;
  }

  init() {
    //Setja titil efst á síðu
    this.heading = this.container.querySelector('.heading');
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

    //Sækja takka
    this.prev = this.container.querySelector('.player .prev');
    this.play = this.container.querySelector('.player .play');
    this.sound = this.container.querySelector('.player .sound');
    this.fullscreen = this.container.querySelector('.player .fullscreen');
    this.next = this.container.querySelector('.player .next');

    //Setja atburðarhandler á takkana
    this.prev.addEventListener('click', this.setBack.bind(this));
    this.play.addEventListener('click', this.playPause.bind(this));
    this.sound.addEventListener('click', this.soundMute.bind(this));
    this.fullscreen.addEventListener('click', this.fullscr.bind(this));
    this.next.addEventListener('click', this.setFor.bind(this));

    //atburðarhandler á skjá
    this.overlay.addEventListener('click', this.playPause.bind(this));
    this.video.addEventListener('click', this.playPause.bind(this));
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
      this.overlay.setAttribute('class', 'overlay ');
      this.playImg.setAttribute('class', 'playImg');
      this.playButton.setAttribute('src', 'img/play.svg');
      this.video.pause();
    }
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
      this.soundButton.setAttribute('src', 'img/mute.svg');
      this.video.muted = false;
    } else {
      this.soundButton.setAttribute('src', 'img/unmute.svg');
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
    //TODO nota flottari lykkju?
    for(var i = 0; i<(this.data).length; i++){
      if(this.data[i].id == id) {
        return this.data[i];
      }
    }
  }
}

//TODO ath hvort skili villu
//TODO ekki framkvæma á index síðu
//Hlaða gögnum
function load() {
  const json = new XMLHttpRequest();
  json.open('GET', '/js/videos.json', true);

  json.onload = function() {
      const jsondata = JSON.parse(json.response);
      const player = new Player(jsondata.videos);
      player.init();
  };
  json.send();
}

document.addEventListener('DOMContentLoaded', function () {
  load();
});
