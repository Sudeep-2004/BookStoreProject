import React, { useState, useEffect } from "react";
import { handleError, handleSuccess } from "../utils";

const API_BASE = "https://bookstoreproject-imm7.onrender.com/api/books";

const BookStore = ({ uploadMode = false }) => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", year: "" });
  const [editId, setEditId] = useState(null);
  const [formError, setFormError] = useState("");

  const token = localStorage.getItem("token");

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_BASE}/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setBooks(data.data || []);
    } catch (err) {
      handleError(err.message || "Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.title || !form.author || !form.year) {
      setFormError("All fields are required");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleAdd = async () => {
    if (!validateForm()) return;

    try {
      await fetch(`${API_BASE}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      setForm({ title: "", author: "", year: "" });
      fetchBooks();
      handleSuccess("Book added successfully");
    } catch (err) {
      handleError("Failed to add book");
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      await fetch(`${API_BASE}/update/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      setEditId(null);
      setForm({ title: "", author: "", year: "" });
      fetchBooks();
      handleSuccess("Book updated successfully");
    } catch (err) {
      handleError("Failed to update book");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setForm({ title: "", author: "", year: "" });
      fetchBooks();
      handleSuccess("Book deleted successfully");
    } catch (err) {
      handleError("Failed to delete book");
    }
  };

  const startEdit = (book) => {
    setForm({ title: book.title, author: book.author, year: book.year });
    setEditId(book._id);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {uploadMode ? "Upload Book" : "Bookstore Manager"}
      </h2>

      {/* Form */}
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Book Title"
        className="mb-3 p-2 border rounded w-full"
      />
      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Author"
        className="mb-3 p-2 border rounded w-full"
      />
      <input
        name="year"
        type="number"
        value={form.year}
        onChange={handleChange}
        placeholder="Publication Year"
        className="mb-3 p-2 border rounded w-full"
      />

      {formError && (
        <p className="text-red-500 text-sm mb-3">{formError}</p>
      )}

      <button
        onClick={editId ? handleUpdate : handleAdd}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
      >
        {editId ? "Update Book" : "Add Book"}
      </button>

      {/* Display books */}
      <h3 className="text-xl font-medium mt-8 mb-4">
        {uploadMode ? "Recently Uploaded Books:" : "Available Books:"}
      </h3>

      {books.map((book) => (
        <div key={book._id} className="border p-4 mb-4 rounded shadow-sm">
          <p>
            <span className="font-semibold">Title:</span> {book.title}
          </p>
          <p>
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p>
            <span className="font-semibold">Year:</span> {book.year}
          </p>

          {!uploadMode && (
            <div className="mt-2">
              <button
                onClick={() => startEdit(book)}
                className="bg-yellow-500 text-white py-1 px-3 rounded mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookStore;
