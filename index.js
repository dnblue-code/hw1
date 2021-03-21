class Book extends HTMLElement {
    constructor(data,container){
        super();
        try{
            this.name=data.name;
            this.author=data.author;
            this.image_url=data.image_url;
            this.description=data.description;
            this.container=container;
            this.type=data.type;
            this.Show();
        }
        catch{

        }

    }    
    Show(){
        this.container.innerHTML=``;
        this.className="book";
        this.container.appendChild(this);

        
        var innerHTML=`
            <div class="book-image" style="background-image: url('${this.image_url}');">

            </div>
            <div class="book-info-container"  style="background-image: url('${this.image_url}');">
                <div class="book-info-container-dark">
                    <div class="book-name">
                        ${this.name}
                    </div>
                    <div class="hr-2"></div>
                    <div class="book-info">
                        Author: ${this.author}
                    </div>
                    <div class="hr-2"></div>
                    <div class="book-description">
                        ${this.description}
                    </div>
                </div>
            </div>
        `;
        if(this.type=="create"){
            
            innerHTML=`
                <div class="book-image" style="background-image: url('https://gtelocalize.com/wp-content/uploads/2020/05/Essential-Books.jpg');">

                </div>
                <div class="book-info-container"  style="background-image: url('https://gtelocalize.com/wp-content/uploads/2020/05/Essential-Books.jpg');">
                    <div class="book-info-container-dark">
                        <div class="book-name">
                            ${this.name}
                            <input type="text" id="name-input">
                        </div>
                        <div class="hr-2"></div>
                        <div class="book-info">
                            Author: ${this.author}
                            <input type="text" id="author-input">
                        </div>
                        <div class="hr-2"></div>
                        <div class="book-description">
                            ${this.description}
                            <textarea  type="text" id="description-input"></textarea>
                        </div>
                        <div class="hr-2"></div>
                        <div class="book-info">
                            Image URL: <input type="text" id="image-url-input">
                        </div>
                        <div class="book-name">
                            <button id="create-book-btn" onclick="bookManager.CreateCurrentBook();">Create</button>
                        </div>
                    </div>
                </div>
            `;
        }

        this.innerHTML=innerHTML;

    }
}

customElements.define('my-book', Book);


var books=[
    {
        name:"A Brief History Of Time",
        author:"Stephen Hawing",
        image_url:"https://cdn2.penguin.com.au/covers/original/9780593056974.jpg",
        description:`Stephen Hawking's worldwide bestseller, A Brief History of Time, has been a landmark volume in scientific writing. Its author's engaging voice is one reason, and the compelling subjects he addresses is another: the nature of space and time, the role of God in creation, the history and future of the universe. But it is also true that in the years since its publication, readers have repeatedly told Professor Hawking of their great difficulty in understanding some of the book's most important concepts.`
    }
];

class BookManager{
    constructor(data){
        this.Book=Book;
        this.books=data.books;
        this.container=document.getElementById("books_container");
        this.current_index=0;
        
        this.AddEvents();
    }

    CreateCurrentBook(){
        console.log(this.current_book);
        var name=document.getElementById("name-input").value;
        var author=document.getElementById("author-input").value;
        var description=document.getElementById("description-input").value;
        var image_url=document.getElementById("image-url-input").value;
        var bookData={
            name:name,
            author:author,
            description:description,
            image_url:image_url
        }
        this.Add(bookData);
        this.Load(this.books.length-1);
    }

    AddEvents(){
        var book_manager=this;
        this.prev_btn=document.getElementById("prev-btn");
        this.next_btn=document.getElementById("next-btn");
        this.create_btn=document.getElementById("create-btn");
        this.prev_btn.addEventListener("click",()=>book_manager.Prev());
        this.next_btn.addEventListener("click",()=>book_manager.Next());
        this.create_btn.addEventListener("click",()=>book_manager.CreateBookPage());
    }

    Load(index){
        this.current_index=index;
        var book = new Book(this.books[index],this.container);
        this.current_book=book;
    }
    
    Add(book){
        this.books.push(book);
    }

    Create(){

    }

    Next(){
        this.current_index=this.current_index+1;
        if(this.current_index<0)
            this.current_index=0;
        this.Load(this.current_index);
    }

    Prev(){
        this.current_index=this.current_index-1;
        if(this.current_index>this.books.length-1)
            this.current_index=this.books.length-1;
        this.Load(this.current_index);

    }

    CreateBookPage(){
        var book = new Book({
            name:"",
            author:"",
            image_url:"",
            description:``,
            type:"create"
        },this.container);
    }

}

var bookManager=new BookManager({
    books:books
});

bookManager.Load(0);

