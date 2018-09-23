import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER_INFO] (state, singerInfo) {
    state.singerInfo = singerInfo
  },
  [types.SET_SINGER_CATEGORY] (state, category) {
    state.singerCategory = category ? category : 1001
  },
  [types.SET_MUSIC_LIST] (state, musicList) {
    state.musicList = musicList
  },
  [types.SET_PLAY_LIST] (state, playList) {
    state.playList = playList
  },
  [types.SET_SEQUENCE_LIST] (state, playList) {
    state.sequenceList = playList
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.isPlaying = flag
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index ? index : 0
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYING_MODE] (state, mode) {
    state.playMode = mode
  },
}

export default mutations
