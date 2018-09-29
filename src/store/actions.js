import * as types from './mutation-types'
import {Mode} from '../common/js/config'
import {shuffle} from "../common/js/util";
import {saveSearch, clearSearch, deleteSearch, savePlay, saveFavorite, deleteFavorite} from '../common/js/cache'
function findIndex(list,song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if(state.playMode===Mode.random){
    let randomList = shuffle(list)
    commit(types.SET_PLAY_LIST, randomList)
    index = findIndex(randomList,list[index])
  }else{
    commit(types.SET_PLAY_LIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, false)
  commit(types.SET_PLAYING_STATE, true)
}
export const sequencePlay = function ({commit, state}, {list}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAY_LIST, list)
  commit(types.SET_CURRENT_INDEX)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
export const insertSong = function ({commit, state}, song) {
  let playlist = state.playList.slice()
  let sequencelist =state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let currentSong = playlist[currentIndex]
  let fpIndex = findIndex(playlist,song)
  currentIndex++
  playlist.splice(currentIndex,0,song)
  if(fpIndex>-1){
    if(currentIndex>fpIndex){
      playlist.splice(fpIndex,1)
      currentIndex--
    }else{
      playlist.splice(fpIndex+1,1)
    }
  }
  let currentSIndex = findIndex(sequencelist,currentSong) + 1
  let fsIndex = findIndex(sequencelist,song)
  sequencelist.splice(currentSIndex,0,song)
  if (fsIndex > -1) {
    if(currentSIndex> fsIndex){
      sequencelist.splice(fsIndex,1)
    }else {
      sequencelist.splice(fsIndex + 1,1)
    }
  }
  commit(types.SET_PLAY_LIST,playlist)
  commit(types.SET_SEQUENCE_LIST,sequencelist)
  commit(types.SET_CURRENT_INDEX,currentIndex)
  commit(types.SET_FULL_SCREEN, false)
  commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
