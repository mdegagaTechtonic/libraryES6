class DataTable {
  constructor() {
    Library.call(this);
    this.$container = $('#data-table');
  }

  init() {
    this._bindCustomListeners();
    this._updateStorage(); //all logic branches of _updateStorage call _updateTable, so this._updateTable is no longer necessary
  }

  _bindCustomListeners() {
    $('#search-form').on('submit',$.proxy(this._handleSearch,this));
    $(document).on('objUpdate', $.proxy(this._updateTable, this));
    //This is a global object that can be accessed as window.bookShelf. This will hold the state of your bookShelf.
    $("#show-books-button").on("click", $.proxy(this._showBooks, this));
    // $('#show-books-button').on('click', function() {
    //   var books = JSON.parse(localStorage.getItem('myLibrary'));
    //   _self._makeTable(bookify(books));
    // });
  }

  _showBooks() {
    const books = JSON.parse(localStorage.getItem('myLibrary'));
    this._makeTable(bookify(books));
  }

  _handleSearch(e) {
    e.preventDefault();
    const serArr = $('#search-form').serializeArray();
    const myObj = {};
    $.each(serArr,(index, entry) => {
      if(entry.value){
        myObj[entry.name] = entry.value;
      }
    });
    console.log(myObj);
    const searchResults = this.search(myObj);
    this.handleEventTrigger('objUpdate', searchResults);
    console.log(searchResults);
    $('.form-group input[type="text"]').val('');
    return false;
  }

  _updateTable(e) {
    //console.log(e);

    this._makeTable(e.detail);
  }

  _makeTable(books) {
    const _self = this;
    const $tbody = this.$container.find('tbody');
    //var $tbody = $('#data-table').find('tbody');
    $tbody.empty();
    $('#books-table-head').html(this._createHead(new Book({})));
    $.each(books, (index, book) => {
      $tbody.append(_self._createRow(book));
    });
  }

  _createHead(book) {
    const tr = $('<tr>');
    for (const key in book) {
      const th = $('<th>').text(spacesToCamelCase(key));
      if(key !== 'editBook') {
        tr.append(th);
      }
    }
    const dTH = $('<th>').text('Delete Book');
    tr.append(dTH);
    return tr;
  }

  _createRow(book) {
    const tr = $('<tr id="edit-book-row" data-toggle="modal" data-target="#edit-book-modal">');
    //This created our delete column
    const deleteInput = $('<input class="delete-book" type="checkbox">').attr('type', 'checkbox');
    for(const key in book){
      const td = $(`<td id=${key}>`);
      if (key === 'cover') {
        const img = $('<img>').addClass('tableImg').attr('src', book[key]);
        $(td).html(img);
      } else if(key === 'rating'){
        $(td).html(this._stars(book[key]));
      } else {
        $(td).html(key === 'synopsis' ? `${book[key].substring(0,85)}...` : book[key]);
      }
      if(key !== 'editBook') {
        tr.append(td);
      }
    }
    const deleteTd = $('<td>');
    $(deleteTd).append(deleteInput);
    tr.append(deleteTd);
    return tr;
  }

  _stars(rating) {
    const $div = $('<div>');
    let value = 0;
    for(let i=0; i<=5; i++) {
      const $star = $('<span>').addClass('fa fa-star');
      if(i<rating){ $star.addClass('checked'); value++ }
      $div.append($star);
    }
    $div.attr('value',value);
    return $div;
  }

  _updateStorage() {
    if (window.localStorage.length > 0) {
      console.log('BOOKSHELF EXISTS SETTING VALUE');
      window.bookShelf = this.getStorage();
      this.handleEventTrigger('objUpdate',window.bookShelf);
    } else {
      console.log('BOOKSHELF DOES NOT EXIST ADDING BOOKS!');
      this.addBooks(bookify(bookList));
      this.handleEventTrigger('objUpdate',window.bookShelf);
      this.setStorage();
    }
  }
}

DataTable.prototype = Object.create(Library.prototype);

//This is the document ready that will create a new instance of DataTable
//HINT: Each class||object will need a new instance to be initalized on document ready!
$(() => {
  window.gDataTable = new DataTable();
  window.gDataTable.init();
  localStorage.setItem("queueBooks","[]");
});
