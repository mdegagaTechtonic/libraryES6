class AddBooksModal {
  constructor() {
    Library.call(this); //resets context
  }

  init() {
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

  _bindEvents() {
    $("#cover-add-input").on("change", $.proxy(this._handleImageUpload,this));
    $("#add-book-button").on("click", $.proxy(this._handleAddBooks, this));
    $("#queue-book-button").on("click", $.proxy(this._handleQueueBooks,this));
    $("#add-books-modal").on("hidden.bs.modal", $.proxy(this.clearInputFields,this));
  }

  _handleAddBooks() {

    const queue = JSON.parse(localStorage.getItem('queueBooks'));
    if(queue.length !== 0) {
      this.addBooks(queue);
    }
    //case of user clicking on add book button and none in queue
    if($("#title-add-input").val() && $("#author-add-input").val() && $("#pages-add-input").val() && $("#date-add-input").val()) {
      const title = $("#title-add-input").val();
      const author = $("#author-add-input").val();
      const rating = $("#rating-add-input").val();
      const numberOfPages = $("#pages-add-input").val();
      const publishDate = $("#date-add-input").val();
      const synopsis = $("#synopsis-add-input").val();
      this._handleImageUpload();
      const cover = $('#addBookCoverImage').attr("src");
      //var cover = $('#addBookCoverImage').attr("src");

      this.addBook(new Book({'title':title, 'author':author, 'rating':rating, 'numberOfPages': numberOfPages, 'publishDate':publishDate, 'synopsis':synopsis, 'cover': cover}));

    }
    clearQueue();
    this.clearInputFields();
    this.setCounter([]);
    this.updateTableAfterAdd();
  }

  _handleQueueBooks(event) {
    event.preventDefault();
    if($("#title-add-input").val() && $("#author-add-input").val() && $("#pages-add-input").val() && $("#date-add-input").val()) {
      this.addBookToQueue();
      this.clearInputFields();
    }
  }

  addBookToQueue() {
    arr = JSON.parse(localStorage.getItem("queueBooks"));

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

  setCounter(arr) {
    $("#add-books-counter").html(arr.length);
  }

  clearInputFields() {
    $('.form-group input[type="text"]').val('');
    $('.form-group input[type="number"]').val('');
    $('#addBookCoverImage').attr('src','#')
    $('#cover-add-input').val('');
  }

  updateTableAfterAdd() {
    const books = JSON.parse(localStorage.getItem('myLibrary'));
    this.handleEventTrigger("objUpdate",bookify(books));
  }
}

//Creates new library object
AddBooksModal.prototype = Object.create(Library.prototype);

$(() => {
  window.AddBooksModal = new AddBooksModal();
  window.AddBooksModal.init();
});
