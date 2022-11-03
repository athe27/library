let myLibrary = [];
const bookDescription = document.querySelector(".description")
let formDisplayed = false
const submitButton = document.querySelector("#submit-button")
const form = document.querySelector("form")
const addBookButton = document.querySelector(".add-book")
submitButton.addEventListener("click", function(event) {
    event.preventDefault()
    if (form.title.value === "" || form.author.value === "" || form.pages.value < 1) {
        return
    }

    const book = new Book(form.title.value, form.author.value, form.pages.value, form.read.checked)
    addBookToLibrary(book)
    displayBooks()
    formDisplayed = false
    //form.style.display = "none"
    //form.reset()
})

addBookButton.addEventListener("click", (event) => {
    if (formDisplayed) {
        formDisplayed = false
        form.style.display = "none"
    } else {
        formDisplayed = true
        form.style.display = "block"
    }
})

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.color = generateRandomColor()
}

function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function displayBooks() {
    let row = 0;
    const shelves = document.querySelector(".container").children;
    for (let i = 0; i < shelves.length; i++) {
        shelves[i].innerHTML = ""
    }
    for (let i = 0; i < myLibrary.length; i++) {
        if (i > 0 && i % 20 == 0) {
            row++
        }
        const book = document.createElement("div")
        book.dataset.index = i
        book.classList.add("book")
        book.style.backgroundColor = myLibrary[i].color
        book.addEventListener("mouseover", (event) => {
            bookDescription.style.display = "block";
            let offsets  = book.getBoundingClientRect();
            let x = offsets.left
            let y = offsets.top + 100
            bookDescription.style["z-index"] = "2"
            bookDescription.style.left = `${x}px`
            bookDescription.style.top = `${y}px`
            const descriptionElements = bookDescription.children
            descriptionElements.item(0).innerHTML = "Title: " + myLibrary[i].title
            descriptionElements.item(1).innerHTML = "Author: " + myLibrary[i].author
            descriptionElements.item(2).innerHTML = "Pages: " + myLibrary[i].pages
            descriptionElements.item(3).innerHTML = "Read: " + myLibrary[i].read
        })
        book.addEventListener("mouseout", (event) => {
            bookDescription.style.display = "none";
        })
        book.addEventListener("click", (event) => {
            myLibrary.splice(i, 1)
            bookDescription.style.display = "none";
            displayBooks()
        })
        shelves.item(row).appendChild(book)
    }
}

displayBooks()

