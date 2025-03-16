import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import './dayTemperatures.scss';
import IconWeather from '../IconWeather/IconWeather';
import { AllowedWeather } from '../../utils/useGetWeather';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function DayTemperatures({ labels, temperature, translateCodeInRangeDay }: { labels: string[], temperature: number[], translateCodeInRangeDay: AllowedWeather[]}) {

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

    const formatedLabels = labels?.map(date => date.split('T')[1].split(':')[0] + ' H')

    const data = {
        labels: formatedLabels,
        datasets: [
            {
            label: 'Temperature',
            data: [...temperature],
            borderColor: 'white',
            backgroundColor: 'white',
            borderWidth: 3,
            tension: 0.4,
            radius: 0,
            spanGaps: true,
            }
        ]
    }

    const temperatureMax = Math.max(...temperature?.slice(1))
    const temperatureMin = Math.min(...temperature?.slice(1))


    return (
        <div className='day-temperatures'>


          <div className="container container-icons">
              {translateCodeInRangeDay?.slice(1).map((label, index) => {
                  return (
                    <div className="container-icon" key={index}>
                      <IconWeather icon={label} />
                    </div>
                  )
              })}
          </div>
          
          <div className="container container-max-min">
            {temperature?.slice(1).map((temp, index) => {
              let text = ''
              if(temp === temperatureMax) {
                text = temp + '°'
              } else if(temp === temperatureMin) {
                text = temp + '°'
              }
              return (
                <div className="temp" key={index}>{text}</div>
              )
            })}
          </div>

            <div className="container container-grid">
              <div className="container-lines">
                {labels?.map((_, index) => (
                    <div className="line-grid" key={index}></div>
                ))}
              </div>
              <Line options={options} data={data} />
            </div>

        </div>
    );
}

export default DayTemperatures;