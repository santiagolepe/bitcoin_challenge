<template>
  <div role="main" class="container mt-4">
    
    <div class="title">
      <h1>CryptoCurrency Dashboard</h1>
    </div>

    <div class="row mt-4 panel1">
      <div class="col-sm-8">
        <barchart ref="barchart" :chart-data="chartData" :height="300"></barchart>
      </div>
      <div class="col-sm-4">
        <calculator ref="calculator" :coin="coins[0]"></calculator>  
      </div>
    </div>

    <div class="row mt-4 panel1">
      <div class="col-sm-6"><h2 id="BTC_current">1 BTC = {{BTC}} USD</h2></div>
      <div class="col-sm-6"><h2 id="ETH_current">1 ETH = {{ETH}} USD</h2></div>
    </div>

    <!-- TABLES   -->
    <div class="row mt-4 panel1">
      <div class="col-sm-6">
        <tablebit ref="table" :header="'Bitcoin - BTC'" :coins="coins" :type="'BTC'"></tablebit>
      </div>
      <div class="col-sm-6">
        <tablebit ref="table2" :header="'Etherium - ETH'" :coins="coins" :type="'ETH'"></tablebit>
      </div>
    </div>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Barchart from './Barchart'
import Tablebit from './Tablebit'
import Calculator from './Calculator'
import Vue from 'vue'

export default {
  name: 'Home',
  data: () => ({
    BTC: 0,
    ETH: 0,
    chartData: {
      labels: [],
      datasets: [
        {
          label: 'BTC-USD',
          data: [],
          backgroundColor: '#0275d8'
        },
        {
          label: 'BTC-EUR',
          data: [],
          backgroundColor: '#5cb85c'
        },
        {
          label: 'ETH-USD',
          data: [],
          backgroundColor: '#673ab7'
        },
        {
          label: 'ETH-EUR',
          data: [],
          backgroundColor: '#e91f62'
        }
      ]
    }
  }),

  components: { Barchart, Tablebit, Calculator },

  computed: mapGetters({
    coins: 'coins'
  }),

  watch: {
    'coins': function () {
      this.chartData.labels[0] = this.coins[0].date
      this.chartData.datasets[0].data[0] = this.coins[0].BTC.USD
      this.chartData.datasets[1].data[0] = this.coins[0].BTC.EUR
      this.chartData.datasets[2].data[0] = this.coins[0].ETH.EUR
      this.chartData.datasets[3].data[0] = this.coins[0].ETH.EUR
      this.$refs.barchart.update()
      this.$refs.table.update()
      this.$refs.table2.update()
      this.BTC = this.coins[0].BTC.USD
      this.ETH = this.coins[0].ETH.USD
      Vue.nextTick().then(_ => this.$refs.calculator.calculate())
    },
    deep: true
  },

  mounted () {
    let all = [
      { from: 'BTC', to: 'USD' },
      { from: 'BTC', to: 'EUR' },
      { from: 'ETH', to: 'USD' },
      { from: 'ETH', to: 'EUR' }
    ]
    all.forEach(query => this.$store.dispatch('getLast10', query))
    setInterval(() => this.$store.dispatch('getCoins'), 10000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
.title {
  text-align: center;
  margin: 40px;
}
.panel1{
  margin: 50px 0 50px 0;
}
</style>
