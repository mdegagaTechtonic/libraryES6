/**
 * @file The Library class that stores a collection of books
 * @author Merry Degaga
 * @version 10.24.2018
 */
 //instead of using prototype, class keyword is used.
class RandomAuthorModal extends Library{
  //call to library class so that RandomAuthorModal instance has access to library methods
  //initializes a RandomAuthorModal instance
  constructor() {
    super();
    this._bindEvents();
  }
  /**
  *@private method
  */
  _bindEvents() {
    $("#random-author-button").on("click", $.proxy(this.displayAuthor,this));
    $("#author-close").on("click", $.proxy(this.clear,this));
    $("#author-close1").on("click", $.proxy(this.clear,this));
    $("#author-display-modal").on("hidden.bs.modal", $.proxy(this.clear,this));
  }
  //displays an author in the random author modal
  displayAuthor() {
    const author = this.getRandomAuthorName();
    $("#authors").append(`<li>${author}</li>`)
  }
  //clears the random author modal
  clear() {
    $("#authors").empty();
  }
}
//DOM ready
$(() => {
  //call to RandomAuthorModal constructor to create a RandomAuthorModal instance
  window.RandomAuthorModal = new RandomAuthorModal();
});
