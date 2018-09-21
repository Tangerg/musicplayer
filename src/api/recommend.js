import ajax from './ajax'
import {HOST} from '../common/js/config'

//获取轮播图
export const getBanner = () => ajax(`${prod.env.API_URL}/banner`)

//获取推荐歌单
export const getRecommendList = () => ajax(`${prod.env.API_URL}/personalized`)

//获取推荐歌曲
export const getRecommendSong = () => ajax(`${prod.env.API_URL}/personalized/newsong`)
