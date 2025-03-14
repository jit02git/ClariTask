import axios from "axios";

export async function POST(request) {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");

  await axios.post("http://localhost:5000/api/todos", { title, description });

  return Response.redirect("/todos");
}
