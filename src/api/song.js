import ajax from './ajax'
import {HOST} from '../common/js/config'


export const getPlaySong= (id) => ajax(HOST+`/music/url?id=${id}`)


export const getSongLyric= (id) => ajax(HOST+`/lyric?id=${id}`)
