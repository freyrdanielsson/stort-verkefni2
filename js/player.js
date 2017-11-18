class Player {
  constructor() {
    this.ex = 'player test';
  }

  test(){
    console.log(this.ex);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const player = new Player();
  player.test();
});
