var Books = [
    {imgsrc:'http://i50.fastpic.ru/big/2013/0807/1b/630da07f8d40d457146c9fb41c72a91b.jpg', title:'Тропы по большому сертану', author:'Жуан Гимарайнс Роза', year:'1956'},
    {imgsrc:'https://cv1.litres.ru/static/bookimages/09/23/36/09233613.bin.dir/09233613.cover_330.jpg', title:'Сто лет одиночества', author:'Габриэль Гарсиа Маркес', year:'1967'},
    {imgsrc:'http://royallib.com/data/images/33/cover_33332.jpg', title:'Старик и море', author:'Эрнест Хемингуэй', year:'1952'},
    {imgsrc:'http://ozon-st.cdn.ngenix.net/multimedia/1004090865.jpg', title:'Пеппи Длинныйчулок', author:'Астрид Линдгрен', year:'1945'},
    {imgsrc:'https://www.e-reading.club/cover/1000/1000444.jpg', title:'Шум и ярость', author:'	Уильям Фолкнер', year:'1929'},
  ];
  
window.onload = function() {
  
  document.bookform.onsubmit=function() {
    var book={};
    for(var i=0;i<document.bookform.length-2;i++){
      book[document.bookform.elements[i].name]=document.bookform.elements[i].value;
      console.log(document.bookform.elements[i].name,document.bookform.elements[i].value);
    }
    
    if(book['id']==''){
      var index = document.getElementsByClassName('book').length;
      create_book(book.title,book.author,book.year,book.imgsrc,index);
    }else{
      document.getElementById('title'+book['id']).innerHTML = book.title;
      document.getElementById('author'+book['id']).innerHTML = book.author;
      document.getElementById('year'+book['id']).innerHTML = book.year;
      //document.getElementById('img'+book['id']).src = book.imgsrc;
    }
    cancel_book.click();
    
    return false;
  }
  
  var add_book = document.getElementById('add_book');
  add_book.onclick=function(){
    if(document.getElementById('id').getAttribute('value')==''){
      document.getElementById('status').innerHTML='Создание записи книги';
    }else{
      document.getElementById('status').innerHTML='Редактирование записи книги';
    }
    document.getElementById('bookshelf').style.display='none';
    document.getElementById('form').style.display='';
  }
  var cancel_book = document.getElementById('cancel_book');
  cancel_book.onclick=function(){
    document.getElementById('bookshelf').style.display='';
    document.getElementById('form').style.display='none';
    for(var i=0;i<document.bookform.length-2;i++){
      document.bookform.elements[i].setAttribute('value','');
    }
  }
  function delete_book(index){
     document.getElementById(index).delete();
  }
  document.getElementsByClassName('.book').length;
  function create_book(title_val,author_val,year_val,imgsrc_val,index){
    
    var book = document.createElement('div');
    book.className = "book";
    book.id = index;
    
    var cover = document.createElement('div');
    cover.className = "book-cover";
    
    var img = document.createElement('img');
    //var imgsrc_val = "https://www.google.ru/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png";
    img.setAttribute('src',imgsrc_val);
    img.setAttribute('alt','Обложка№'+index);
    img.setAttribute('id','img'+index);
    
    var helper = document.createElement('span');//псевдокласс не работает, dummy-element
    helper.className = "book-helper";
    cover.appendChild(helper);
    cover.appendChild(img);
    
    var data = document.createElement('div');
    data.className = "book-data";
    //data.innerHTML = 'sdfsdf';
    var ul = document.createElement('ul');
    ul.className = 'book-summary';
    
    var title = document.createElement('li');
    title.innerHTML = title_val;
    title.id = 'title'+index;
    ul.appendChild(title);
    var author = document.createElement('li');
    author.innerHTML = author_val;
    author.id = 'author'+index;
    ul.appendChild(author);
    var year = document.createElement('li');
    year.innerHTML = year_val;
    year.id = 'year'+index;
    ul.appendChild(year);
    
    data.appendChild(ul);
    
    var actions = document.createElement('div');
    actions.className = "book-actions";
    
    var b_edit = document.createElement('button');
    b_edit.className = "book-button book-button-edit book-button-action";
    b_edit.innerHTML = 'Редактировать';
    b_edit.onclick = function(){
      document.getElementById('id').setAttribute('value',index);
      document.getElementById('title').setAttribute('value',document.getElementById('title'+index).innerHTML);
      document.getElementById('author').setAttribute('value',document.getElementById('author'+index).innerHTML);
      document.getElementById('year').setAttribute('value',document.getElementById('year'+index).innerHTML);
      document.getElementById('imgsrc').setAttribute('value',document.getElementById('img'+index).src);
      add_book.click();
    }
    actions.appendChild(b_edit);
    
    
    var b_delete = document.createElement('button');
    b_delete.className = "book-button book-button-delete book-button-action";
    b_delete.innerHTML = 'Удалить';
    b_delete.onclick = function(){
      document.getElementById(index).remove(this);
    }
    actions.appendChild(b_delete);
    
    book.appendChild(cover);
    book.appendChild(data);
    book.appendChild(actions);
    
    bookshelf.appendChild(book);
  }
  
  var bookshelf = document.getElementById('bookshelf');
  
  for (var i = 0; i < Books.length; i++){
    create_book(Books[i].title,Books[i].author,Books[i].year,Books[i].imgsrc,i);
  }
}




