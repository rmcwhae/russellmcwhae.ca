import fs from 'fs';
import galleries from '../_galleries';

export function get({ params }) {
  const gallery = galleries.find(post => post.slug === params.slug)

  if (gallery) {
    const images = fs
      .readdirSync('./content/gallery/' + gallery.slug)
      .filter(folder => folder !== '.DS_Store')

    return {
      body: JSON.stringify({
        ...gallery,
        images
      }),
    }
  } else {
    return {
      status: 404,
    }
  }
  
}