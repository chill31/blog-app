function encode(title: string) {
  return encodeURIComponent(title.replaceAll(/ /g, "%20").replaceAll(".", "%2E"));
}

function decode(title: string) {
  return decodeURIComponent(title).replaceAll("%2E", ".").replaceAll("%20", " ");
}

export { encode, decode };