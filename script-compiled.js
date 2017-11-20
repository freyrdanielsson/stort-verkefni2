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

var Player = function () {
  function Player() {
    _classCallCheck(this, Player);

    //lykill fyrir geymt info í localstorage?
    this.keyName = 'info';

    this.container = document.querySelector('.container');
    this.heading = this.container.querySelector('.heading');
    //finna takka
    this.prev = this.container.querySelector('.player .prev');
    this.play = this.container.querySelector('.player .play');
    this.sound = this.container.querySelector('.player .sound');
    this.fullscreen = this.container.querySelector('.player .fullscreen');
    this.next = this.container.querySelector('.player .next');
  }

  _createClass(Player, [{
    key: 'load',
    value: function load() {
      console.log(this.container);
      console.log(this.player);

      var saved = window.localStorage.getItem(this.keyName);

      if (saved) {
        var parse = JSON.parse(saved);
        //ath betur hvernig video info er, video er sótt
        this.create(parse.title, parse.video);
      }
    }

    //hugmynd

  }, {
    key: 'create',
    value: function create(title, video) {
      //setja <h1> sem titil myndbands
      this.heading.appendChild(document.createTextNode(title));

      //Event listener fyrir takka, þarf að búa til þessi föll
      //geta líka verið nafnlaus föll fyrir einfaldari takkana
      this.prev.addEventListener('click', this.prevfun.bind(this));
      this.play.addEventListener('click', this.playfun.bind(this));
      this.sound.addEventListener('click', this.soundfun.bind(this));
      this.fullscreen.addEventListener('click', this.fullscreenfun.bind(this));
      this.next.addEventListener('click', this.nextfun.bind(this));
    }
  }]);

  return Player;
}();

document.addEventListener('DOMContentLoaded', function () {
  var player = new Player();
  player.load();
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Video = function () {
  function Video() {
    _classCallCheck(this, Video);

    this.newvid = document.createElement('div');
    this.studvid = document.createElement('div');
    this.funvid = document.createElement('div');

    this.newvid.setAttribute('class', 'video');
    this.studvid.setAttribute('class', 'video');
    this.funvid.setAttribute('class', 'video');
  }

  _createClass(Video, [{
    key: 'test',
    value: function test() {
      console.log(this.ex);
    }
  }]);

  return Video;
}();

document.addEventListener('DOMContentLoaded', function () {
  var video = new Video();
  video.load();
});

//# sourceMappingURL=script-compiled.js.map