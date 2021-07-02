import fs from 'fs';
import frontMatter from 'front-matter';
import marked from 'marked';
import readingTime from 'reading-time';

export function get() {

  const posts = fs
  .readdirSync('./content/journal')
  .filter((elem) => elem.endsWith('.md'))
  .map((filename) => {
    const postContent = fs.readFileSync(`./content/journal/${filename}`, {
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
  });

  const sortedPosts = posts
    .filter((post) => !post.draft)
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    }

  );

    const body = JSON.stringify(sortedPosts)

  return {
    body
  }
}
