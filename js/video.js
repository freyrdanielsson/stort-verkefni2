class Video {
  constructor() {
    this.ex = 'video test';
  }

  test(){
    console.log(this.ex);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const video = new Video();
  video.test();
});
