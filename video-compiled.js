'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// tæmir containerinn el
function empty(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

// framleiðir villuskilaboð ef axaj klikkar eða önnur villa í ajax kalli.
function errMsg() {
  var main = document.querySelector('main');
  var error = document.createElement('div');
  error.classList.add('error');
  error.appendChild(document.createTextNode('Gat ekki hlaðið gögnum'));
  empty(main);
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
      errMsg();
    }
  };

  json.onerror = function () {
    errMsg();
  };

  json.send();
}

var Video = function () {
  // smiður
  function Video() {
    _classCallCheck(this, Video);

    // þetta API_URL er linkurinn hér að neðan þegar síða er sett á netið
    // https://notendur.hi.is/arp25/vefforritun/stortverkefni2/js/videos.json
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
      empty(this.main);

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

//# sourceMappingURL=video-compiled.js.map