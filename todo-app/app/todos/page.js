import Link from "next/link";
import axios from "axios";

const fetchTodos = async (page = 1) => {
  const res = await axios.get(`http://localhost:5000/api/todos?page=${page}`);
  return res.data;
};

const fetchTodo = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/todos/${id}`);
  return res.data;
};

export default async function TodosPage({ searchParams }) {
  // Await searchParams before using its properties
  const page = parseInt(searchParams.page) || 1;
  const selectedTodoId = searchParams.id;

  // Fetch todos and selected todo
  const { todos, total, limit } = await fetchTodos(page);
  const selectedTodo = selectedTodoId ? await fetchTodo(selectedTodoId) : null;

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
                href={`/todos?page=${page}&id=${todo._id}`}
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

      {/* Right Panel (Edit Todo) */}
      <div style={{ flex: 1, padding: "20px" }}>
        {selectedTodo ? (
          <>
            <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>
              Edit Todo
            </h2>
            <form
              id="edit-form"
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <input
                type="text"
                name="title"
                defaultValue={selectedTodo.title}
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
              <textarea
                name="description"
                defaultValue={selectedTodo.description}
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
            <script>
              {`
                document.getElementById('edit-form').addEventListener('submit', async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const title = formData.get('title');
                  const description = formData.get('description');
                  const id = '${selectedTodo._id}';

                  try {
                    const response = await fetch(\`/api/todos/\${id}\`, {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ title, description }),
                    });

                    if (response.ok) {
                      window.location.href = \`/todos?id=\${id}\`;
                    } else {
                      alert('Failed to update todo');
                    }
                  } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred while updating the todo');
                  }
                });
              `}
            </script>
          </>
        ) : (
          <p>Select a todo from the sidebar to edit.</p>
        )}
      </div>
    </div>
  );
}
