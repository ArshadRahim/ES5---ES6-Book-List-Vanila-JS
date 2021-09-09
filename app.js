// BOOK CONSTRUCTOR //

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
  
}
// UI CONSTRUCTOR //

function UI() {
  
// Add BOok To  list
  UI.prototype.addBookToList = function (book) {
    // console.log(book)
    const list =  document.getElementById('book-list'); 
    // Create tr element
    const row = document.createElement('tr')
    //Insert colls
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row)
  }

  //Show Alert 
  UI.prototype.showAlert = function (message, className) {
    // create div
    const div  = document.createElement('div');
    // Add Classes 
    div.className = `alert ${className}`;
    // Add Text 
    div.appendChild(document.createTextNode(message));
    // Get Parent 
    const container = document.querySelector('.container');
    //Get Form
    const form = document.querySelector('#book-form');
    // insert alert before form
    container.insertBefore(div, form);

    //TImeout after 3 seconds
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000)
  };

  //Delete Book
  UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  //Clear Fields
  UI.prototype.clearFeilds = function () {
    document.getElementById('title').value = null;
    document.getElementById('author').value = null;
    document.getElementById('isbn').value = null;
  }
}

// EVENT LISTENERS //

document.getElementById('book-form').addEventListener('submit', function (event) {
  //Get Form Values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Instantiating a book

  const book = new Book(title, author, isbn);

    // Instantiate UI Object

    const ui = new UI()

    if (title === '' || author === '' || isbn === '') {
      ui.showAlert('Please Fill in all Fields !', 'error')
    }
    else {
    
    // Add books to list
  
    ui.addBookToList(book);

    //Show Success message

    ui.showAlert('Book Added !', 'success')
    //Clear Fields

    ui.clearFeilds();

    }

  event.preventDefault();
  
});
document.querySelector('#book-list').addEventListener('click', function (e) {

   // Instantiate UI Object

   const ui = new UI()

   ui.deleteBook(e.target);

   ui.showAlert('Deleted Successfully !', 'success')

  e.preventDefault()
})