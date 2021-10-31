import { fetch, connect } from "frontity";

const postImageAction = async ({ state }) => {
  
  const formData = new FormData();
  formData.append("file", state.theme.image.raw);

  const res = await fetch(`${state.source.api}wp/v2/media`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${state.theme.token}`
    },
    body: formData
  });

  const cuerpo = await res.json();
  state.theme.idImage = cuerpo.id;
};

export default postImageAction;
