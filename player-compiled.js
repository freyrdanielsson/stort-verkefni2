'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//  Fall til að hreinsa hlut
function empty(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}
// notar ID úr querystring til að finna hvaða video var smellt á
function videofind(data) {
  var sParameter = new URLSearchParams(window.location.search);
  var id = sParameter.get('id');
  for (var i = 0; i < data.length; i += 1) {
    if (data[i].id === Number(id)) {
      return data[i];
    }
  }
  return null;
}
//  framleiðir villuskilaboð ef axaj klikkar eða önnur villa í ajax kalli.
function errorMessage() {
  var cont = document.querySelector('.main .container .videoContainer');
  var error = document.createElement('div');
  empty(cont);
  error.setAttribute('class', 'errorMsg');
  error.appendChild(document.createTextNode('Gat ekki hlaðið gögnum'));
  cont.appendChild(error);
}
//  Hlaða gögnum
function load(url, player) {
  var json = new XMLHttpRequest();
  json.open('GET', '/js/videos.json', true);
  json.onload = function () {
    if (json.status < 400 && json.status >= 200) {
      var jsondata = JSON.parse(json.response);
      // Sækja okkar myndband úr fylkinu
      var myvideo = videofind(jsondata.videos);
      // Ef okkar myndband (myndband með sama ID og okkar var ekki til)
      if (myvideo == null) {
        errorMessage();
      } else {
        player.init(myvideo);
      }
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
    this.API_URL = 'https://notendur.hi.is/fsd1/vefforritun/stortverkefni2/js/Myndbandaleigan/videos.json';
  }

  _createClass(Player, [{
    key: 'go',
    value: function go() {
      load(this.API_URL, this);
    }
  }, {
    key: 'init',
    value: function init(data) {
      // hér er data = jsondata.video
      this.videoinfo = data;

      //  Sækja container á síðunni
      this.container = document.querySelector(' .container');
      // Sækja videocontainer
      this.videoContainer = this.container.querySelector('.videoContainer');
      // taka út loading.gif
      empty(this.videoContainer);

      // Setja titil efst á síðu
      this.heading = this.container.querySelector('.heading');
      this.heading.removeChild(this.heading.firstChild);
      this.heading.appendChild(document.createTextNode(this.videoinfo.title));

      // Sækja takka
      this.back = this.container.querySelector('.player .back');
      this.playButton = this.container.querySelector('.player .play');
      this.muteButton = this.container.querySelector('.player .sound');
      this.fullscreen = this.container.querySelector('.player .fullscreen');
      this.next = this.container.querySelector('.player .next');

      // Er verið að play-a í fyrsta skipti
      this.played = true;

      // Setja titil í head title síðu
      document.title = this.videoinfo.title;

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

      // Setja atburðahandler á myndband, sjá hvenar það klárast, skipta um takka
      this.video.addEventListener('ended', this.show.bind(this));
    }
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
        // Ef myndband er pásað, er verið að play-a, fela skugga og play takka
        this.hide();
      } else {
        // Það er verið að pása, sýna playtakka og overlay
        this.show();
        this.video.pause();
      }
    }
    // Sýna gögn, overlay, playtakka á skjá og playtakka í player

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
  }]);

  return Player;
}();

document.addEventListener('DOMContentLoaded', function () {
  if (document.location.pathname.indexOf('player') > -1) {
    var player = new Player();
    player.go();
  }
});

//# sourceMappingURL=player-compiled.js.map