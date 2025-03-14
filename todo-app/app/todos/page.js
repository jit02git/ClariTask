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

  return (<>
<div style= {{
  width: "10%", marginLeft: "25px", margin:"5px"
}}>      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>icon Todo</h1>
</div>
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
<div style={{display:"flex", justifyContent:"space-around"}}>

        {/* Button to Add New Todo */}
        <Link
          href="/todos/new"
          style={{
            display: "block",
            padding: "10px",
            backgroundColor: "black",
            color: "#fff",
            width: "50%",
            textAlign: "center",
            borderRadius: "5px",
            textDecoration: "none",
            marginBottom: "20px",
          }}
        >
          icon Todo
        </Link>

        delete icon

        </div>
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
      <div style={{ flex: 1, padding: "20px", margin:"5px",
      display: "block",
            padding: "10px",
            // width: "50%",
            width: "300px",
            // backgroundColor: "#f4f4f4",

            // textAlign: "center",
            borderRadius: "5px",
            // textDecoration: "none",
            margin: "20px" }}>
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
        const response = await fetch('/api/todos/${selectedTodo._id}', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        });

        const result = await response.json();
        if (result.success) {
          window.location.href = '/todos?id=' + id;
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
        ) : (<div style={{margin:"10px"}}>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        <h1 style={{font:"bold", fontSize:"45px", marginBottom:"5px"}}> New Additions</h1>
        icon</div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        icon1, icon2, icon3, icon4, icon5</div>
        <hr style={{font:"45px", color:"gray", marginTop: "5px"}}></hr>
          <p style={{marginTop:"15px"}}>Select a todo from the sidebar to edit.</p></div>
        )}
      </div>
      </div>
    </>
  );
}
