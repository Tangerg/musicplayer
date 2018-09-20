import * as types from './mutation-types'

const mutations = {
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
}

export default mutations
