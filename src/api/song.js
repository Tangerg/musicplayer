import ajax from './ajax'
import {HOST} from '../common/js/config'


export const getPlaySong= (id) => ajax(HOST+`/music/url?id=${id}`)

//由歌手得到歌曲
export const getSongBySinger = (id) => ajax(HOST+`/artists?id=${id}`)

export const getSongLyric= (id) => ajax(HOST+`/lyric?id=${id}`)
