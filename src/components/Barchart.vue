<script>
import { Bar } from 'vue-chartjs'
export default {
  name: 'Barchart',
  extends: Bar,
  props: {
    chartData: Object
  },
  methods: {
    update () {
      this.$data._chart.update()
    }
  },
  mounted () {
    this.renderChart(this.chartData, {maintainAspectRatio: false})
  }
}
</script>
