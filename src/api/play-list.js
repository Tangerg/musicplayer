import ajax from './ajax'
import {HOST} from '../common/js/config'


//获取音乐列表
export const getPlayList= (id) => ajax(HOST+`/playlist/detail?id=${id}`)

//获得单曲
export const getPlaySong= (id) => ajax(HOST+`/music/url?id=${id}`)
