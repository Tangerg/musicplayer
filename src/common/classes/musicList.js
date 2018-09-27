export default class MusicList {
  constructor ({id,name,picUrl,playCount,trackCount,creator}) {
    this.id = id
    this.name = name
    this.picUrl = picUrl
    this.playCount = playCount
    this.trackCount = trackCount
    this.creator = creator
  }
}
export function createSearchMusicList (musicList) {
  return new MusicList({
    id: musicList.id,
    name: musicList.name,
    playCount: musicList.playCount,
    trackCount: musicList.trackCount,
    picUrl: musicList.coverImgUrl,
    creator: musicList.creator.nickname,
  })
}
export function createMusicList (musicList) {
  return new MusicList({
    id: musicList.id,
    name: musicList.name,
    playCount: musicList.playCount,
    trackCount: musicList.trackCount,
    picUrl: musicList.picUrl,
  })
}
