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
        min: 0,
        max : 40,
        ticks: {
          stepSize: 2
        }
      }
    }
  };

  const data = {
    labels: label?.map(date => date.split('T')[1].split(':')[0] + ' H'),
    datasets: [
      {
        label: 'Temperature',
        data: temperature,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        fill: true,
      }
    ]
  }

  return (
    <div className="ChartTemp" style={{ width: "100%", height : "400px" }}>
      <Line options={options} data={data} />
    </div>
  );
}

export default ChartTemp;