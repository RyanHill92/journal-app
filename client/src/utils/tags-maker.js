export default function tagsMaker (tags) {
  if (tags.length === 0) {
    return '';
  } else {
    return tags.trim().replace(/ /g, '').split(',');
  }
}
