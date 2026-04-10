class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
        this.isAvailable = true;
    }
    borrowBook(){
        if(this.isAvailable){
            this.isAvailable = false;
            return `Book "${this.title}" has been borrowed`;
        }
        else{
            return `Book "${this.title}" is not available`
        }
    }

    returnBook(){
        if(!this.isAvailable){
            this.isAvailable = true;
            return `Book "${this.title}" has been returned`;
        }
        else{
            return `Book "${this.title}" is already available`;
        }
    }

    getDetails(){
        return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.isbn}, Available: ${this.isAvailable}`;
    }
}

class Library{
    constructor(){
        this.books = [];
    }
    addBook(book){
        this.books.push(book);
        return `Book "${book.title}" has been added to the library`;
    }
    searchByAuthor(author){
        return this.books.find(book => book.author === author);
    }
    getAvailableBooks(){
        return this.books.filter(book => book.isAvailable);
    }
    borrowBook(isbn){
        const book = this.books.find(book => book.isbn === isbn);
        if(book){
            return book.borrowBook();
        }
        else{
            return `Book with ISBN ${isbn} not found`;
        }
    }
    returnBook(isbn){
        const book = this.books.find(book => book.isbn === isbn);
        if(book){
            return book.returnBook();
        }
        else{
            return `Book with ISBN ${isbn} not found`;
        }
    }
}


let lib = new Library();
let book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "978-0743273565");
let book2 = new Book("To Kill a Mockingbird", "Harper Lee", "978-0061120084");
let book3 = new Book("1984", "George Orwell", "978-0451524935");

lib.addBook(book1);
lib.addBook(book2);
lib.addBook(book3);

console.log(lib.getAvailableBooks());
console.log(lib.borrowBook("978-0743273565"));
console.log(lib.borrowBook("978-0743273565"));
console.log(lib.returnBook("978-0743273565"));
console.log(lib.returnBook("978-0743273565"));
console.log(lib.searchByAuthor("Harper Lee"));
console.log(lib.getAvailableBooks());