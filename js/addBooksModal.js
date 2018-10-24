/**
*@class AddBooksModal is a child of Library via the extends keyword
*/
class AddBooksModal extends Library {
  //call to library class so that AddBooksModal instance has access to library methods
  //initializes a AddBooksModal instance
  constructor() {
    super();
    this._handleImageUpload();
    this._bindEvents();
  }
  //Use the function below to add cover art as a base64 encoded string
  //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  //If you get stuck reference the documents in the link above
  _handleImageUpload() {
    const preview = document.querySelector('#addBookCoverImage');
    const file = document.querySelector('input[name=add]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      preview.src = reader.result; }, false);

    if (file) {
      return reader.readAsDataURL(file);
    }
  }
  /**
  *@private method
  */
  _bindEvents() {
    $("#cover-add-input").on("change", $.proxy(this._handleImageUpload,this));
    $("#add-book-button").on("click", $.proxy(this._handleAddBooks, this));
    $("#queue-book-button").on("click", $.proxy(this._handleQueueBooks,this));
    $("#add-books-modal").on("hidden.bs.modal", $.proxy(this.clearInputFields,this));
  }
  /**
  *@private method will add books in if there are any in the queue or if the user simply clicks on add book button
  */
  _handleAddBooks() {

    const queue = bookify(JSON.parse(localStorage.getItem('queueBooks')));
    if(queue.length !== 0) {
      this.addBooks(queue);
    }
    if($("#title-add-input").val() && $("#author-add-input").val() && $("#pages-add-input").val() && $("#date-add-input").val()) {
      const title = $("#title-add-input").val();
      const author = $("#author-add-input").val();
      const rating = $("#rating-add-input").val();
      const numberOfPages = $("#pages-add-input").val();
      const publishDate = $("#date-add-input").val();
      const synopsis = $("#synopsis-add-input").val();
      this._handleImageUpload();
      const cover = $('#addBookCoverImage').attr("src");

      this.addBook(new Book({'title':title, 'author':author, 'rating':rating, 'numberOfPages': numberOfPages, 'publishDate':publishDate, 'synopsis':synopsis, 'cover': cover}));

    }
    clearQueue(); //method in util.js
    this.clearInputFields();
    this.setCounter([]);
    this.updateTableAfterAdd();
  }
  /**
  *@private method adds a book to the queue after queue book button clicked
  */
  _handleQueueBooks(event) {
    event.preventDefault();
    if($("#title-add-input").val() && $("#author-add-input").val() && $("#pages-add-input").val() && $("#date-add-input").val()) {
      this.addBookToQueue();
      this.clearInputFields();
    }
  }

  addBookToQueue() {
    let arr = JSON.parse(localStorage.getItem("queueBooks"));

    const title = $("#title-add-input").val();
    const author = $("#author-add-input").val();
    const rating = $("#rating-add-input").val();
    const numberOfPages = $("#pages-add-input").val();
    const publishDate = $("#date-add-input").val();
    const synopsis = $("#synopsis-add-input").val();
    const cover = $('#addBookCoverImage').attr("src");

    const book = new Book({'title':title, 'author':author, 'rating':rating, 'numberOfPages': numberOfPages, 'publishDate':publishDate, 'synopsis':synopsis, 'cover': cover});
    arr.push(book);
    this.setCounter(arr);
    localStorage.setItem("queueBooks", JSON.stringify(arr));
  }
  //sets the counter dynamically based on the number of books in the ready to add queue
  setCounter(arr) {
    $("#add-books-counter").html(arr.length);
  }

  clearInputFields() {
    $('.form-group input[type="text"]').val('');
    $('.form-group input[type="number"]').val('');
    $('#addBookCoverImage').attr('src','#')
    $('#cover-add-input').val('');
  }
  //table is updated after adding in a book ---simialr to update table after remove -- move to util or consolidate ?
  updateTableAfterAdd() {
    const books = JSON.parse(localStorage.getItem('myLibrary'));
    this.handleEventTrigger("objUpdate",bookify(books));
  }
}
//DOM ready
$(() => {
  //call to AddBooksModal constructor to create a AddBooksModal instance
  window.AddBooksModal = new AddBooksModal();
});
