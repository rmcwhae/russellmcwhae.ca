import fs from 'fs';
import * as StringUtils from '$lib/utils/string'

const galleries = fs
.readdirSync('./content/gallery')
.filter(folder => folder !== '.DS_Store')
.sort((a, b) => {
  return new Date(StringUtils.extractDate(b)) - new Date(StringUtils.extractDate(a))
})
.map((filename) => {
  return {
    slug: filename,
    title: StringUtils.createTitle(filename),
    date: StringUtils.extractDate(filename)
    // count: 0, TODO implement me
  };
});

export default galleries