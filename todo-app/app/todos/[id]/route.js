import axios from "axios";

// export async function POST(request, { params }) {
//   const { id } = params;
//   const formData = await request.formData();
//   const title = formData.get("title");
//   const description = formData.get("description");

//   await axios.put(`http://localhost:5000/api/todos/${id}`, {
 
//     title,
//     description,
//   });

//   return Response.redirect(`/todos/${id}`);
// }

export async function POST(request) {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");

  await axios.post("http://localhost:5000/api/todos", { title, description });

  return Response.redirect("/todos");
}
