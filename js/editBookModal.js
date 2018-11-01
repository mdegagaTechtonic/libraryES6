class editBookModal extends Library{
  constructor() {
    // Library.call(this); //resets context
    super();
    this.index = '';
    this.book = '';
    this.$editForm = $('#edit-form-group');
    console.log(this.$editForm);
    this.$saveChanges = this.$editForm.find("#save-changes-btn");
    this.$undoChanges = this.$editForm.find("#reset-changes"); //issues
    this._bindEvents();
  }

  _bindEvents() {
    $(document).on("click","#edit-book-row", $.proxy(this.displayBook, this));
    this.$saveChanges.on("click", $.proxy(this.saveChanges,this));
    this.$undoChanges.on("click", $.proxy(this.setForm,this));
    $("#cover-edit-input").on("change", $.proxy(this.handleImageUpload,this));
    $("#publishDate-edit").on('input',()=> {
      $('#publishDate-edit').css('color', 'DeepPink');

    });
    $(".form-group").keydown( (event) => { //change color of type when user starts typing in info //also do a reset button //serial array //stars function? //any other refractoring
      let editBox = '#' + event.target.id;
      $(editBox).css('color', 'DeepPink');

      //if the input field goes back to the original value then change color back to black

    });
  }

  displayBook(event) {
    this.index = event.target.parentNode.sectionRowIndex;
    //grab book from db
    this.book = this.getStorage()[this.index];

    this.setForm();

    // var oThat = this;
    // for(var key in oThat.book) {
    //   var selector = $(oThat.$editForm.find("#"+key+"-edit")[0]);
    //   if(selector !== undefined) {
    //     if(selector[0].id === "publishDate-edit") {
    //       selector[0].defaultValue = new Date(oThat.book[key]).toISOString().slice(0,10);
    //     }
    //     else if(selector[0].id === "cover-edit") {
    //       // console.log(book[key]);
    //       // console.log(selector[0]);
    //       selector.attr("src", oThat.book[key]);
    //     }
    //     else {
    //     selector.val(oThat.book[key]);
    //     }
    //   }
    // }
  }

  setForm() {
    //when undo changes button is clicked, can reset the form the the auto filed values
    //grab book
    console.log(this.book);
    const oThat = this;
    for(const key in oThat.book) {
      const selector = $(oThat.$editForm.find(`#${key}-edit`)[0]);
      if(selector !== undefined) {
        if(selector[0].id === "publishDate-edit") {
          selector[0].defaultValue = new Date(oThat.book[key]).toISOString().slice(0,10);
        }
        else if(selector[0].id === "cover-edit") {
          selector.attr("src", oThat.book[key]);
        }
        else {
        selector.val(oThat.book[key]);
        }
        selector.css('color', 'Black');
      }
    }
  }

  saveChanges() {
    //call edit book method
    // let updatedBook = this.$editForm.serializeArray(); //serializeArray only returning the synopsis
    const oThat = this;
    let updatedBook = {};

    for(const key in oThat.book) {
      const selector = $(oThat.$editForm.find(`#${key}-edit`)[0]);

      if(selector !== undefined) {
        if(selector[0].id === "publishDate-edit") {
          updatedBook[key] = selector[0].value;
        }
        else if(selector[0].id === "cover-edit") {
          updatedBook[key] = selector.attr('src');
        }
        else {
          updatedBook[key] = selector.val();
        }
        selector.css('color', 'Black');
      }
    }

    this.book.editBook(updatedBook);
    this.editStorage(this.index, updatedBook);
    this.updateTableAfterEdit();
    //update STORAGE
    //update window
    // console.log("changes saved");

  }

  updateTableAfterEdit() {
    const books = JSON.parse(localStorage.getItem('myLibrary'));
    this.handleEventTrigger("objUpdate", bookify(books));
  }

  handleImageUpload() {
    const preview = document.querySelector('#cover-edit');
    const file = document.querySelector('input[name=edit]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      preview.src = reader.result; }, false);

    if (file) {
      return reader.readAsDataURL(file);
    }
  }
}

$(() => {
  window.editBookModal = new editBookModal();
});
