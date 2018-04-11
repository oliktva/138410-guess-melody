const audio = [
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    artist: `Gunnar Olsen`,
    name: `Home Stretch`,
    image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  }
];

export let initialState = {
  remainingTime: {
    minutes: `5`,
    seconds: `00`
  },
  errors: 0,
  level1: {
    question: {
      title: `Кто исполняет эту песню?`,
      audio: audio[0]
    },
    answers: [{
      artist: `Пелагея`,
      avatar: `http://placehold.it/134x134`
    }, {
      artist: `Краснознаменная дивизия имени моей бабушки`,
      avatar: `http://placehold.it/134x134`
    }, {
      artist: `Lorde`,
      avatar: `http://placehold.it/134x134`
    }]
  },
  level2: {
    question: {
      title: `Выберите инди-рок треки`
    },
    answers: [{
      artist: `Пелагея`,
      audio: audio[1]
    }, {
      artist: `Краснознаменная дивизия имени моей бабушки`,
      audio: audio[2]
    }, {
      artist: `Lorde`,
      audio: audio[3],
    }, {
      artist: `Lorde`,
      audio: audio[4],
    }]
  }
};
