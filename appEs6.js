class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author; 
    this.isbn = isbn;
  }
}
class UI {
  addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML =  `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td> <a href ="#" class="delete-btn"> X </a> </td>
    `
    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement('div');

    div.className = `alert ${className}`;
    div.append(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector('.alert').remove()
    }, 2000);

  }
  deleteBook(target) {
    if (target.className === 'delete-btn') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFeilds(e) {
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