export default class Singer {
  constructor ({id, name, avatar, aliaName,bgImg}) {
    this.id = id
    this.name = name
    this.avatar = avatar
    this.aliaName = aliaName
    this.bgImg = bgImg
  }
}
export function creatSinger(singer) {
  return new Singer({
    id:singer.id,
    name:singer.name,
    avatar:singer.img1v1Url,
    aliaName:singer.alias[0]?singer.alias[0]:null,
    bgImg:singer.picUrl
  })
}
