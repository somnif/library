let myLibrary = [];

const bookPrototype = {
    info() {
        return this.title + " by " + this.author 
        // + ", " + this.pages + " pages. " + (this.read ? "Read." : "Not read yet.");
    },
    toggleRead() {
        this.read = !this.read;
    }
}

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

Object.assign(Book.prototype, bookPrototype)

const addBookToLibrary = (author, title, pages, read) => {
    const newBook = new Book(author, title, pages, read);
    myLibrary.push(newBook)
}

addBookToLibrary("J.R.R. Tolkien", "The Hobbit", "295", false);
addBookToLibrary("George Orwell", "1984", "328", false);
addBookToLibrary("Harper Lee", "To Kill a Mockingbird", "281", true);
addBookToLibrary("F. Scott Fitzgerald", "The Great Gatsby", "180", false);
addBookToLibrary("Jane Austen", "Pride and Prejudice", "279", true);
addBookToLibrary("Markus Zusak", "The Book Thief", "552", true);
addBookToLibrary("J.K. Rowling", "Harry Potter and the Sorcerer's Stone", "309", true);
addBookToLibrary("J.D. Salinger", "The Catcher in the Rye", "214", true);
addBookToLibrary("Herman Melville", "Moby-Dick", "635", false);
addBookToLibrary("Mary Shelley", "Frankenstein", "280", true);

const dialog = document.querySelector("dialog")
const bookCase = document.querySelector(".bookcase")
const titleInput = document.getElementById("title")
const authorInput = document.getElementById("author")
const pagesInput = document.getElementById("pages")
const readInput = document.getElementById("read")
const allInputs = document.querySelectorAll("input")
const cancelButton = document.getElementById("cancel")
const submitButton = document.getElementById("submit")
const libraryTitle = document.createElement("div")
const libraryTitleText = document.createTextNode("The Library")
libraryTitle.appendChild(libraryTitleText);

const closeDialog = () => {
    allInputs.forEach((input) => {
        input.value = "";
    })
    if (readInput.checked) {
        readInput.click()
    }
    dialog.close();
}

cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    closeDialog()
})

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!titleInput.value || !authorInput.value || !pagesInput.value) {
        alert("Please enter a title, author, and number of pages.")
    } else {
        addBookToLibrary(authorInput.value, titleInput.value, pagesInput.value, read.checked)
        closeDialog();
        draw()
    }
})





const draw = () => {
    bookCase.innerHTML = "";
    bookCase.appendChild(libraryTitle);

    //add each book to a shelf
    myLibrary.forEach((book) => {
        const bookshelf = document.createElement("div")
        const deleteButton = document.createElement("div")
        const readButton = document.createElement("div")
        const bookContainer = document.createElement("div")
        const text = document.createTextNode(book.info())

        bookshelf.classList.add("bookshelf")
        readButton.classList.add("read-button")
        readButton.classList.add(book.read ? "book-read" : "book-unread")
        readButton.addEventListener("click", () => {
            toggleRead(book)
        })


        deleteButton.classList.add("delete-button")
        deleteButton.addEventListener("click", () => {
            deleteBook(myLibrary.indexOf(book))
        })

        // bookContainer.setAttribute("data-index", + )
        bookContainer.appendChild(text)
        bookshelf.appendChild(bookContainer)
        bookshelf.appendChild(deleteButton)
        bookshelf.appendChild(readButton)
        bookCase.appendChild(bookshelf);
    })

    //create the add button
    const buttonContainer = document.createElement("div")
    const button = document.createElement("button")
    const buttonText = document.createTextNode("Add New")
    buttonContainer.classList.add("bookshelf")
    button.appendChild(buttonText)
    buttonContainer.appendChild(button)
    bookCase.appendChild(buttonContainer)
    button.addEventListener("click", () => dialog.showModal())

    //add remaining empty shelves
    // const numberOfShelves = myLibrary.length + 1;
    // for(let i = remianderOfShelves; i < 3; i++) {
    //         const bookshelf = document.createElement("div")
    //         bookshelf.classList.add("bookshelf")
    //         bookCase.appendChild(bookshelf);
    // }

    const numberOfShelves = 14 - myLibrary.length;
    for (let i = 0; i < numberOfShelves; i++) {
        const bookshelf = document.createElement("div")
        bookshelf.classList.add("bookshelf")
        bookCase.appendChild(bookshelf)
    }
}


const deleteBook = (bookIndex) => {
    console.log(bookIndex);

    myLibrary.splice(bookIndex, 1);
    draw();
}

const toggleRead = (book) => {
    book.toggleRead()
    draw()
}

draw();


//fix adding of extra shelves for when number is <9
//font of bookcases
//format dialog inputs, and make custom checkbox
//format add button to look sexier
//add icons to the 




