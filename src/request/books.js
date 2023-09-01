const ErrorRequest = require('../error/ErrorRequest');

function addBookRequest({
  name,
  year,
  author,
  summary,
  publisher,
  pageCount,
  readPage,
  reading,
}) {
  // required name
  if (!name) {
    throw new ErrorRequest('Gagal menambahkan buku. Mohon isi nama buku');
  }

  // readPage not be greather than pageCount
  if (readPage > pageCount) {
    throw new ErrorRequest(
      'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    );
  }

  const finished = readPage === pageCount;
  const now = new Date().toISOString();

  return {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt: now,
    updatedAt: now,
  };
}

function updateBookRequest({
  name,
  year,
  author,
  summary,
  publisher,
  pageCount,
  readPage,
  reading,
}) {
  // required name
  if (!name) {
    throw new ErrorRequest('Gagal memperbarui buku. Mohon isi nama buku');
  }

  // readPage not be greather than pageCount
  if (readPage > pageCount) {
    throw new ErrorRequest(
      'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    );
  }

  const finished = readPage === pageCount;
  const now = new Date().toISOString();

  return {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt: now,
    updatedAt: now,
  };
}

module.exports = { addBookRequest, updateBookRequest };
