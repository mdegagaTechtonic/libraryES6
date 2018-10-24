/**
 * @file The Library class that stores a collection of books
 * @author Merry Degaga
 * @version 10.24.2018
 */
 //instead of using prototype, class keyword is used.
class ShowAuthorsModal extends Library{
  //call to library class so that ShowAuthorsModal instance has access to library methods
  //initializes a ShowAuthorsModal instance
  constructor() {
  super();
  this._bindEvents();
  }
 /**
 *@private method binds events to various selectors
 */
  _bindEvents() {
    $("#show-authors-button").on("click", $.proxy(this.displayAuthors, this));
    $("#author-close").on("click", $.proxy(this.clear,this));
    $("#author-close1").on("click", $.proxy(this.clear,this)); ///make this global method????
  }
  //dynamic append authors to the show authors modal
  displayAuthors() {
    const authors = this.getAuthors();
    $.each(authors, (index, value) => {
      $("#authors").append(`<li>${value.author}</li>`);
    });
  }
  //clears out the show authors modal
  clear() {
    $("#authors").empty();
  };
}
//DOM is ready
$(() => {
  //call to ShowAuthorsModal constructor to create a ShowAuthorsModal instance
  window.ShowAuthorsModal = new ShowAuthorsModal();
});
