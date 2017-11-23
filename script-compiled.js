'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(data) {
    _classCallCheck(this, Player);

    this.data = data;
    //TODO nota search parameter til að finna ID
    this.videoinfo = this.videofind(window.location.search.charAt(4));
    this.container = document.querySelector('.container');
    this.videoContainer = this.container.querySelector('.videoContainer');
    //finna takkanna líka inní fallinu, breyta html þá pínu
    this.playButton = this.container.querySelectorAll('.player .player__button')[1].querySelector('.play');
    this.soundButton = this.container.querySelectorAll('.player .player__button')[2].querySelector('.sound');
    //Er verið að play-a í fyrsta skipti
    this.played = true;
  }

  _createClass(Player, [{
    key: 'init',
    value: function init() {
      //Setja titil efst á síðu
      this.heading = this.container.querySelector('.heading');
      this.heading.appendChild(document.createTextNode(this.videoinfo.title));

      //Búum til myndbandshlut
      this.video = document.createElement('video');
      //Video er falið í byrjun því þá er poster sýnt
      this.video.setAttribute('class', 'hide');
      this.video.setAttribute('src', this.videoinfo.video);
      this.videoContainer.appendChild(this.video);

      //Búum til og setjum inn poster
      this.poster = document.createElement('img');
      this.poster.setAttribute('src', this.videoinfo.poster);
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

  }, {
    key: 'playPause',
    value: function playPause() {
      //Þetta er fyrsta sinn sem er ýtt á play, þá eyða posterinu,
      //sýna myndband og spila það
      if (this.played) {
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

  }, {
    key: 'hide',
    value: function hide() {
      this.playImg.setAttribute('class', 'hide');
      this.overlay.setAttribute('class', 'hide');
      this.playButton.setAttribute('src', 'img/pause.svg');
      this.video.play();
    }

    //afmute-a/mute-a myndband og toggla takka í samræmi

  }, {
    key: 'soundMute',
    value: function soundMute() {
      if (this.video.muted) {
        this.soundButton.setAttribute('src', 'img/mute.svg');
        this.video.muted = false;
      } else {
        this.soundButton.setAttribute('src', 'img/unmute.svg');
        this.video.muted = true;
      }
    }

    //Setja í fullscreen

  }, {
    key: 'fullscr',
    value: function fullscr() {
      this.video.webkitRequestFullscreen();
    }

    //Spóla 3 sek afturábak

  }, {
    key: 'setBack',
    value: function setBack() {
      this.video.currentTime -= 3;
    }
    //Spóla 3 sek áfram

  }, {
    key: 'setFor',
    value: function setFor() {
      this.video.currentTime += 3;
    }

    //notar ID úr querystring til að finna hvaða video var smellt á

  }, {
    key: 'videofind',
    value: function videofind(id) {
      //TODO nota flottari lykkju?
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].id == id) {
          return this.data[i];
        }
      }
    }
  }]);

  return Player;
}();

//TODO ath hvort skili villu
//TODO ekki framkvæma á index síðu
//Hlaða gögnum


function load() {
  var json = new XMLHttpRequest();
  json.open('GET', '/js/videos.json', true);

  json.onload = function () {
    var jsondata = JSON.parse(json.response);
    var player = new Player(jsondata.videos);
    player.init();
  };
  json.send();
}

document.addEventListener('DOMContentLoaded', function () {
  load();
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
    this.loading = document.createElement('img');
    this.loading.setAttribute('src', 'img/Eclipse.gif');
    this.loading.setAttribute('class', 'loading row col col-center');

    this.main.appendChild(this.loading);
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