import posts from '../_posts';

export function get({ params }) {
  const post = posts.find(post => post.slug === params.slug)

  if (post) {
    return {
      body: JSON.stringify(post),
    }
  } else {
    return {
      status: 404,
    }
  }
  
}