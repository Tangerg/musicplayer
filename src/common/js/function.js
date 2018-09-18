export function Count(count) {
  if (count < 1e5) {
    return Math.floor(count)
  } else if(count < 1e8) {
    return Math.floor(count / 10000) + '万'
  } else {
    return Math.floor(count / 100000000) + '亿'
  }
}
