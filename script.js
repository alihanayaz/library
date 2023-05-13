/* popup */
const popupButton = document.getElementById('popup-button');
const popup = document.getElementById('popup');

class Popup {
  constructor() {
    popupButton.addEventListener('click', () => {
      popup.classList.add('popup-active');
    });

    popup.addEventListener('click', (event) => {
      if (event.target === popup) {
        popup.classList.remove('popup-active');
      }
    });
  }
}

/* library */
let myLibrary = [];

class Book {
  constructor(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

/* add book */
function addBookToLibrary(book) {
  myLibrary.push(book);
}

/* display */
function display() {
  const container = document.querySelector('.container');
  container.textContent = '';
  myLibrary.map((book) => {
    const div = document.createElement('div');
    div.classList.add('book');
    const name = document.createElement('h2');
    name.textContent = book.name;
    const author = document.createElement('p');
    author.textContent = book.author;
    const pages = document.createElement('p');
    pages.textContent = book.pages;
    const read = document.createElement('p');
    if (book.read === 'true') {
      read.textContent = 'Read ✔️';
    } else {
      read.textContent = 'Not Read ❌';
    }
    const remove = document.createElement('button');
    remove.textContent = 'Remove';
    remove.classList.add('button', 'small-button');
    remove.addEventListener('click', () => {
      myLibrary.splice(myLibrary.indexOf(book), 1);
      display();
    });
    const editReadStatus = document.createElement('button');
    editReadStatus.textContent = 'Edit';
    editReadStatus.classList.add('button', 'small-button');
    editReadStatus.addEventListener('click', () => {
      if (book.read === 'true') {
        book.read = 'false';
      } else {
        book.read = 'true';
      }
      display();
    });
    div.appendChild(name);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(read);
    div.appendChild(remove);
    div.appendChild(editReadStatus);
    container.appendChild(div);
  });
}

class Form {
  constructor() {
    const form = document.getElementById('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.getData();
    });
  }

  getData() {
    const form = document.getElementById('form');
    const formData = {};
    const radioGroups = {};
    for (let i = 0; i < form.elements.length; i++) {
      const input = form.elements[i];
      if (input.type === 'radio') {
        if (input.checked) {
          formData[input.name] = input.value;
          radioGroups[input.name] = true;
        } else {
          radioGroups[input.name] = radioGroups[input.name] || false;
        }
      } else if (input.value !== '') {
        formData[input.name] = input.value;
      } else if (input.required) {
        return;
      }
    }
    for (const group in radioGroups) {
      if (radioGroups[group] === false) {
        return;
      }
    }
    const newBook = new Book(
      formData.name,
      formData.author,
      formData.pages,
      formData.read
    );
    addBookToLibrary(newBook);
    display();
    popup.classList.remove('popup-active');
  }
}

const popupInstance = new Popup();
const formInstance = new Form();
