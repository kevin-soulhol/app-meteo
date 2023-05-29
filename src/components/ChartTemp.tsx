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
import { useState } from 'react';
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

interface IPositionTemp {
  x : number;
  y : number;
}

function ChartTemp({ label, temperature }: { label: string[], temperature: number[] }) {

  const [maxTemp, setMaxTemp] = useState<number>(0)
  const [tempMax, setTempMax] = useState<number>(10)
  const [positionMaxTemp, setPositionMaxTemp] = useState<IPositionTemp>({x : 0, y : 0})

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
        display : false,
        ticks: {
          stepSize: 1,
        }
      },
      x : {
        display : false,
        grid : { display : false }
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
        tension : 0.4,
        fill: true,
        radius : 0,
        spanGaps : true,
      }
    ]
  }

  return (
    <div className="ChartTemp" style={{ width: "100%", height : "150px" }}>
      <Line options={options} data={data} />
    </div>
  );
}

export default ChartTemp;