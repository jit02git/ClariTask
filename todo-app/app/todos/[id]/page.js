import { useRouter } from "next/navigation";

export default function TodoDetailPage({ params }) {
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");

    try {
      const res = await fetch(`/api/todos/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push(`/todos?id=${params.id}`);
      } else {
        alert("Failed to update todo");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating the todo.");
    }
  };

  return (
    <div style={{ flex: 1, padding: "20px" }}>
      <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Edit Todo</h2>
      <form
        action={`/api/todos/${todo._id}`}
        method="POST"
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input type="hidden" name="_method" value="PUT" />
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
