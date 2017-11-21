'use strict';

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
  var json = new XMLHttpRequest();
  json.open('GET', '/js/videos.json', true);

  json.onload = function () {
    var jsondata = JSON.parse(json.response);
    init(jsondata.videos);
  };
  json.send();
}

function init(data) {

  var videoinfo = videofind(data, window.location.search.charAt(4));
  var container = document.querySelector('.container');
  var videoContainer = container.querySelector('.video');
  videoContainer.classList.add('row');

  //finna takkanna líka inní fallinu, breyta html þá pínu
  var playButton = container.querySelectorAll('.player .player__button')[1].querySelector('.play');
  var soundButton = container.querySelectorAll('.player .player__button')[2].querySelector('.sound');
  //Er verið að play-a í fyrsta skipti
  var played = true;

  //Setja titil efst á síðu
  var heading = container.querySelector('.heading');
  heading.appendChild(document.createTextNode(videoinfo.title));

  //Búa til myndbandshlut sem við setjum inn þegar ýtt er á play í fyrsta skipti
  var video = document.createElement('video');

  //TODO
  video.setAttribute('class', 'hide');
  videoContainer.appendChild(video);

  var source = document.createElement('source');
  source.setAttribute('src', videoinfo.video);
  video.appendChild(source);

  //setjum poster inn í byrjun
  var poster = document.createElement('img');
  poster.setAttribute('src', videoinfo.poster);
  poster.setAttribute('class', 'vid col col-12');
  videoContainer.appendChild(poster);

  //setjum play takka á poster
  var playImg = document.createElement('img');
  playImg.setAttribute('src', 'img/play.svg');
  playImg.setAttribute('class', 'playImg');
  videoContainer.appendChild(playImg);

  //prufa
  var overlay = document.createElement('div');
  overlay.setAttribute('class', 'overlay col col-12');
  videoContainer.appendChild(overlay);

  //Sækja takka
  var prev = container.querySelector('.player .prev');
  var play = container.querySelector('.player .play');
  var sound = container.querySelector('.player .sound');
  var fullscreen = container.querySelector('.player .fullscreen');
  var next = container.querySelector('.player .next');

  //atburðahandler á takka
  prev.addEventListener('click', function () {
    setTime(-3);
  });
  play.addEventListener('click', playPause);
  sound.addEventListener('click', soundMute);
  fullscreen.addEventListener('click', fullscr);
  next.addEventListener('click', function () {
    setTime(3);
  });

  //atburðarhandler á skjá
  overlay.addEventListener('click', playPause);
  video.addEventListener('click', playPause);

  function fullscr() {
    video.webkitRequestFullscreen();
  }

  function soundMute() {
    if (video.muted) {
      soundButton.setAttribute('src', 'img/mute.svg');
      video.muted = false;
    } else {
      soundButton.setAttribute('src', 'img/unmute.svg');
      video.muted = true;
    }
  }

  //gaura aukafalla til að sleppa við línur gerðar tvisvar
  function playPause() {
    if (played) {
      playImg.setAttribute('class', 'hide');
      videoContainer.removeChild(poster);
      video.setAttribute('class', 'vid col col-12');
      playButton.setAttribute('src', 'img/pause.svg');
      overlay.setAttribute('class', 'hide');
      played = false;
      video.play();
    } else if (video.paused) {
      playImg.setAttribute('class', 'hide');
      playButton.setAttribute('src', 'img/pause.svg');
      overlay.setAttribute('class', 'hide');
      video.play();
    } else {
      overlay.setAttribute('class', 'overlay col col-12');
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
    for (var i = 0; i < videos.length; i++) {
      if (videos[i].id == id) {
        return videos[i];
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  load();
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Video = function () {
  function Video() {
    _classCallCheck(this, Video);

    //local .json file
    this.API_URL = '/js/videos.json';
  }

  _createClass(Video, [{
    key: 'load',
    value: function load() {
      var json = new XMLHttpRequest();
      json.open('GET', this.API_URL, true);

      json.onload = function () {
        this.data = JSON.parse(json.response);
        process(this.data);
      };
      json.send();
    }
  }]);

  return Video;
}();

function process(data) {
  var sec = document.querySelectorAll('.video');
  var videos = data.videos;
  var cat = data.categories;

  var sorted = sort(videos, cat);
  console.log(sorted);
  make(sorted.nyleg, 'Nýleg_myndbönd');
  make(sorted.kennslu, 'Kennslumyndbönd');
  make(sorted.gaman, 'Skemmtimyndbönd');
}

function make(cat, title) {
  var main = document.querySelector('main');

  var section = document.createElement('nav');
  var list = document.createElement('ul');
  list.classList.add('video');
  list.classList.add('row');

  var header = document.createElement('h2');
  header.setAttribute('class', 'header header--heading2');

  section.appendChild(header);
  section.appendChild(list);
  header.appendChild(document.createTextNode(title.replace(/_+/g, ' ')));
  Object.values(cat).forEach(function (x) {
    return list.appendChild(movie(x));
  });

  main.appendChild(section);
}

function movie(movie) {
  var container = document.createElement('li');
  container.classList.add('video__movie');
  makeGrid(container);

  var poster = document.createElement('a');
  poster.classList.add('video__poster');
  poster.setAttribute('href', 'player.html?id=' + movie.id);

  var img = document.createElement('img');
  img.setAttribute('src', movie.poster);

  var length = document.createElement('div');
  length.classList.add('video__length');
  length.appendChild(document.createTextNode(timestamp(movie.duration)));

  var title = document.createElement('h2');
  title.classList.add('movie__title');
  title.appendChild(document.createTextNode(movie.title));

  var info = document.createElement('div');
  info.classList.add('video__info');

  // TODO: gera fall fyrir movie.created
  info.appendChild(title);
  info.appendChild(document.createTextNode(movie.created));

  poster.appendChild(img);
  poster.appendChild(length);

  container.appendChild(poster);
  container.appendChild(info);

  return container;
}

function makeGrid(cont) {
  console.log(cont);
  cont.classList.add('col');
  cont.classList.add('col-4');
  cont.classList.add('col-sm-6');
  cont.classList.add('col-mm-12');
}

function timestamp(length) {
  var min = Math.floor(length / 60);
  console.log(min);
  var sec = length - min * 60;

  if (sec < 10) {
    return min + ':0' + sec;
  } else {
    return min + ':' + sec;
  }
}

function sort(videos, cat) {

  // TODO: reyna koma þessu í forEach eða álíka
  var nyleg = videos.filter(function (categorie) {
    return cat[0].videos.includes(categorie.id);
  });

  var kennslu = videos.filter(function (categorie) {
    return cat[1].videos.includes(categorie.id);
  });

  var gaman = videos.filter(function (categorie) {
    return cat[2].videos.includes(categorie.id);
  });

  return { nyleg: nyleg, kennslu: kennslu, gaman: gaman };
}

document.addEventListener('DOMContentLoaded', function () {
  var video = new Video();
  video.load();
});

//# sourceMappingURL=script-compiled.js.map