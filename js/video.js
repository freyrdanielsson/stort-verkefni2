class Video {
  constructor() {
    //local .json file
    this.API_URL = '/js/videos.json';
    getData(this.API_URL, this);
  }

  run(data) {
    this.data = data;
    console.log(this.data);

    this.process(this.data);
  }

   process(data) {
   const sec = document.querySelectorAll('.video');
   const videos = data.videos;
   const cat = data.categories;

   const sorted = this.sort(videos, cat);
   console.log(sorted);
   this.make(sorted.nyleg, 'Nýleg_myndbönd');
   this.make(sorted.kennslu, 'Kennslumyndbönd');
   this.make(sorted.gaman, 'Skemmtimyndbönd');
  }

  make(cat, title) {
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
    Object.values(cat).forEach(x => list.appendChild(this.movie(x)));

    main.appendChild(section);
  }

  movie(movie) {
    const container = document.createElement('li');
    container.classList.add('video__movie');
    this.makeGrid(container);

    const poster = document.createElement('a');
    poster.classList.add('video__poster');
    poster.setAttribute('href', 'player.html?id=' + movie.id);

    const img = document.createElement('img');
    img.setAttribute('src', movie.poster);

    const length = document.createElement('div');
    length.classList.add('video__length');
    length.appendChild(document.createTextNode(this.timestamp(movie.duration)));

    const title = document.createElement('h2');
    title.classList.add('video__title');
    title.appendChild(document.createTextNode(movie.title));

    const info = document.createElement('div');
    info.classList.add('video__info');

  // TODO: gera fall fyrir movie.created
    info.appendChild(title);
    info.appendChild(document.createTextNode(this.toDate(movie.created)));

    poster.appendChild(img);
    poster.appendChild(length);

    container.appendChild(poster);
    container.appendChild(info);

    return container;
  }

  makeGrid(cont) {
    cont.classList.add('col');
    cont.classList.add('col-4');
    cont.classList.add('col-sm-6');
    cont.classList.add('col-mm-12');
  }

  timestamp(length) {
  const min = Math.floor(length/60);
  const sec = length - (min * 60);

  if (sec<10) { return `${min}:0${sec}`; }
  else { return `${min}:${sec}`; }
  }

  toDate(date) {
    const made = new Date(date);
    const now = new Date();
    return this.dateHowLong(now-made);
  }

  dateHowLong(time) {
    const secs =  time / 1000;
    const year = Math.floor(secs / (365 * 24 * 60 * 60));
    const month = Math.floor(secs / (30 * 24 * 60 * 60));
    const week = Math.floor(secs / (7 * 24 * 60 * 60));
    const day = Math.floor(secs / (24 * 60 * 60));

    if(year >= 1) {
      if(year == 1) {
        return `fyrir ${year} ári síðan`;
      } else return `fyrir ${year} árum síðan`;
    } else if(month >= 1) {
      if(month == 1) {
        return `fyrir ${month} mánuði síðan`;
      } else return `fyrir ${month} mánuðum síðan`;
    } else if(week >= 1) {
      if(week == 1) {
        return `fyrir ${week} viku síðan`;
      } else return `fyrir ${week} vikum síðan`;
    } else if(day >= 1) {
      if(day == 1) {
        return `fyrir ${day} degi síðan`;
      } else return `fyrir ${day} dögum síðan`;
    } else {
      if(hour == 1) {
        return `fyrir ${hour} klukkustund síðan`;
      } else return `fyrir ${hour} klukkustundum síðan`;
    }
  }

  sort(videos, cat) {
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

}

function getData(url, video) {
  const json = new XMLHttpRequest();
  json.open('GET', url, true);
  json.onload = function() {
    if (json.status < 400 && json.status >= 200) {
      video.run(JSON.parse(json.response));
    } else {

      console.error('villa', json);
      errMsg();
    }
  };

  json.onerror = function() {
    errMsg();
  };

  json.send();
}

function errMsg() {
  const main = document.querySelector('main');
  const error = document.createElement('div');
  error.classList.add('error');
  error.appendChild(document.createTextNode('Gat ekki hlaðið gögnum'));
  main.appendChild(error);
}

document.addEventListener('DOMContentLoaded', () => {
  const video = new Video();
});
