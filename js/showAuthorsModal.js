class ShowAuthorsModal extends Library{
  constructor() {
  //Library.call(this); //resets context
  super();
  }

  init() {
    this._bindEvents();
  }

  _bindEvents() {
    $("#show-authors-button").on("click", () => {
      displayAuthors();
    });
    $("#author-close").on("click", clear);
    $("#author-close1").on("click", clear); ///make this global method????
  }

  displayAuthors() {
    const authors = ShowAuthorsModal.getAuthors();
    $.each(authors, (index, value) => {
      $("#authors").append(`<li>${value.author}</li>`);
    });
  }

  clear() {
    $("#authors").empty();
  };
}
//Creates new library object
// ShowAuthorsModal.prototype = Object.create(Library.prototype);

// function displayAuthors() {
//
//   const authors = ShowAuthorsModal.getAuthors();
//   console.log(authors);
//   $.each(authors, (index, value) => {
//     $("#authors").append(`<li>${value.author}</li>`);
//   });
// }

// function clear() {
//   $("#authors").empty();
// }

$(() => {
  //call to ShowAuthorsModal constructor to create a ShowAuthorsModal instance
  window.ShowAuthorsModal = new ShowAuthorsModal();
  window.ShowAuthorsModal.init();
});
