'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player() {
    _classCallCheck(this, Player);

    this.ex = 'player test';
  }

  _createClass(Player, [{
    key: 'test',
    value: function test() {
      console.log(this.ex);
    }
  }]);

  return Player;
}();

document.addEventListener('DOMContentLoaded', function () {
  var player = new Player();
  player.test();
});
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
  //finna takkanna líka inní fallinu, breyta html þá pínu
  var playButton = container.querySelectorAll('.player .player__button')[1].querySelector('.play');
  var soundButton = container.querySelectorAll('.player .player__button')[2].querySelector('.sound');

  //Setja titil efst á síðu
  var heading = container.querySelector('.heading');
  heading.appendChild(document.createTextNode(videoinfo.title));

  //setja myndband inn
  var video = document.createElement('video');
  //Ath sleppa þessum og nota css til að ákvaðra stærð
  video.setAttribute('width', '500');
  video.setAttribute('height', '500');
  var source = document.createElement('source');
  source.setAttribute('src', videoinfo.video);
  video.appendChild(source);
  container.querySelector('.video').appendChild(video);

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
  var header = document.createElement('h2');

  section.appendChild(header);
  section.appendChild(list);
  header.appendChild(document.createTextNode(title.replace(/_+/g, ' ')));
  Object.values(cat).forEach(function (x) {
    return list.appendChild(movie(x));
  });

  section.classList.add('videos__' + title);
  main.appendChild(section);
}

function movie(movie) {
  var container = document.createElement('li');
  container.classList.add('movie');

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