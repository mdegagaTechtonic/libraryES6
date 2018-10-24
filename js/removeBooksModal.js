class RemoveBooksModal {
  constructor() {
    Library.call(this); //resets context
    let index;
  }

  init() {
    this._bindEvents();
  }

  //include e.stopPropagation() for when clicking on checkbox
  _bindEvents() {

    $("#remove-book-button").on("click", $.proxy(this.removeBooks, this));
    $(document).on("click", ".delete-book",$.proxy(this.dynamicDelete,this));
    $("#remove-books-modal").on("hidden.bs.modal", $.proxy(this.clearInputFields,this));
    $(document).on("click", "#confirm-removal", $.proxy(this.removeFromDB,this));
    $(document).on("click", "#keep-book", $.proxy(this.unCheck,this));
    $(document).on("click", ".close", $.proxy(this.unCheck, this));
    $("#checkbox-delete-modal").on("hidden.bs.modal", $.proxy(this.unCheck,this));


    //refresh table
    // $(document).on("click","#confirm-removal", function(event){
    //   alert('removed book');
    //   // event.target.checked = false;
    //
    // })
    // $(document).on("click", "#keep-book", function(event){
    //   alert('kept book');
    //   // event.target.checked = false;
    //
    // })
  }

  removeBooks() {
    this.remove();
    this.clearInputFields();
    this.updateTableAfterRemove();
  }

  dynamicDelete(event) {
    event.stopPropagation();
    //var _self = this;
    //console.log(event.target.parentNode.parentNode.childNodes[1].innerHTML);
    //console.log(event.target.parentNode.parentNode.sectionRowIndex);
    index = event.target.parentNode.parentNode.sectionRowIndex;
    const title = event.target.parentNode.parentNode.childNodes[1].innerHTML;
    console.log(title);

    if($(".delete-book").is(":checked")) {
      $("#curr-book-removing").html(title);
      $("#checkbox-delete-modal").modal();
      // $("#confirm-removal").on("click", function(){
      //   console.log(index);
      //   _self.removeFromDB(index);
      //   event.target.checked = false;
      // });
      // $("#keep-book").on("click", function(){
      //   event.target.checked = false;
      // });
      // $(".close").on("click", function() {
      //   event.target.checked = false;
      // });
    };
  }

  removeFromDB() {
    console.log(index);
    const db = JSON.parse(localStorage.getItem("myLibrary"));
    db.splice(index,1);
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
RemoveBooksModal.prototype = Object.create(Library.prototype);

$(() => {
  window.RemoveBooksModal = new RemoveBooksModal();
  window.RemoveBooksModal.init();
});
