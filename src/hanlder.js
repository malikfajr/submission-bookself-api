/* eslint-disable function-paren-newline */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */

const { nanoid } = require('nanoid');
const books = require('./books');
const { success, failed } = require('./helper/responseFormat');
const { addBookRequest, updateBookRequest } = require('./request/books');
const ErrorRequest = require('./error/ErrorRequest');

/**
 * Store data into database
 */
function addBookHandler(request, h) {
  try {
    const body = request.payload;

    const book = addBookRequest(body);
    book.id = nanoid(16);

    books.push(book);
    return success(
      h,
      {
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: book.id,
        },
      },
      201
    );
  } catch (error) {
    if (error instanceof ErrorRequest) {
      return failed(h, error.message, error.code);
    }

    return failed(h, 'Buku gagal ditambahkan', 500);
  }
}

/**
 * Get all books
 */
function getAllBookHandler(request, h) {
  const { name, reading, finished } = request.query;

  let query = books;

  if (reading !== undefined) {
    const filter = parseInt(reading, 10);
    query = query.filter((book) => book.reading === Boolean(filter));
  }

  if (finished !== undefined) {
    const filter = parseInt(finished, 10);
    query = query.filter((book) => book.finished === Boolean(filter));
  }

  if (name !== undefined) {
    query = query.filter((book) => {
      const search = new RegExp(name.toLowerCase(), 'gi');
      return search.test(book.name.toLowerCase());
    });
  }

  return success(h, {
    data: {
      books: query.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
}

/**
 * Get specific book
 */
function getBookByIdHanlder(request, h) {
  const { bookId } = request.params;

  const book = books.filter((item) => item.id === bookId)[0];

  if (!book) {
    // jika tidak ditemukan
    return failed(h, 'Buku tidak ditemukan', 404);
  }

  return success(h, {
    data: { book },
  });
}

/**
 * Update specific book
 */
function updateBookHandler(request, h) {
  try {
    const { bookId } = request.params;

    // validation book id
    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex < 0) {
      throw new ErrorRequest('Gagal memperbarui buku. Id tidak ditemukan', 404);
    }

    // validation body
    const book = updateBookRequest(request.payload);

    // replace data sesuai index
    books[bookIndex] = {
      ...books[bookIndex],
      ...book,
    };
    return success(h, { message: 'Buku berhasil diperbarui' });
  } catch (error) {
    if (error instanceof ErrorRequest) {
      return failed(h, error.message, error.code);
    }
    return failed(h, 'Gagal memperbarui buku.', 500);
  }
}

/**
 * Delete specific book
 */
function deleteBookHandler(request, h) {
  const { bookId } = request.params;

  // validation book id
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex < 0) {
    return failed(h, 'Buku gagal dihapus. Id tidak ditemukan', 404);
  }

  books.splice(bookId, 1);
  return success(h, { message: 'Buku berhasil dihapus' });
}

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHanlder,
  updateBookHandler,
  deleteBookHandler,
};
