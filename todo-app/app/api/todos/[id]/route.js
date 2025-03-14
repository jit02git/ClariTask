import axios from "axios";

export async function PUT(request, { params }) {
  const { id } = params;
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");

  await axios.put(`http://localhost:5000/api/todos/${id}`, {
    title,
    description,
  });

  return Response.redirect(`/todos/${id}`);
}
