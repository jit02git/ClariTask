import axios from "axios";

const fetchTodo = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/todos/${id}`);
  return res.data;
};

export default async function TodoDetailPage({ params }) {
  const todo = await fetchTodo(params.id);

  return (
    <div style={{ flex: 1, marginLeft: "20px" }}>
      <h1>Todo Detail</h1>
      <form action={`/api/todos/${todo._id}`} method="POST">
        <input type="text" name="title" defaultValue={todo.title} />
        <textarea name="description" defaultValue={todo.description} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
