import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditNotes() {
  const { id } = useParams();
  const noteId = String(id);
  const [note, setNote] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8686/notes/${noteId}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setNote(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching note:", error);
        setLoading(false);
      });
  }, [noteId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSave = () => {
    fetch(`http://localhost:8686/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log("Note updated:", data);
        navigate("/");
      })
      .catch((error) => console.error("Error saving note:", error));
  };

  const handleDelete = () => {
    fetch(`http://localhost:8686/notes/${noteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        console.log("Note deleted");
        // Reload the page and redirect to the main page
        navigate("/");
        window.location.reload();
      })
      .catch((error) => console.error("Error deleting note:", error));
  };

  if (loading) return <div>Loading...</div>;
  if (!note) return <div>Note not found</div>;

  return (
    <section>
      <header className="create-note__header">
        <Link to="/" className="btn">
          <IoIosArrowBack />
        </Link>
        <button className="btn lg primary" onClick={handleSave}>
          Save
        </button>
        <button className="btn danger" onClick={handleDelete}>
          <RiDeleteBin6Line />
        </button>
      </header>
      <form className="create-note__form">
        <input
          type="text"
          placeholder="Enter title here..."
          name="title"
          value={note.title}
          onChange={handleChange}
          autoFocus
        />
        <textarea
          rows="28"
          placeholder="Note Description ..."
          name="description"
          value={note.description}
          onChange={handleChange}
        ></textarea>
      </form>
    </section>
  );
}

export default EditNotes;
