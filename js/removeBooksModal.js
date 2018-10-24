class RemoveBooksModal extends Library{
  constructor() {
    //Library.call(this); //resets context
    super();
    this.index;
  }

  init() {
    this._bindEvents();
  }
  /**
  *@private method
  */
  _bindEvents() {
    $("#remove-book-button").on("click", $.proxy(this.removeBooks, this));
    $(document).on("click", ".delete-book",$.proxy(this.dynamicDelete,this));
    $("#remove-books-modal").on("hidden.bs.modal", $.proxy(this.clearInputFields,this));
    $(document).on("click", "#confirm-removal", $.proxy(this.removeFromDB,this));
    $(document).on("click", "#keep-book", $.proxy(this.unCheck,this));
    $(document).on("click", ".close", $.proxy(this.unCheck, this));
    $("#checkbox-delete-modal").on("hidden.bs.modal", $.proxy(this.unCheck,this));
  }

  removeBooks() {
    this.remove();
    this.clearInputFields();
    this.updateTableAfterRemove();
  }

  dynamicDelete(event) {
    event.stopPropagation();
    this.index = event.target.parentNode.parentNode.sectionRowIndex;
    const title = event.target.parentNode.parentNode.childNodes[1].innerHTML;
    if($(".delete-book").is(":checked")) {
      $("#curr-book-removing").html(title);
      $("#checkbox-delete-modal").modal();
    };
  }

  removeFromDB() {
    const db = JSON.parse(localStorage.getItem("myLibrary"));
    db.splice(this.index,1);
    localStorage.setItem("myLibrary", JSON.stringify(db));
    this.handleEventTrigger("objUpdate",bookify(db));
  }

  remove() {
    const title = $("#title-remove-input").val();
    const author = $("#author-remove-input").val();
    if(title) {
      RemoveBooksModal.removeBookByTitle(title);
    }
    if(author) {
      RemoveBooksModal.removeBookByAuthor(author);
    }
  }

  clearInputFields() {
    $('.form-group input[type="text"]').val('');
  }

  unCheck() {
    $('input[type=checkbox]').prop('checked',false);
  }

  updateTableAfterRemove() {
    const books = JSON.parse(localStorage.getItem('myLibrary'));
    this.handleEventTrigger("objUpdate", bookify(books));
  }
}

//Creates new library object
// RemoveBooksModal.prototype = Object.create(Library.prototype);

$(() => {
  window.RemoveBooksModal = new RemoveBooksModal();
  window.RemoveBooksModal.init();
});
