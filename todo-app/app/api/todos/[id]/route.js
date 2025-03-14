"use client"; // Enable client-side interactivity

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const fetchTodo = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/todos/${id}`);
  return res.data;
};

export default function TodoDetailPage({ params }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useState(() => {
    fetchTodo(params.id).then((data) => {
      setTitle(data.title);
      setDescription(data.description);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/todos/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        router.push(`/todos?id=${params.id}`);
      } else {
        alert("Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div style={{ flex: 1, padding: "20px" }}>
      <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Edit Todo</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            minHeight: "100px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
}
