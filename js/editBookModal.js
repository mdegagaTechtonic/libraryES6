class editBookModal extends Library{
  constructor() {
    // Library.call(this); //resets context
    super();
    this._bindEvents();
    this.index = "";
    this.book = "";
    this.$editForm = $("#edit-form-group");
    this.$saveChanges = this.$editForm.find("#save-changes-btn");
    this.$undoChanges = this.$editForm.find("#reset-changes"); //issues
  }

  _bindEvents() {
    $(document).on("click","#edit-book-row", $.proxy(this.displayBook, this));
    this.$saveChanges.on("click", this.saveChanges);
    this.$undoChanges.on("click", this.setForm);
    $(".form-group").keydown( () => { //change color of type when user starts typing in info //also do a reset button //serial array //stars function? //any other refractoring
      $("#title-edit").css('color', 'DeepPink');
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
      }
    }
  }

  saveChanges() {
    //call edit book method
    //alert('changes saved')
    console.log("changes saved");

  }

  clearSuggestion() {
    $("#c").empty();
    $("#i").empty();
  }
}

$(() => {
  window.editBookModal = new editBookModal();
});
