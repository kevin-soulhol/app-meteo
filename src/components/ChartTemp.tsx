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


function ChartTemp({ label, temperature } : { label : string[], temperature : number[] }) {  

    const options =  {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };

    const data = {
        labels : label,
        datasets : [
            {
                label : 'Temperature',
                data : temperature,
                borderColor : 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    }

  return (
    <div className="ChartTemp">
        <Line options={options} data={data} />
    </div>
  );
}

export default ChartTemp;