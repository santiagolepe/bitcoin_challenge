import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let coins = []
for (let x = 0; x < 15; x++) {
  coins.push({
    BTC: {USD: 0, EUR: 0},
    ETH: {USD: 0, EUR: 0},
    date: ''
  })
}

let setDate = function (e) {
  let date = new Date(e)
  let current = new Date()
  current.setHours(date.getHours())
  current.setMinutes(date.getMinutes())
  return current.toString()
}

// State
const state = {
  coins: coins
}

// Mutations - they can change the state values, its must be Synchronous
const mutations = {
  setCoins (state, { data }) {
    data.date = new Date()
    state.coins.splice(0, 1, data)
  },
// {"BTC":{"USD":15819.66,"EUR":13512.38},"ETH":{"USD":466.34,"EUR":387.85}}
  setLast10 (state, { data, query }) {
    data.Data.forEach((e, i) => {
      state.coins[i][query.from][query.to] = e.open
      state.coins[i].date = new Date(setDate(e.time))
    })
    state.coins.shift()
  }
}

// Actions - they only commit mutantions can be asynchronous
const actions = {
  async getCoins ({ commit }) {
    try {
      const { data } = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR')
      commit('setCoins', { data })
    } catch (err) {
      console.log('Error store getCoins', err)
    }
  },

  async getLast10 ({ commit }, query) {
    try {
      const { data } = await axios.get(`https://min-api.cryptocompare.com/data/histominute?fsym=${query.from}&tsym=${query.to}&limit=10`)
      commit('setLast10', { data, query })
    } catch (err) {
      console.log(`Error getLast10 ${err}`)
    }
  }
}

// Getther - only for get state store
const getters = {
  coins: state => state.coins
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
