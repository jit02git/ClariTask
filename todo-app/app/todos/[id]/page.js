import axios from "axios";

const fetchTodo = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/todos/${id}`);
  return res.data;
};

export default async function TodoDetailPage({ params }) {
  const todo = await fetchTodo(params.id);

  return (
    <div style={{ flex: 1, padding: "20px" }}>
      <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Edit Todo</h2>
      <form
        action={`/api/todos/${todo._id}`}
        method="POST"
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
