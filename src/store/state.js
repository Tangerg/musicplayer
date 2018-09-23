import {Mode} from '../common/js/config'
const state = {
  singerCategory: 0,
  singerInfo:{},
  musicList: {},
  playList:[],
  sequenceList:[],
  isPlaying: true,
  fullScreen:false,
  currentIndex:-1,
  playMode:Mode.sequence
}

export default state
