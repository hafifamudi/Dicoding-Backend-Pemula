const {  
    addBookHandler, 
    getAllBooks,
    getBooksById,
    updateBooks,
    deleteBook, 
} = require('./handler.js');

const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks,
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBooksById,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBooks,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBook,
    },
];

module.exports = routes;
