"use client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import NoteForm from "@/components/NoteForm";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

type Note = {
  id: number;
  title: string;
  content: string;
};

const fetcher = (url: string): Promise<Note[]> =>
  fetch(url, { credentials: "include" }).then(res => res.json());

export default function NotesPage() {
  const { data: session } = useSession();
  const { data, mutate } = useSWR<Note[]>("/api/notes", fetcher);
  const [modalOpen, setModalOpen] = useState(false);
  const [editNote, setEditNote] = useState<Note | null>(null);

  if (!session) {
    return (
      <div className="w-full flex flex-col items-center justify-center mt-24 text-secondary text-lg">
        Please <a href="/login" className="underline text-primary ml-2">login</a> to view notes.
      </div>
    );
  }

  function handleAdd() {
    setEditNote(null);
    setModalOpen(true);
  }

  function handleEdit(note: Note) {
    setEditNote(note);
    setModalOpen(true);
  }

  async function handleDelete(noteId: number) {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await fetch(`/api/notes/${noteId}`, { method: "DELETE", credentials: "include" });
      mutate();
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Your Notes</h1>
        <Button onClick={handleAdd} className="flex items-center gap-2 text-sm bg-accent text-secondary px-3 py-1">
          <FaPlus />New Note
        </Button>
      </div>
      <ul className="space-y-4">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((note: Note) => (
            <li
              key={note.id}
              className="border rounded p-4 shadow-sm bg-white flex flex-col sm:flex-row sm:items-center justify-between"
            >
              <div>
                <div className="font-semibold text-lg text-foreground">{note.title}</div>
                <div className="text-sm text-secondary mt-1 whitespace-pre-line">{note.content}</div>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button className="flex items-center gap-1 bg-primary text-white" onClick={() => handleEdit(note)}>
                  <FaEdit />
                  Edit
                </Button>
                <Button className="flex items-center gap-1 bg-red-500" onClick={() => handleDelete(note.id)}>
                  <FaTrash />
                  Delete
                </Button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-secondary text-center">No notes found.</li>
        )}
      </ul>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editNote ? "Edit Note" : "New Note"}>
        <NoteForm
          note={editNote || undefined}
          onSuccess={() => {
            setModalOpen(false);
            mutate();
          }}
        />
      </Modal>
    </div>
  );
}
