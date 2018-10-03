import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER_INFO] (state, singerInfo) {
    state.singerInfo = singerInfo
  },
  [types.SET_SINGER_CATEGORY] (state, category) {
    state.singerCategory = category
  },
  [types.SET_RECOMMEND_LIST] (state, musicList) {
    state.recommendList = musicList
  },
  [types.SET_MUSIC_LIST] (state, musicList) {
    state.musicList = musicList
  },
  [types.SET_PLAY_LIST] (state, playList) {
    state.playList = playList
  },
  [types.SET_RANK_LIST] (state, rankList) {
    state.rankList = rankList
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
  [types.SET_SEARCH_HISTORY] (state, history) {
    state.searchHistory = history
  },
  [types.SET_PLAY_HISTORY] (state, song) {
    state.playHistory = song
  },
  [types.SET_FAVOURATE_LIST] (state, song) {
    state.favourate = song
  },
}

export default mutations
