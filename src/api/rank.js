import ajax from './ajax'
import {HOST} from '../common/js/config'


//获取排行
export const getRankList= (id) => ajax(HOST+`/top/list?idx=${id}`)
