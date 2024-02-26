class Season {
  constructor(season, name) {
    this.name = name;
    this.season = season;
    this.episodes = [];
  }

  addEpisode(name) {
    const episode = new Episode(name);
    this.episodes.push(episode);
    return episode;
  }

  hasBooks() {
    return this.episodes.length > 0;
  }

  getName() {
    return this.name;
  }

  getSeason() {
    return this.season;
  }

  getEpisodes() {
    return this.episodes;
  }

  getEpisode(i) {
    return this.episodes[i] ? this.episodes[i] : null;
  }
}

class Episode {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(name, author) {
    this.books.push({
      name,
      author,
    });
  }

  getBooks() {
    return this.books;
  }

  getBook(i) {
    return this.books[i] ? this.books[i] : null;
  }

  getBookName(i) {
    return this.books[i] ? this.books[i].name : null;
  }

  getBookAuthor(i) {
    return this.books[i] ? this.books[i].author : null;
  }
}

module.exports = {
  Season,
  Episode,
};
