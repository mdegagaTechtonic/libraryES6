/*Constructor for Book class - no methods yet*/
/**
*The constructor creates an instance with the following properties
*@class Creates a book object that can be edited
*@param {Object} oArgs containing book information
*@return {Book}
*/
class Book {
  constructor(oArgs) {
    //these all need to be private, must create getters and setters
    // this.cover = oArgs.cover;
    // this.title = oArgs.title; //Required
    // this.author = oArgs.author; //Required
    // this.synopsis = oArgs.synopsis;
    // this.numberOfPages = oArgs.numberOfPages //Required
    // this.publishDate = formatDate(new Date(String(oArgs.publishDate))); //required
    // this.rating = oArgs.rating;
    // return this;
    this._cover = oArgs.cover || oArgs._cover;
    this._title = oArgs.title ||  oArgs._title; //Required
    this._author = oArgs.author || oArgs._author; //Required
    this._synopsis = oArgs.synopsis || oArgs._synopsis;
    this._numberOfPages = oArgs.numberOfPages || oArgs._numberOfPages //Required
    if(oArgs._publishDate) {
      this._publishDate = formatDate(new Date(String(oArgs._publishDate)))
    }
    else {
      this._publishDate = formatDate(new Date(String(oArgs.publishDate)))
    }
    this._rating = oArgs.rating || oArgs._rating;
    return this; //is this needed?
  }

  get cover () {
    return this._cover;
  }
  get title () {
    return this._title;
  }
  get author () {
    return this._author;
  }
  get synopsis () {
    return this._synopsis;
  }
  get numberOfPages () {
    return this._numberOfPages;
  }
  get publishDate () {
    return this._publishDate;
  }
  get rating () {
    return this._rating;
  }
  set cover (cover) {
    this._cover = cover;
  }
  set title (title) {
    this._title = title;
  }
  set author (author) {
    this._author = author;
  }
  set synopsis (synopsis) {
    this._synopsis = synopsis;
  }
  set numberOfPages (pages) {
    this._numberOfPages = pages;
  }
  set publishDate (date) {
    this._date = date;
  }
  set rating (rating) {
    this._rating = rating;
  }



  /**
  * Takes an object that can have some or all of the fields {title,author,numPages} and edits the book using these fields
  * @private
  * @param {Object} book
  * @return {Book} the edited book object
  */
  _editBook(oBook) {
    //since this will become private fields, must use getters and setters
  //   //make sure the info is unique too
  //   //get the properities in the oBook
  //   var oBookProperties = oBook.entries();
  //   for(var i = 0; i < oBookProperties.length; i++) {
  //     if(this.indexOf(oBookProperties[i]) !== -1) {
  //       oBookProperties[i] = undefined;
  //     }
  //   }
  //
  //   this.title = oBook.title || this.title;
  //
  //   this.author = oBook.author || this.author;
  //
  //   this.numPages = oBook.numPages || this.numPages;
  //
  //   this.rating = oBook.rating || this.rating;
  //
  //   this.synopsis = oBook.synopsis || this.synopsis;
  //
  //   this.cover = oBook.cover || this.cover;
  //
  //   return this;
  }
}
