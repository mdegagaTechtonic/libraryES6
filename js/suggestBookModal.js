/**
 * @file The Library class that stores a collection of books
 * @author Merry Degaga
 * @version 10.24.2018
 */
//instead of using prototype, class keyword is used.
class SuggestBooksModal extends Library{
  //call to library class so that SuggestBooksModal instance has access to library methods
  //initializes a SuggestBooksModal instance
  constructor() {
    super();
    this._bindEvents();
  }
  /**
  *@private method to bind events
  */
  _bindEvents() {
    $("#random-book-button").on("click", $.proxy(this.displayRandomBook,this));
    $("#close-randomBook").on("click", $.proxy(this.clearSuggestionBook, this));
    $("#close-suggestion").on("click", $.proxy(this.clearSuggestionBook, this));
    $("#book-display-modal").on("hidden.bs.modal", $.proxy(this.clearSuggestionBook,this));
  }
  //displays a random book dynamically in html
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
  //move this to util
  displayStars(book) {
    for(let i=0; i<5; i++) {
      let $star = $('<span>').addClass('fa fa-star');
      if(i<book.rating){ $star.addClass('checked'); }
      $("#info-suggest").append($star);
    }
  }
  //clears the suggest book modal
  clearSuggestionBook() {
    $("#cover-suggest").empty();
    $("#info-suggest").empty();
  }
}
//DOM is ready
$(() => {
  //call to SuggestBooksModal constructor to create a SuggestBooksModal instance
  window.SuggestBooksModal = new SuggestBooksModal();
});
