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
    this.cover = oArgs.cover;
    this.title = oArgs.title; //Required
    this.author = oArgs.author; //Required
    this.synopsis = oArgs.synopsis;
    this.numberOfPages = oArgs.numberOfPages; //Required
    //this.publishDate = new Date(String(oArgs.publishDate)).getUTCFullYear(); //Required
    this.publishDate = formatDate(new Date(String(oArgs.publishDate))); //required
    this.rating = oArgs.rating;
    return this; //is this needed?
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
