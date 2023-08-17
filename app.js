// Variables
const addBookButton = document.querySelector('#addBook')
const modal = document.querySelector('.modal')
const closeBtn = document.querySelector('#cancel')
const submitBook = document.querySelector('#submitBook')
let myLibrary = []

// functions

function Book() {
    this.title = undefined
    this.author = undefined
    this.genre = undefined
    this.pages = 0
    this.readStatus = false
}

function addBookToLibrary() {
    const newBook = new Book()
    args = [...arguments]

    newBook.title = args[0]
    newBook.author = args[1]
    newBook.genre = args[2]
    newBook.pages = args[3]
    newBook.readStatus = args[4]

    myLibrary.push( newBook )
    libToCard()
}

function createCard(title, author, genre, pages, readStatus, index) {
    // Getting the elements
    const card_container = document.querySelector('.card_container')
    const card = document.createElement('div')
    const card_title = document.createElement('p')
    const card_author = document.createElement('p')
    const card_genre = document.createElement('p')
    const card_pages = document.createElement('p')
    const card_status = document.createElement('button')
    const card_delete = document.createElement('button')
    // Setting Class names for css

    card.className = 'card'
    card.dataset.index = index
    card_title.className = 'card_element card_title'
    card_author.className = 'card_element card_author'
    card_genre.className = 'card_element card_genre'
    card_pages.className = 'card_element card_pages'
    card_status.className = 'card_element card_status'
    card_delete.className = 'card_element card_delete'

    // Setting corret innerText for each element

    card_title.innerHTML = `Title:<span>${title}</span>`
    card_author.innerHTML = `Author: <span>${author}</span>`
    card_genre.innerHTML = `Genre: <span>${genre}</span>`
    card_pages.innerHTML = `Pages: <span>${pages}</span>`
    card_status.innerHTML = readStatus ? "read" : "not read"
    card_delete.innerHTML = 'remove'



    // Appending everything correctly
    card.appendChild(card_title)
    card.appendChild(card_author)
    card.appendChild(card_genre)
    card.appendChild(card_pages)
    card.appendChild(card_status)
    card.appendChild(card_delete)
    card_container.appendChild(card)
}

function libToCard() {
    
    // cycle library and create Card
    for (i=0; i< myLibrary.length; i++) {
        var bookcard = document.querySelectorAll(`[data-index="${i}"]`)
        if (bookcard[0] === undefined) {
            var tempBook = myLibrary[i]
            createCard(tempBook.title, tempBook.author, tempBook.genre, tempBook.pages, tempBook.readStatus,i)
        }
    }
    EventHandlers()
}

function sortIndexes() {
    const bookcards = document.querySelectorAll('[data-index]')
    let count = 0
    bookcards.forEach((bookcard) => {
        bookcard.dataset.index = count
        count++
    })
}

function getFormData() {
    const book_title = document.querySelectorAll('[name="book_title"]')[0].value
    const book_author = document.querySelectorAll('[name="book_author"]')[0].value
    const book_genre = document.querySelectorAll('[name="book_genre"]')[0].value
    const book_pages = document.querySelectorAll('[name="book_pages"]')[0].value
    const book_readStatus = document.querySelectorAll('[name="selectbox_read"]')[0].value

    return [book_title, book_author, book_genre.split(','), book_pages, book_readStatus]
    
}

function clearFormData() {
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input) => {
        input.value = ''
    })
}

function EventHandlers() {
    const readButtons = document.querySelectorAll('.card_status')
    const removeButtons = document.querySelectorAll('.card_delete')

    // Toggle read status
    readButtons.forEach((readButton) => {
        readButton.addEventListener('click', (event) => {
            const bookId = event.target.parentNode.dataset.index
            if (myLibrary[bookId]['readStatus']) {
                myLibrary[bookId]['readStatus'] = false
                event.target.innerHTML = 'not read'
            } else {
                myLibrary[bookId]['readStatus'] = true
                event.target.innerHTML = 'read'
            }
        })
    })


    // remove book from library and Screen
    removeButtons.forEach((removeButton) => {
        removeButton.onclick = function () {
            const bookIndex = removeButton.parentNode.dataset.index
            removeButton.parentNode.remove()
            myLibrary.splice(bookIndex, 1)
            sortIndexes()
        }
    })
}

// Open close form modal

addBookButton.addEventListener('click', () => {
    modal.style.display = "block"
})

closeBtn.onclick = function() {
    modal.style.display = "none"
}
  
// Submit Book button

submitBook.onclick = function() {
    const formData = getFormData()
    addBookToLibrary(formData[0], formData[1], formData[2], formData[3], formData[4])
    clearFormData()
    modal.style.display = "none"
}