import { get as axiosGet } from 'axios'

const scrollIntoView = require('scroll-into-view')

export default {
  scrollToOrder ({ state, commit }, { id, callback }) {
    if (state.isAutoScrolling) return
    
    commit('toggleAutoScrolling', true)

    const reportEl = document.getElementById(`report${id}`)
    callback = callback || function () { commit('toggleAutoScrolling', false) }

    scrollIntoView(reportEl, {
        time: 1000,
        align: { top: 0, left: 0 },
        ease: (t) => t * t * t * t
      },
      callback
    )
  },
  fetchOtherReports ({ commit }) {
    axiosGet('https://www.readr.tw/api/public/posts?type={%22in%22:[4]}&sort=-created_at&max_result=3')
    .then((res) => {
      commit('setOtherReports', res.data._items)
    })
  }
}
