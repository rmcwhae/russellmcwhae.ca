import fs from 'fs';
import frontMatter from 'front-matter';
import marked from 'marked';
import readingTime from 'reading-time';

export function parse(filename) {

   const postContent = fs.readFileSync('./content/journal/' + filename, {
      encoding: 'utf8',
    });

    const postFrontMatter = frontMatter(postContent);

    const renderer = new marked.Renderer();

    const html = marked(postFrontMatter.body, { renderer });

    const readingTimeDuration = readingTime(postFrontMatter.body).text;

    return {
      ...postFrontMatter.attributes,
      slug: filename.slice(0, -3),
      html: marked(html),
      readingTime: readingTimeDuration,
    };
}