
class Player {
  constructor() {
    //lykill fyrir geymt info í localstorage?
    this.keyName = 'info'

    this.container = document.querySelector('.container');
    this.heading = (this.container).querySelector('.heading');
    //finna takka
    this.prev = (this.container).querySelector('.player .prev');
    this.play = (this.container).querySelector('.player .play');
    this.sound = (this.container).querySelector('.player .sound');
    this.fullscreen = (this.container).querySelector('.player .fullscreen');
    this.next = (this.container).querySelector('.player .next');

  }

  load() {
    const saved = window.localStorage.getItem(this.keyName);

    if (saved){
      const parse = JSON.parse(saved);
      //ath betur hvernig video info er, video er sótt
      this.create(parse.title, parse.video);
    }
  }

//hugmynd
  create(title, video) {
    //setja <h1> sem titil myndbands
    (this.heading).appendChild(document.createTextNode(title));

    //Event listener fyrir takka, þarf að búa til þessi föll
    //geta líka verið nafnlaus föll fyrir einfaldari takkana
    (this.prev).addEventListener('click', this.prevfun.bind(this));
    (this.play).addEventListener('click', this.playfun.bind(this));
    (this.sound).addEventListener('click', this.soundfun.bind(this));
    (this.fullscreen).addEventListener('click', this.fullscreenfun.bind(this));
    (this.next).addEventListener('click', this.nextfun.bind(this));

  }

}

document.addEventListener('DOMContentLoaded', function () {
  const player = new Player();
  player.load();
});
