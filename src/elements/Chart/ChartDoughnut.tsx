import Chart, { ChartConfiguration } from 'chart.js/auto';
import { createSignal, onCleanup, onMount } from 'solid-js';
import 'chartjs-adapter-luxon';

const ChartDoughnut = (props) => {
  let canvasRef: HTMLCanvasElement;
  const [chartInstance, setChartInstance] = createSignal<Chart | null>(null);
  const chartConfig: ChartConfiguration = {
    type: 'doughnut',
    data: {
      labels: props.labels,
      datasets: [{
        label: props.dataLabels,
        data: props.data,
        backgroundColor: props.colors,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 20
          }
        }
      }
    }
  }
  
  const createChart = () => {
    if (canvasRef) {
      const newChartInstance = new Chart(canvasRef, chartConfig);
      setChartInstance(newChartInstance);
    }
  };

  onMount(() => createChart())

  onCleanup(() => {
    const currentChartInstance = chartInstance();
    if (currentChartInstance) {
      currentChartInstance.destroy();
    }
  });

  return (
    // <div style="position: relative; height: 100%; width: 100%;">
      <canvas ref={canvasRef} />
    // </div>
  );
}

export default ChartDoughnut;