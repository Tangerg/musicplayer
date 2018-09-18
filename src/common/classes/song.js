export default class Song {
  constructor ({id, mid, singer, name, album, image}) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.image = image
  }
}
function singerName (singers) {
  let name = []
  name = singers.map((singer) => {
    return singer.name
  })

  return name.join('/')
}

export function creatSongList(music) {
  return new Song({
    id:music.id,
    singer:singerName(music.ar),
    name:music.name,
    album:music.al.name,
    image:music.al.picUrl
  })
}
