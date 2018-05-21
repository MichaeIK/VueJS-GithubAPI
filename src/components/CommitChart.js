import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["statsList", "statsTime"],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ["15 minutes", "5 minutes", "Now"],
      datasets: [
        {
          label: "CPU loads",
          backgroundColor: "#f87979",
          data: this.statsList
        }
      ]
    });
  }
};