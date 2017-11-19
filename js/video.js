class Video {
  constructor() {
    this.newvid = document.createElement('div');
    this.studvid = document.createElement('div');
    this.funvid = document.createElement('div');

    this.newvid.setAttribute('class', 'video');
    this.studvid.setAttribute('class', 'video');
    this.funvid.setAttribute('class', 'video');
  }


  test(){
    console.log(this.ex);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const video = new Video();
  video.load();
});
