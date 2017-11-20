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
  }, {
    key: 'process',
    value: function process(data) {
      console.log('yo');
    }
  }]);

  return Video;
}();

function process(data, video) {
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