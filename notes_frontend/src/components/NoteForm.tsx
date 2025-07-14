"use client";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { useState } from "react";

interface NoteFormProps {
  note?: { id: number; title: string; content: string };
  onSuccess: () => void;
}

export default function NoteForm({ note, onSuccess }: NoteFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: note?.title || "",
      content: note?.content || ""
    }
  });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(values: { title: string; content: string }) {
    setSubmitting(true);
    const res = await fetch(note ? `/api/notes/${note.id}` : "/api/notes", {
      method: note ? "PUT" : "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    setSubmitting(false);
    if (res.ok) {
      reset();
      onSuccess();
    } else {
      alert("Failed to save note.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <label>
        Title:
        <input
          {...register("title", { required: "Title is required" })}
          className="w-full border rounded px-3 py-2 mt-1"
        />
        {errors.title && <span className="text-red-600">{errors.title.message?.toString()}</span>}
      </label>
      <label>
        Content:
        <textarea
          {...register("content", { required: "Content is required" })}
          className="w-full border rounded px-3 py-2 mt-1"
          rows={4}
        />
        {errors.content && <span className="text-red-600">{errors.content.message?.toString()}</span>}
      </label>
      <Button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : note ? "Update Note" : "Create Note"}
      </Button>
    </form>
  );
}
