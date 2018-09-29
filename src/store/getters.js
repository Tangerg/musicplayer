export const singerCategory = state => state.singerCategory

export const singerInfo = state => state.singerInfo

export const musicList = state => state.musicList

export const playList = state => state.playList

export const rankList = state => state.rankList

export const playMode = state => state.playMode

export const isPlaying = state => state.isPlaying

export const fullScreen = state => state.fullScreen

export const currentIndex = state => state.currentIndex

export const sequenceList = state => state.sequenceList

export const searchHistory = state => state.searchHistory

export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
