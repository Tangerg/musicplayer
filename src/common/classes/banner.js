export default class Banner {
  constructor({picUrl, url,targetId,backgroundUrl,targetType,monitorType,monitorImpress,monitorClick}) {
    this.picUrl = picUrl
    this.url = url
    this.targetId = targetId
    this.backgroundUrl = backgroundUrl
    this.targetType = targetType
    this.monitorType = monitorType
    this.monitorImpress = monitorImpress
    this.monitorClick = monitorClick
  }
}
export function createBanner (banner) {
  return new Banner({
    picUrl: banner.picUrl,
    url: banner.url,
    targetId: banner.targetId,
    backgroundUrl: banner.backgroundUrl,
    targetType: banner.targetType,
    monitorType: banner.monitorType,
    monitorClick: banner.monitorClick,
    monitorImpress: banner.monitorImpress,
  })
}
