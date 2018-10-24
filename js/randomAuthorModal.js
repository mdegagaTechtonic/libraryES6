// var author;

class RandomAuthorModal {
  constructor() {
    Library.call(this); //resets context
  }

  init() {
    this._bindEvents();
  }

  _bindEvents() {

    $("#random-author-button").on("click", $.proxy(this.displayAuthor,this));
    $("#author-close").on("click", $.proxy(this.clear,this));
    $("#author-close1").on("click", $.proxy(this.clear,this));
    $("#author-display-modal").on("hidden.bs.modal", $.proxy(this.clear,this));
    // $("#random-author-button").on("click", function() {
    //     displayAuthor();
    //   });
    // $("#author-close").on("click", clear);
    // $("#author-close1").on("click", clear);
  }

  displayAuthor() {
    const author = this.getRandomAuthorName();
    console.log(author);
    $("#authors").append(`<li>${author}</li>`)
  }

  clear() {
    $("#authors").empty();
  }
}

//Creates new library object
RandomAuthorModal.prototype = Object.create(Library.prototype);

$(() => {
  window.RandomAuthorModal = new RandomAuthorModal();
  window.RandomAuthorModal.init();
});
