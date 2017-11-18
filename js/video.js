class Video {
  constructor() {
    this.test = 'video test';
  }

  test(){
    console.log(this.test);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const video = new Video();
  video.test();
});
