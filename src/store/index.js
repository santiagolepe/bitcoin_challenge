import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// State
const state = {
  coins: []
}

// Mutations - they can change the state values, its must be Synchronous
const mutations = {
  setCoins (state, { data }) {
    state.coins.push(data)
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
