import galleries from '../_galleries';

export function get({ params }) {
  const gallery = galleries.find(post => post.slug === params.slug)

  if (gallery) {
    return {
      body: JSON.stringify(gallery),
    }
  } else {
    return {
      status: 404,
    }
  }
  
}