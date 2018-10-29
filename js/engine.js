/**
 * @file The Library class that stores a collection of books
 * @author Merry Degaga
 * @version 10.24.2018
 */
 //instead of using prototype, class keyword is used.
/**
*@class creates a library with various functionalities
*/
class Library {
  handleEventTrigger(sEvent, oData) {
    var oData = oData || {};
    if(sEvent) {
      const event = new CustomEvent(sEvent, {'detail':oData});
      document.dispatchEvent(event);
    }
  }

  /**
  * Adds a book to the library
  * @param {Book} book
  * @return {boolean} true if it was added in or false (because it is already in the library)
  */
  addBook(book) {
    for(let i = 0; i < window.bookShelf.length; i++) {
      if(book.title.toLowerCase().trim() === window.bookShelf[i].title.toLowerCase().trim()){
        console.log(`Sorry ${book.title} already exists.`);
        return false;
      }
    }
    console.log(`added ${book.title} to book shelf`);
    window.bookShelf.push(book);
    this.setStorage();
    return true;
  }

  /**
  * Removes a book by its title from the library
  * @param {String} title
  * @return {boolean} true if it was removed or false (because it is not in the library)
  */
  removeBookByTitle(title) {
    for (let i = 0; i < window.bookShelf.length; i++) {
      if(window.bookShelf[i].title.toLowerCase() === title.toLowerCase()) {
        console.log(`removed ${window.bookShelf[i].title} from book shelf`);
        window.bookShelf.splice(i,1);
        this.setStorage();
        return true;
      }
    }
    return false;
  }
  /**
  * Removes all books by the author's name from the library
  * @param {String} authorName
  * @return {boolean} true if they were removed or false (because they are not in the library)
  */
  removeBookByAuthor(author) {
    let booksRemoved = false;
    for (let i = window.bookShelf.length - 1; i >= 0; i--) {
      if (window.bookShelf[i].author.toLowerCase() === author.toLowerCase()) {
        window.bookShelf.splice(i, 1);
        booksRemoved = true;
        this.setStorage();
      }
    }
    return booksRemoved;
  }
  /**
  * Return a random book from the library
  * @return {Book} or null if there are no books in the library
  */
  getRandomBook() {
    if(window.bookShelf.length){
      return window.bookShelf[Math.floor(Math.random() * Math.floor(window.bookShelf.length))];
    }
    return null;
  }
  /**
  * Returns all books that completely and partially match the title
  * @param {String} title
  * @return {Array} of book Objects that match and partially match the title or an empty array if no books match or partially match
  */
  getBookByTitle(title) {
    const matchedArr = [];
    for (let i = 0; i < window.bookShelf.length; i++) {
      if(window.bookShelf[i].title.toLowerCase().search(title.toLowerCase()) >= 0){
        matchedArr.push(window.bookShelf[i]);
      }
    }
    return matchedArr;
  }
  /**
  * Returns all books that match and partially match the author's name
  * @param {String} authorName
  * @return {Array} of books Objects that match and partially match the author name or an empty array if no books match or partially match
  */
  getBooksByAuthor(authorName) {
    const matchedArr = [];
    for (let i = 0; i < window.bookShelf.length; i++) {
      if(window.bookShelf[i].author.toLowerCase().search(authorName.toLowerCase()) >= 0) {
        matchedArr.push(window.bookShelf[i]);
      }
    }
    return matchedArr;
  }
  /**
  * Adds a collection of books to the library
  * @param {Array} books
  * @return {number} of books added in or zero if no books were added in
  */
  addBooks(books) {
    let counter = 0;
    for (let i = 0; i < books.length; i++) {
      if (this.addBook(books[i])) {
        counter++;
      }
    }
    this.setStorage();
    return counter;
  }
  /**
  * Returns the distinct authors' names from all books in the library
  * @return {Array} of Strings of the names of all distinct authors or an empty array if no books exist or if no authors exist
  */
  getAuthors() {
    if (window.bookShelf.length) {
      return window.bookShelf.unique("author");
    }
    return [];
  }
  /**
  * Returns a random author name from the library
  * @return {String} author name or null if no books exist
  */
  getRandomAuthorName() {
    if (!window.bookShelf.length) {
      return null;
    } else {
      return window.bookShelf[Math.floor(Math.random() * Math.floor(window.bookShelf.length))].author;
    }
  }

  /**
  * Returns a list of books based on a number of inputs
  * @param {String} title
  * @param {String} author
  * @param {number} pubDate
  * @return {Array} of books name or an empty array if no books exist
  */
  search(obj) {
    let found = [];
    console.log(obj.title);
    console.log(obj.author);
    if(obj.title) {
      found = found.concat(this.getBookByTitle(obj.title));
    }
    if(obj.author) {
      found = found.concat(this.getBooksByAuthor(obj.author));
    }
    console.log(found);
    return found.unique('title');
  }
  /**
  * @return {Array} of books in local storage
  */
  getStorage() {
    const arr = [];
    const parsedObj = JSON.parse(localStorage.getItem("myLibrary"));
    for (let i = 0; i < parsedObj.length; i++) {
      arr.push(new Book(parsedObj[i]));
    }
    return arr;
  }
  /**
  * Sets the local storage
  * @return {log} alert
  */
  setStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(window.bookShelf));
    return console.log("STORAGE HAS BEEN SET");
  }
  /**
  * Calls the setStorage method
  */
  init() {
    this.setStorage();
  }

  editStorage(index, editedBook) {
    window.bookShelf.splice(index, 1, editedBook);
    this.setStorage();
  }

  // updateStorage() {
  //   if (window.localStorage.length > 0) {
  //     console.log('BOOKSHELF EXISTS SETTING VALUE');
  //     window.bookShelf = this.getStorage();
  //     this.handleEventTrigger('objUpdate',window.bookShelf);
  //   } else {
  //     console.log('BOOKSHELF DOES NOT EXIST ADDING BOOKS!');
  //     this.addBooks(bookify(bookList));
  //     this.handleEventTrigger('objUpdate',window.bookShelf);
  //     this.setStorage();
  //   }
  // }
}

//arrow function shorthand for when DOM is ready, a new library is created and a local storage is set
$(() => {
  window.myLibrary = new Library();
  //window.bookShelf = window.bookList;
  window.myLibrary.init();
});
