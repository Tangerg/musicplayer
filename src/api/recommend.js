import ajax from './ajax'
const BASE_URL = '/api'

//获取轮播图
export const getBanner = () => ajax(`${BASE_URL}/banner`)

//获取推荐歌单
export const getRecommendList = () => ajax(`${BASE_URL}/personalized`)

//获取推荐歌曲
export const getRecommendSong = () => ajax(`${BASE_URL}/personalized/newsong`)
