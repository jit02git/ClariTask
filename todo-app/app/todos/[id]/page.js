"use client"; // Mark this component as a Client Component

import axios from "axios";
import { useEffect } from "react";

const fetchTodo = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/todos/${id}`);
  return res.data;
};

export default async function TodoDetailPage({ params }) {
  const todo = await fetchTodo(params.id);

  useEffect(() => {
    const form = document.getElementById("edit-form");
    if (form) {
      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get("title");
        const description = formData.get("description");
        const id = todo._id;

        try {
          const response = await fetch(`/api/todos/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
          });

          if (response.ok) {
            window.location.href = `/todos?id=${id}`;
          } else {
            alert("Failed to update todo");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while updating the todo");
        }
      };

      form.addEventListener("submit", handleSubmit);

      // Cleanup the event listener on unmount
      return () => {
        form.removeEventListener("submit", handleSubmit);
      };
    }
  }, [todo._id]);

  return (
    <div style={{ flex: 1, padding: "20px" }}>
      <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Edit Todo</h2>
      <form
        id="edit-form"
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="title"
          defaultValue={todo.title}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
        <textarea
          name="description"
          defaultValue={todo.description}
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
