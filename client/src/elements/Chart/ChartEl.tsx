import Chart, { ChartData } from 'chart.js/auto';
import { createSignal, onMount } from 'solid-js';
import 'chartjs-adapter-luxon';

const ChartEl = (props) => {
  const [chart, setChart] = createSignal(null)

  // const opts = {
  //   // parsing: {
  //   //   xAxisKey: 'x',
  //   //   yAxisKey: 'y'
  //   // },
  //   scales: {
  //     x: {
  //       stacked: true,
  //       adapters: {
  //         date: {
  //             locale: enUS
  //         }
  //       },
  //       type: 'time',
  //       time: {
  //         unit: 'day'
  //       }
  //     },
  //     y: {
  //       stacked: true,
  //       beginAtZero: true
  //     },
  //   }, 
  // }

  
  // const el: HTMLCanvasElement = (<canvas></canvas>) as HTMLCanvasElement
  onMount(() => {
    const d = [
      { x: '2023-01-27', y: 10 },
      { x: '2023-01-28', y: 8 },
      { x: '2023-02-01', y: 1 },
      { x: '2023-02-25', y: 20}, 
      { x: '2023-02-26', y: 10}
    ];
    const d2 = [
      { x: '2023-01-27', y: 19 },
      { x: '2023-01-28', y: 2 },
      { x: '2023-02-01', y: 3 },
      { x: '2023-02-25', y: 4}, 
      { x: '2023-02-26', y: 6}
    ]
    const datasets: ChartData <'bar', {x: string, y: number} []> = {
      datasets: [{
        data: d,
        parsing: {
          xAxisKey: 'x',
          yAxisKey: 'y'
        }
      }],
    };
    console.log(props.data);
    const c = new Chart(props.canvasId, props.data);
    // const c = new Chart(props.canvasId, {
    //   type: 'bar',
    //   data: {
    //     labels: ["Task Activity", "Status Activity"],
    //     datasets: datasets
    //   },
    //   options: {
    //     parsing: {
    //       xAxisKey: 'x',
    //       yAxisKey: 'y'
    //     },
    //     scales: {
    //       x: {
    //         // stacked: true,
    //         min: "2023-01-01",
    //         max: "2023-03-01",
    //         type: 'time',
    //         time: {
    //           unit: 'day'
    //         },
    //         adapters: {
    //           date: {
    //               locale: "en"
    //           }
    //         }
    //       },
    //       y: {
    //         beginAtZero: true
    //       },
    //     }, 
    //   }
    // });
    c.update()
    console.log(c.data.datasets)
  });
  
  return <></>;
}
export default ChartEl