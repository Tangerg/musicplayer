import ajax from './ajax'
const BASE_URL = '/api'

//获取音乐列表
export const getPlayList= (id) => ajax(`${BASE_URL}/playlist/detail?id=${id}`)
