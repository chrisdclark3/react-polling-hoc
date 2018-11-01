const HOST = "https://jsonplaceholder.typicode.com";

class PostsService {
  getPosts({ page }) {
    let url = `${HOST}/posts/`;
    return fetch(url);
  }
}

let postsService = new PostsService();

export default postsService;
