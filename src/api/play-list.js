import ajax from './ajax'
import {HOST} from '../common/js/config'


//获取音乐列表
export const getPlayList= (id) => ajax(HOST+`/playlist/detail?id=${id}`)
