<template>
  <div>
    <b-card bg-variant="light"
    text-variant="black"
    header="Calculator"
    :footer="`Last update ${coin.date}`"
    class="text-center">
    <form id="calculator">

      <div class="form-group row">
        <div class="col-sm-6">
          <input type="number" class="form-control" v-model.number="bitcoin" v-on:change="calculate()">
        </div>                
        <div class="col-sm-6">
          <select  class="form-control" v-model="bitcoin_sel" v-on:change="calculate()">
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
          </select>
        </div>
      </div>

      <div class="form-group row">                
        <div class="col-sm-6">
          <input type="number" class="form-control" v-model.number="currency">
        </div>                
        <div class="col-sm-6">
          <select class="form-control" v-model="currency_sel" v-on:change="calculate()">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>
    </form>
  </b-card>
</div>  
</template>

<script>
export default {
  name: 'Calculator',
  props: {
    coin: Object
  },
  data: () => ({
    bitcoin: 0,
    bitcoin_sel: 'BTC',
    currency: 0,
    currency_sel: 'USD'
  }),
  methods: {
    calculate () {
      this.currency = this.bitcoin * this.coin[this.bitcoin_sel][this.currency_sel]
    }
  }
}
</script>