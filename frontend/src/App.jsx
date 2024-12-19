import "./styles/partials/_global.scss";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes/Notes";
import CreateNote from "./pages/CreateNotes/CreateNotes";
import EditNotes from "./pages/EditNote/EditNotes";
import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8686/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error("error fetching notes:", error));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notes notes={notes} />} />
          <Route
            path="/create-note"
            element={<CreateNote setNotes={setNotes} />}
          />
          <Route path="/edit-note/:id" element={<EditNotes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
