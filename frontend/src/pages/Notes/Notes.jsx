import "./Notes.scss";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import NoteItem from "../../components/NoteItem/NoteItem";

function Notes({ notes }) {
  return (
    <>
      <section>
        <header className="notes__header">
          <h2>My Notes</h2>
          <input type="text" autoFocus placeholder="Keyword..." />
          <button className="btn">
            <CiSearch />
          </button>
        </header>
        <div className="notes__container">
          {notes.length > 0 ? (
            notes.map((note) => <NoteItem key={note.id} note={note} />)
          ) : (
            <p>No notes available</p>
          )}
        </div>
        <Link to="/create-note" className="btn add__btn">
          <BsPlusLg />
        </Link>
      </section>
    </>
  );
}

export default Notes;
