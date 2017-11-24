'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//  Fall til að hreinsa hlut
function empty(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

//  framleiðir villuskilaboð ef axaj klikkar eða önnur villa í ajax kalli.
function errorMessage() {
  var main = document.querySelector('main');
  var error = document.createElement('div');
  empty(main);
  error.setAttribute('class', 'error');
  error.appendChild(document.createTextNode('Gat ekki hlaðið gögnum'));
  main.appendChild(error);
}
//  Hlaða gögnum
function load(url, player) {
  var json = new XMLHttpRequest();
  json.open('GET', '/js/videos.json', true);
  json.onload = function () {
    if (json.status < 400 && json.status >= 200) {
      var jsondata = JSON.parse(json.response);
      player.init(jsondata.videos);
    } else {
      errorMessage();
    }
  };
  json.send();
}

var Player = function () {
  function Player() {
    _classCallCheck(this, Player);

    //  local .json file
    this.API_URL = '/js/videos.json';
  }

  _createClass(Player, [{
    key: 'go',
    value: function go() {
      load(this.API_URL, this);
    }
  }, {
    key: 'init',
    value: function init(data) {
      //  Tæma síðu
      empty(document.querySelector('main'));
      this.data = data;
      //  nota search parameter til að finna ID
      var sParameter = new URLSearchParams(window.location.search);
      this.videoinfo = this.videofind(sParameter.get('id'));

      //  Búa til container á síðunni
      this.container = document.createElement('div');
      this.container.setAttribute('class', 'container');
      document.querySelector('main').appendChild(this.container);

      // Búa til titil á síðuna
      this.heading = document.createElement('h1');
      this.heading.setAttribute('class', 'heading');
      // Búa til videocontainer
      this.videoContainer = document.createElement('div');
      this.videoContainer.setAttribute('class', 'videoContainer');
      // Búa til playerinn
      this.player = document.createElement('div');
      this.player.setAttribute('class', 'player');
      // Búa til 'til baka' takka
      this.tilBaka = document.createElement('div');
      this.tilBaka.setAttribute('class', 'backBut');
      this.tilBakahref = document.createElement('a');
      this.tilBakahref.setAttribute('href', 'index.html');
      this.tilBakahref.setAttribute('class', 'backBut__button');
      this.tilBakahref.appendChild(document.createTextNode('Til baka'));
      this.tilBaka.appendChild(this.tilBakahref);

      // Setja inní container
      this.container.appendChild(this.heading);
      this.container.appendChild(this.videoContainer);
      this.container.appendChild(this.player);
      this.container.appendChild(this.tilBaka);

      // Búa til takka og setja í player
      this.back = this.makeButton('back');
      this.playButton = this.makeButton('play');
      this.muteButton = this.makeButton('mute');
      this.fullscreen = this.makeButton('fullscreen');
      this.next = this.makeButton('next');

      // Er verið að play-a í fyrsta skipti
      this.played = true;

      // Setja titil í head title síðu
      document.title = this.videoinfo.title;

      // Setja titil efst á síðu
      this.heading.appendChild(document.createTextNode(this.videoinfo.title));

      // Búum til myndbandshlut
      this.video = document.createElement('video');
      // Video er falið í byrjun því þá er poster sýnt
      this.video.setAttribute('class', 'hide');
      this.video.setAttribute('src', this.videoinfo.video);
      this.videoContainer.appendChild(this.video);

      // Búum til og setjum inn poster
      this.poster = document.createElement('img');
      this.poster.setAttribute('src', this.videoinfo.poster);
      this.poster.setAttribute('class', 'vid');
      this.videoContainer.appendChild(this.poster);

      // Búum til og setjum inn play takka (ofan á poster/video)
      this.playImg = document.createElement('img');
      this.playImg.setAttribute('src', 'img/play.svg');
      this.playImg.setAttribute('class', 'playImg');
      this.videoContainer.appendChild(this.playImg);

      // Búum til og setjum ofan á overlay skugga
      this.overlay = document.createElement('div');
      this.overlay.setAttribute('class', 'overlay ');
      this.videoContainer.appendChild(this.overlay);

      // Setja atburðarhandler á takkana
      this.back.addEventListener('click', this.setBack.bind(this));
      this.playButton.addEventListener('click', this.playPause.bind(this));
      this.muteButton.addEventListener('click', this.soundMute.bind(this));
      this.fullscreen.addEventListener('click', this.fullscr.bind(this));
      this.next.addEventListener('click', this.setFor.bind(this));

      // atburðarhandler á skjá
      this.overlay.addEventListener('click', this.playPause.bind(this));
      this.video.addEventListener('click', this.playPause.bind(this));

      // Setja atburðahandler á myndband, sjá hvenar það klárast, skipta um myndband
      this.video.addEventListener('ended', this.show.bind(this));
    }
  }, {
    key: 'makeButton',
    value: function makeButton(name) {
      // button element með klasa player__button
      var button = document.createElement('button');
      button.setAttribute('class', 'player__button');
      var imgElement = document.createElement('img');
      imgElement.setAttribute('class', name);
      imgElement.setAttribute('src', 'img/' + name + '.svg');
      button.appendChild(imgElement);
      this.player.appendChild(button);
      return imgElement;
    }

    // gaura aukafalla til að sleppa við línur gerðar tvisvar

  }, {
    key: 'playPause',
    value: function playPause() {
      // Þetta er fyrsta sinn sem er ýtt á play, þá eyða posterinu,
      // sýna myndband og spila það
      if (this.played) {
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
  }, {
    key: 'show',
    value: function show() {
      this.overlay.setAttribute('class', 'overlay ');
      this.playImg.setAttribute('class', 'playImg');
      this.playButton.setAttribute('src', 'img/play.svg');
    }

    // fela overlay og play taka þegar myndband er play-a (play-a og toggla takka)

  }, {
    key: 'hide',
    value: function hide() {
      this.playImg.setAttribute('class', 'hide');
      this.overlay.setAttribute('class', 'hide');
      this.playButton.setAttribute('src', 'img/pause.svg');
      this.video.play();
    }

    // afmute-a/mute-a myndband og toggla takka í samræmi

  }, {
    key: 'soundMute',
    value: function soundMute() {
      if (this.video.muted) {
        this.muteButton.setAttribute('src', 'img/mute.svg');
        this.video.muted = false;
      } else {
        this.muteButton.setAttribute('src', 'img/unmute.svg');
        this.video.muted = true;
      }
    }

    // Setja í fullscreen

  }, {
    key: 'fullscr',
    value: function fullscr() {
      this.video.webkitRequestFullscreen();
    }

    // Spóla 3 sek afturábak

  }, {
    key: 'setBack',
    value: function setBack() {
      this.video.currentTime -= 3;
    }
    // Spóla 3 sek áfram

  }, {
    key: 'setFor',
    value: function setFor() {
      this.video.currentTime += 3;
    }

    // notar ID úr querystring til að finna hvaða video var smellt á

  }, {
    key: 'videofind',
    value: function videofind(id) {
      for (var i = 0; i < this.data.length; i += 1) {
        if (this.data[i].id === Number(id)) {
          return this.data[i];
        }
      }
      // Ef myndband finnst ekki þá errorMessage
      errorMessage();
      return null;
    }
  }]);

  return Player;
}();

document.addEventListener('DOMContentLoaded', function () {
  if (document.location.pathname.indexOf('player') > -1) {
    var player = new Player();
    player.go();
  }
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// framleiðir villuskilaboð ef axaj klikkar eða önnur villa í ajax kalli.
function errMsg() {
  var main = document.querySelector('main');
  var error = document.createElement('div');
  error.classList.add('error');
  error.appendChild(document.createTextNode('Gat ekki hlaðið gögnum'));
  main.appendChild(error);
}

// ajax kall á url og senda niðursöðu til video hlut
function getData(url, video) {
  var json = new XMLHttpRequest();
  json.open('GET', url, true);
  json.onload = function () {
    if (json.status < 400 && json.status >= 200) {
      video.run(JSON.parse(json.response));
    } else {
      console.error('villa', json);
      errMsg();
    }
  };

  json.onerror = function () {
    errMsg();
  };

  json.send();
}

function empty(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

var Video = function () {
  // smiður
  function Video() {
    _classCallCheck(this, Video);

    // local .json file
    this.API_URL = '/js/videos.json';
    this.main = document.querySelector('main');
  }

  _createClass(Video, [{
    key: 'go',
    value: function go() {
      getData(this.API_URL, this);
    }

    // keyrsla

  }, {
    key: 'run',
    value: function run(data) {
      this.header = document.createElement('h1');
      this.header.setAttribute('class', 'header header--heading1');
      this.header.appendChild(document.createTextNode('Myndbandaleigan'));

      empty(this.main);

      this.main.appendChild(this.header);
      this.data = data;
      this.process(this.data);
    }

    // vinna úr gögnum

  }, {
    key: 'process',
    value: function process(data) {
      var videos = data.videos;
      var categories = data.categories;

      var sorted = this.sort(videos, categories);

      this.make(sorted.nyleg, 'Nýleg_myndbönd');
      this.make(sorted.kennslu, 'Kennslumyndbönd');
      this.make(sorted.gaman, 'Skemmtimyndbönd');
    }

    // búa til grind

  }, {
    key: 'make',
    value: function make(cat, title) {
      var _this = this;

      this.section = document.createElement('nav');
      this.list = document.createElement('ul');
      this.list.classList.add('video');
      this.list.classList.add('row');

      this.header = document.createElement('h2');
      this.header.setAttribute('class', 'header header--heading2');

      this.section.appendChild(this.header);
      this.section.appendChild(this.list);
      this.header.appendChild(document.createTextNode(title.replace(/_+/g, ' ')));

      // fyrir alla flokka, búa til flokk með movie(x);
      Object.values(cat).forEach(function (x) {
        return _this.list.appendChild(_this.movie(x));
      });

      this.main.appendChild(this.section);
    }

    // búa til flokka með myndum

  }, {
    key: 'movie',
    value: function movie(_movie) {
      this.container = document.createElement('li');
      this.container.classList.add('video__movie');
      this.makeGrid(this.container);

      this.poster = document.createElement('a');
      this.poster.classList.add('video__poster');
      this.poster.setAttribute('href', 'player.html?id=' + _movie.id);

      this.img = document.createElement('img');
      this.img.setAttribute('src', _movie.poster);

      this.length = document.createElement('div');
      this.length.classList.add('video__length');
      this.length.appendChild(document.createTextNode(this.timestamp(_movie.duration)));

      this.title = document.createElement('h2');
      this.title.classList.add('video__title');
      this.title.appendChild(document.createTextNode(_movie.title));

      this.date = document.createElement('p');
      this.date.classList.add('video__date');
      this.date.appendChild(document.createTextNode(this.toDate(_movie.created)));

      this.info = document.createElement('div');
      this.info.classList.add('video__info');

      // TODO: gera fall fyrir movie.created
      this.info.appendChild(this.title);
      this.info.appendChild(this.date);

      this.poster.appendChild(this.img);
      this.poster.appendChild(this.length);

      this.container.appendChild(this.poster);
      this.container.appendChild(this.info);

      return this.container;
    }

    // útfæra grind

  }, {
    key: 'makeGrid',
    value: function makeGrid(cont) {
      cont.classList.add('col');
      cont.classList.add('col-4');
      cont.classList.add('col-sm-6');
      cont.classList.add('col-mm-12');
    }

    // fá lengd myndbands

  }, {
    key: 'timestamp',
    value: function timestamp(length) {
      var min = Math.floor(length / 60);
      var sec = length - min * 60;

      if (sec < 10) {
        return min + ':0' + sec;
      }
      return min + ':' + sec;
    }

    // fá aldur á myndbandi

  }, {
    key: 'toDate',
    value: function toDate(date) {
      var made = new Date(date);
      var now = new Date();
      return this.dateHowLong(now - made);
    }

    // sníða framsetningu á aldri myndbands

  }, {
    key: 'dateHowLong',
    value: function dateHowLong(time) {
      var secs = time / 1000;
      var year = Math.floor(secs / (365 * 24 * 60 * 60));
      var month = Math.floor(secs / (30 * 24 * 60 * 60));
      var week = Math.floor(secs / (7 * 24 * 60 * 60));
      var day = Math.floor(secs / (24 * 60 * 60));
      var hour = Math.floor(secs / (60 * 60));

      if (year >= 1) {
        if (year === 1) {
          return 'Fyrir ' + year + ' \xE1ri s\xED\xF0an';
        }
        return 'Fyrir ' + year + ' \xE1rum s\xED\xF0an';
      } else if (month >= 1) {
        if (month === 1) {
          return 'Fyrir ' + month + ' m\xE1nu\xF0i s\xED\xF0an';
        }
        return 'Fyrir ' + month + ' m\xE1nu\xF0um s\xED\xF0an';
      } else if (week >= 1) {
        if (week === 1) {
          return 'Fyrir ' + week + ' viku s\xED\xF0an';
        }
        return 'Fyrir ' + week + ' vikum s\xED\xF0an';
      } else if (day >= 1) {
        if (day === 1) {
          return 'Fyrir ' + day + ' degi s\xED\xF0an';
        }
        return 'Fyrir ' + day + ' d\xF6gum s\xED\xF0an';
      }
      if (hour === 1) {
        return 'Fyrir ' + hour + ' klukkustund s\xED\xF0an';
      }
      return 'Fyrir ' + hour + ' klukkustundum s\xED\xF0an';
    }

    // flokka myndir í catagoríur

  }, {
    key: 'sort',
    value: function sort(videos, cat) {
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
  }]);

  return Video;
}();

document.addEventListener('DOMContentLoaded', function () {
  var video = new Video();
  video.go();
});

//# sourceMappingURL=script-compiled.js.map