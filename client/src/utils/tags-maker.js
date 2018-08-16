export default function tagsMaker (tags) {
  if (tags.length === 0) {
    return '';
  } else if (tags.indexOf(',') === -1) {
    let output = [];
    return output.concat(tags.trim());
  } else {
    return tags.trim().replace(/ /g, '').split(',');
  }
}
