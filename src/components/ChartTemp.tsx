import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function ChartTemp({ label, temperature }: { label: string[], temperature: number[] }) {


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Température de la journée',
      }
    },
    scales: {
      y: {
        display: false,
        ticks: {
          stepSize: 1,
        }
      },
      x: {
        display: false,
        grid: { display: false }
      }
    },
  };

  const data = {
    labels: label?.map(date => date.split('T')[1].split(':')[0] + ' H'),
    datasets: [
      {
        label: 'Temperature',
        data: temperature,
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        radius: 0,
        spanGaps: true,
      }
    ]
  }

  return (
    <div className="ChartTemp" style={{ width: "100%", height: "150px" }}>
      <Line options={options} data={data} />
    </div>
  );
}

export default ChartTemp;