<template>
  <div>
    <b-card bg-variant="default"
      text-variant="black"
      :header="header"
      class="text-center">
      <b-table striped hover :items="items"></b-table>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Tablebit',
  data: () => ({
    items: null
  }),
  props: {
    header: String,
    coins: Array,
    type: String
  },
  methods: {
    update () {
      this.items = []
      this.coins.forEach(i => {
        this.items.push({
          Time: i.date,
          USD: i[this.type].USD,
          EUR: i[this.type].EUR
        })
      })
    }
  }
}
</script>