let myLibrary = [1, 2, 3];
const bookDescription = document.querySelector(".description")

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
        book.addEventListener("mouseover", (event) => {
            bookDescription.style.display = "block";
            let offsets  = book.getBoundingClientRect();
            let x = offsets.left
            let y = offsets.top + 100
            bookDescription.style["z-index"] = "2"
            bookDescription.style.left = `${x}px`
            bookDescription.style.top = `${y}px`
        })
        book.addEventListener("mouseout", (event) => {
            bookDescription.style.display = "none";
        })
        shelves.item(row).appendChild(book)
    }
}

displayBooks()

