class Player {
  constructor() {
    this.test = 'player test';
  }

  test(){
    console.log(this.test);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const player = new Player();
  player.test();
});
