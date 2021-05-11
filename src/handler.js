const { nanoid } = require('nanoid');
let books = require('./books');

const getAllBooks = (request, h) => {
  const { name, finished, reading } = request.query;

  if (name) {
    const getBookByName = books.filter((book) => book.name.includes(name.slice(1, -1)));

    const result = getBookByName.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    
    const response = h.response({
      status:'success',
      data: {
        books: result,
      },
    });
    response.code(200);
    return response;
  }

  if (finished){
    let getBookByFinished = [];
  
    if (finished === 1) {
      getBookByFinished = books.map((book) => {
        if (book.finished){
          return book;
        }
      });
    }
    
    if (finished === 0) {
      getBookByFinished = books.map((book) => {
      if (!book.finished){
        return book
      }
      });
    }

    if (getBookByFinished.length > 0) {  
      const result = getBookByFinished.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));

      const response = h.response({
        status:'success',
        data: {
        books: result,
      },
      });
      response.code(200);
      return response;
    }
}

  if (reading){
    let getBookByReading = [];

    if (reading === 1) {
      getBookByReading = books.map((book) => {
        if (book.reading){
          return book
        }
      });
    }
    
    if (reading === 0) {
      getBookByReading = books.map((book) => {
        if (!book.reading){
          return book
        }
      });
    }
    
    if (getBookByReading.length > 0) {
      const result = getBookByReading.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
  
      const response = h.response({
        status:'success',
        data: {
          books: result,
        },
      });
      response.code(200);
      return response;
    }    
  }

  const book = books.map(e => ({
    id: e.id,
    name: e.name,
    publisher: e.publisher,
  }));

  const response = h.response({
    status:'success',
    data: {
      books: book,
    },
  });
  response.code(200);
  return response;
};

const addBookHandler = (request, h) => {
  let valid = true;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  if (name === undefined) {
    valid = false;
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    valid = false;
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (valid){
    books = books.concat(newBooks);
  }

  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getBooksById = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((book) => book.id === bookId)[0];

  if (book !== undefined){
    return{
      status: 'success',
      data:{
        book,
      } ,
    };
  }
  const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response
};

const updateBooks = (request, h) => {
  const { bookId } = request.params;
  const { 
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);

  if (name === undefined) {
    valid = false;
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    valid = false;
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBook = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);
  
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  
}
module.exports = { 
    addBookHandler, 
    getAllBooks,
    getBooksById,
    updateBooks,
    deleteBook,
};
