import ajax from './ajax'
import {HOST} from '../common/js/config'

//获取轮播图
export const getBanner = () => ajax(HOST+`/banner`)

//获取推荐歌单
export const getRecommendList = () => ajax(HOST+`/personalized`)

//获取推荐歌曲
export const getRecommendSong = () => ajax(HOST+`/personalized/newsong`)
