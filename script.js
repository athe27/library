let myLibrary = [1, 2, 3];

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
    for (let i = 0; i < myLibrary.length; i++) {
        if (i > 0 && i % 20 == 0) {
            row++
        }
        const book = document.createElement("div")
        book.classList.add("book")
        book.style.backgroundColor = generateRandomColor()
        shelves.item(row).appendChild(book)
    }
}

displayBooks()