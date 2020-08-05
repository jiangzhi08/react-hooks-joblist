import axios from "axios";

// Create Redux action types
export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";

// Create Redux action creators that return an action
export const getPosts = () => ({
  type: GET_POSTS,
});

export const getPostsSuccess = (posts) => ({
  type: GET_POSTS_SUCCESS,
  payload: posts,
});

export const getPostsFailure = () => ({
  type: GET_POSTS_FAILURE,
});

export function fetchPosts(BASE_URL) {
  return async (dispatch) => {
    dispatch(getPosts());

    // try {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/posts"
    //   );
    //   const data = await response.json();

    //   console.log(data);
    //   dispatch(getPostsSuccess(data));
    // } catch (error) {
    //   dispatch(getPostsFailure());
    // }

    axios
      .get(BASE_URL)
      .then((res) => {
        console.log(res.data);
        dispatch(getPostsSuccess(res.data));
        // setNewsdata(res.data.results);
        // console.log(res.data.results);
      })
      .catch((e) => {
        console.log(e);
        dispatch(getPostsFailure());
      });
  };
}
