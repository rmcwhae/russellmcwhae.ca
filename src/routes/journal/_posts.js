import fs from 'fs'
import * as MarkdownUtils from '$lib/utils/markdown'

const posts = fs
    .readdirSync('./content/journal')
    .filter((elem) => elem.endsWith('.md'))
    .map((filename) => {
      return MarkdownUtils.parse(filename)
  });

const sortedPosts = posts
    .filter((post) => !post.draft)
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    }

  );

export default sortedPosts