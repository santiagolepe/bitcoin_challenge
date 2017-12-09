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
        <b-card bg-variant="light"
        text-variant="black"
        header="Calculator"
        class="text-center">

        <form id="calculator">
          
          <div class="form-group row">
            <div class="col-sm-6">
              <input type="number" class="form-control">
            </div>                
            <div class="col-sm-6">
              <select  class="form-control">
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
          </div>
          
          <div class="form-group row">                
            <div class="col-sm-6">
              <input type="number" class="form-control">
            </div>                
            <div class="col-sm-6">
              <select class="form-control">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </form>
        </b-card>
      </div>
    </div>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Barchart from './Barchart'

export default {
  name: 'Home',
  data: () => ({
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

  components: { Barchart },

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
}
.panel1{
  height: 500px;
}
</style>
