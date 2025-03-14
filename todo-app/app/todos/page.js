import Link from "next/link";
import axios from "axios";

const fetchTodos = async (page = 1) => {
  const res = await axios.get(`http://localhost:5000/api/todos?page=${page}`);
  return res.data;
};

export default async function TodosPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const { todos, total, limit } = await fetchTodos(page);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "300px",
          backgroundColor: "#f4f4f4",
          padding: "20px",
          borderRight: "1px solid #ddd",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Todo</h1>
        {/* Button to Add New Todo */}
        <Link
          href="/todos/new"
          style={{
            display: "block",
            padding: "10px",
            backgroundColor: "#0070f3",
            color: "#fff",
            textAlign: "center",
            borderRadius: "5px",
            textDecoration: "none",
            marginBottom: "20px",
          }}
        >
          Add New Todo
        </Link>
        {/* List of Todos */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((todo) => (
            <li key={todo._id} style={{ marginBottom: "10px" }}>
              <Link
                href={`/todos/${todo._id}`}
                style={{
                  display: "block",
                  padding: "10px",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  textDecoration: "none",
                  color: "#333",
                  border: "1px solid #ddd",
                }}
              >
                <strong>{todo.title}</strong>
                <p style={{ margin: "5px 0 0", color: "#666" }}>
                  {todo.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        {/* Pagination */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
            <Link
              key={i + 1}
              href={`/todos?page=${i + 1}`}
              style={{
                padding: "5px 10px",
                backgroundColor: "#0070f3",
                color: "#fff",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      </div>

      {/* Right Panel (Placeholder for Editing) */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Edit Todo</h2>
        <p>Select a todo from the sidebar to edit.</p>
      </div>
    </div>
  );
}
