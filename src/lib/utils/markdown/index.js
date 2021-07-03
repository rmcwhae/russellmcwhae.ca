import fs from 'fs';
import frontMatter from 'front-matter';
// import marked from 'marked';
import unified from 'unified'
import readingTime from 'reading-time';
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import footnotes from 'remark-footnotes'
// import toc from 'remark-toc' TODO get me working

export function parse(filename) {

   const postContent = fs.readFileSync('./content/journal/' + filename, {
      encoding: 'utf8',
    });

    const postFrontMatter = frontMatter(postContent);

    const parser = unified()
    .use(footnotes, {inlineNotes: true})
    // .use(toc)
    .use(remarkParse)

    const runner = unified()
      .use(remarkRehype)
      .use(rehypeStringify)

    const readingTimeDuration = readingTime(postFrontMatter.body).text;

    return {
      ...postFrontMatter.attributes,
      slug: filename.slice(0, -3),
      html: runner.stringify(runner.runSync(parser.parse(postFrontMatter.body))),
      readingTime: readingTimeDuration,
    };
}