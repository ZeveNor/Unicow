const xValues = ['Monday', 'Tuesday', 'Wednesday', 'Thurseday', 'Friday'];
const yValues = [30, 29, 35, 27, 28];

const xValue = ['Jan','Feb','Mar','May','April','June','July','August','September','October','November','December'];
const yValue = [30, 29, 35, 27, 28, 30, 29, 35, 27, 28, 29, 35];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0.1,
      backgroundColor: "#676a6a4f",
      borderColor: "#676a6a",
      data: yValues
    }]
  },
  options: {
    legend: { display: false },
    scales: {
      yAxes: [{ ticks: { min: 1, max: 40 } }],
    }
  }
});

new Chart("myChart2", {
  type: "line",
  data: {
    labels: xValue,
    datasets: [{
      fill: false,
      lineTension: 0.3,
      backgroundColor: "#00e676",
      borderColor: "#00e67784",
      data: yValue
    }]
  },
  options: {
    legend: { display: false },
    scales: {
      yAxes: [{ ticks: { min: 1, max: 50 } }],
    }
  }
});

