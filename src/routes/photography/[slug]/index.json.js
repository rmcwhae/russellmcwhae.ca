import fs from 'fs';
import galleries from '../_galleries';

export function get({ params }) {
  const gallery = galleries.find(post => post.slug === params.slug)

  if (gallery) {
    const images = fs
      .readdirSync('./static/galleries/' + gallery.slug)
      .filter(folder => folder !== '.DS_Store')
      .map(image => {
        return {
          title: image,
          description: image,
          url: generateSrc(gallery.slug, image)
        }
      })

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

function generateSrc(slug, image) {
  return '/galleries/' + slug + '/' + image;
}