import { fetch } from "frontity";
import { connect, styled } from "frontity";

const postEvent = async ({ state }) => {

  const categories = state.theme.categoriesArr;
  let imageId = state.theme.idImage;
  let objectToPost = state.theme.objectForm;

  console.log("postEvent.js : ", objectToPost)

  console.log("imageId: ", imageId)

  console.log("ObjectToPost: ", objectToPost)

  objectToPost["categories"] = categories;

  objectToPost.acf_fields["image_event"] = imageId;

  let objStatusPublish = {...objectToPost, status: 'publish'}

  console.log("objStatusPublish: ", objStatusPublish)
  
  const res = await fetch(`${state.source.api}wp/v2/allevents`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${state.theme.token}`
    }),
    body: JSON.stringify(
      objStatusPublish
    ),
    redirect: "follow"
  });
  const body = await res.json();
  console.log("soy Body: ", body);

  state.theme.bodyPostEvent = body;
};

export default postEvent;