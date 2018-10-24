/**
 * @file The Library class that stores a collection of books
 * @author Merry Degaga
 * @version 10.24.2018
 */
 //instead of using prototype, class keyword is used.
class RemoveBooksModal extends Library{
  //call to library class so that RemoveBooksModal instance has access to library methods
  //initializes a RemoveBooksModal instance
  constructor() {
    super();
    this.index;
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
  //removes books and clears out the form and updates the table
  removeBooks() {
    this.removeModal();
    this.clearInputFields();
    this.updateTableAfterRemove(); //can this be moved to util / also any other methods in datatable that can be moved to util?
  }
  //delete via checkbox
  dynamicDelete(event) {
    event.stopPropagation();
    this.index = event.target.parentNode.parentNode.sectionRowIndex;
    const title = event.target.parentNode.parentNode.childNodes[1].innerHTML;
    if($(".delete-book").is(":checked")) {
      $("#curr-book-removing").html(title);
      $("#checkbox-delete-modal").modal();
    };
  }
  //after checkbox clicked, modal confirmation removes it from db
  removeFromDB() {
    const db = JSON.parse(localStorage.getItem("myLibrary"));
    db.splice(this.index,1);
    localStorage.setItem("myLibrary", JSON.stringify(db));
    this.handleEventTrigger("objUpdate",bookify(db));
  }
  //handles when remove book button clicked
  removeModal() {
    const title = $("#title-remove-input").val();
    const author = $("#author-remove-input").val();
    if(title) {
      this.removeBookByTitle(title);
    }
    if(author) {
      this.removeBookByAuthor(author);
    }
  }
  //clears form fields
  clearInputFields() {
    $('.form-group input[type="text"]').val('');
  }
  //unchecks delete box
  unCheck() {
    $('input[type=checkbox]').prop('checked',false);
  }

  updateTableAfterRemove() {
    const books = JSON.parse(localStorage.getItem('myLibrary'));
    this.handleEventTrigger("objUpdate", bookify(books));
  }
}
//DOM is ready
$(() => {
  //call to RemoveBooksModal constructor to create a RemoveBooksModal instance
  window.RemoveBooksModal = new RemoveBooksModal();
});
