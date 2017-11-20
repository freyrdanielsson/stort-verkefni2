class Video {
  constructor() {
    //local .json file
    this.API_URL = '/js/videos.json';
  }

  load() {
    const json = new XMLHttpRequest();
    json.open('GET', this.API_URL, true);

    json.onload = function() {
      this.data = JSON.parse(json.response);
      process(this.data);
    };
    json.send();
  }
}

function process(data) {
 const sec = document.querySelectorAll('.video');
 const videos = data.videos;
 const cat = data.categories;

 const sorted = sort(videos, cat);
 console.log(sorted);
 make(sorted.nyleg, 'Nýleg_myndbönd');
 make(sorted.kennslu, 'Kennslumyndbönd');
 make(sorted.gaman, 'Skemmtimyndbönd');
}

function make(cat, title) {
  const main = document.querySelector('main');

  const section = document.createElement('nav');
  const list = document.createElement('ul');
  list.classList.add('video');
  list.classList.add('row');

  const header = document.createElement('h2');
  header.setAttribute('class', 'header header--heading2');

  section.appendChild(header);
  section.appendChild(list);
  header.appendChild(document.createTextNode(title.replace(/_+/g, ' ')))
  Object.values(cat).forEach(x => list.appendChild(movie(x)));

  main.appendChild(section);
}

function movie(movie) {
  const container = document.createElement('li');
  container.classList.add('video__movie');
  makeGrid(container);

  const poster = document.createElement('a');
  poster.classList.add('video__poster');
  poster.setAttribute('href', 'player.html?id=' + movie.id);

  const img = document.createElement('img');
  img.setAttribute('src', movie.poster);

  const length = document.createElement('div');
  length.classList.add('video__length');
  length.appendChild(document.createTextNode(timestamp(movie.duration)));

  const title = document.createElement('h2');
  title.classList.add('movie__title');
  title.appendChild(document.createTextNode(movie.title));

  const info = document.createElement('div');
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

function makeGrid(cont) {
  console.log(cont);
  cont.classList.add('col');
  cont.classList.add('col-4');
  cont.classList.add('col-sm-6');
  cont.classList.add('col-mm-12');
}

function timestamp(length) {
const min = Math.floor(length/60);
console.log(min);
const sec = length - (min * 60);

if (sec<10) { return `${min}:0${sec}`; }
else { return `${min}:${sec}`; }
}

function sort(videos, cat) {

  // TODO: reyna koma þessu í forEach eða álíka
  const nyleg = videos.filter(function(categorie) {
    return cat[0].videos.includes(categorie.id);
  });

  const kennslu = videos.filter(function(categorie) {
    return cat[1].videos.includes(categorie.id);
  });

  const gaman = videos.filter(function(categorie) {
    return cat[2].videos.includes(categorie.id);
  });

  return {nyleg, kennslu, gaman};
}

document.addEventListener('DOMContentLoaded', () => {
  const video = new Video();
  video.load();
});
