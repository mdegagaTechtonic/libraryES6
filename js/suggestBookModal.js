class SuggestBooksModal {
  constructor() {
    Library.call(this); //resets context
  }

  init() {
    this._bindEvents();
  }

  _bindEvents() {
    $("#random-book-button").on("click", $.proxy(this.displayRandomBook,this));
    $("#close-randomBook").on("click", $.proxy(this.clearSuggestionBook, this));
    $("#close-suggestion").on("click", $.proxy(this.clearSuggestionBook, this));
    $("#book-display-modal").on("hidden.bs.modal", $.proxy(this.clearSuggestionBook,this));
  }

  displayRandomBook(event) {
    const book = this.getRandomBook();
    $("#cover-suggest").append(`<div><img class='tableImg' src=${book.cover}></div>`)

    $("#info-suggest").append(`<p>${book.title}</p>`);
    $("#info-suggest").append(`<p>By: ${book.author}</p>`);
    $("#info-suggest").append(`<p>Synopsis: ${book.synopsis}</p>`);
    $("#info-suggest").append(`<p>Pages: ${book.numberOfPages}</p>`);
    $("#info-suggest").append(`<p>Published on: ${book.publishDate}</p>`);
    this.displayStars(book);
  }

  displayStars(book) {
    for(let i=0; i<5; i++) {
      const $star = $('<span>').addClass('fa fa-star');
      if(i<book.rating){ $star.addClass('checked'); }
      $("#info-suggest").append($star);
    }
  }

  clearSuggestionBook() {
    $("#cover-suggest").empty();
    $("#info-suggest").empty();
  }
}

//Creates new library object
SuggestBooksModal.prototype = Object.create(Library.prototype);

$(() => {
  window.SuggestBooksModal = new SuggestBooksModal();
  window.SuggestBooksModal.init();
});
