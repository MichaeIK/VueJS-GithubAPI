import { Line } from "vue-chartjs";

// [
//   { data: "8777580544", stats: "Free memory" },
//   { data: "15.06787109375", stats: "Last cpu load" },
//   { data: "15.49267578125", stats: "Load for last 5 minutes" },
//   { data: "15.75439453125", stats: "Load for last 15 minutes" },
//   { data: "8", stats: "Total cpus" }
// ];

export default {
  extends: Line,
  props: ["statsList", "statsTime"],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ["Now", "5 minutes", "15 minutes"],
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