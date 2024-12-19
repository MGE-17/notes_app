import "./CreateNotes.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import "./CreateNotes.scss";

function CreateNote({ setNotes }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const date = useCreateDate();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && description) {
      const newNote = { title, description, date };

      try {
        const response = await fetch("http://localhost:8686/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        });

        if (response.ok) {
          fetch("http://localhost:8686/notes")
            .then((response) => response.json())
            .then((data) => setNotes(data))
            .catch((error) => console.error("Error fetching notes:", error));

          navigate("/");
        } else {
          console.error("Failed to save note");
        }
      } catch (error) {
        console.error("Error submitting note:", error);
      }
    }
  };

  return (
    <section>
      <header className="create-note__header">
        <Link to="/" className="btn">
          <IoIosArrowBack />
        </Link>
        <button className="btn lg primary" onClick={handleSubmit}>
          Save
        </button>
      </header>
      <form className="create-note__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          rows="28"
          placeholder="Note Description ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </form>
    </section>
  );
}

export default CreateNote;
