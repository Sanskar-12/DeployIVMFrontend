import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement} from 'chart.js' 
import { useState, useEffect } from 'react';
import axios from 'axios';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
)

export default function LineChart(){
    const [chartData, setChartData] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState('May-June');

    useEffect(() => {
        console.log(selectedMonth);
        axios.get('http://localhost:9090/api/'+`${selectedMonth}`).then(response => {
          console.log(response.data);
          const fetchedData = response.data; 
          
          const updatedChartData = {
            labels: [ "Jan", "Feb", "Mar", "Apr", "May","June","Jul","Aug","Sep","Oct","Nov","Dec"],
            datasets: [
              {
                data: fetchedData.Orders,
                backgroundColor: 'transparent',
                borderColor: '#9D9BF1',
                pointBorderColor: 'transparent',
                tension: 0.5,
              },
             
            ],
          };
    
          setChartData(updatedChartData);
        }).catch(error => {
          console.error("Error fetching data:", error);
        });
      }, [selectedMonth]);
    
    
      const handleMonthChange = event => {
        setSelectedMonth(event.target.value);
      };

    const options = {
        plugins:{
            legend: {
                display: false,
            }
        },
        scales:{
            x:{
                grid:{display:false}
            },
            y:{
                min:0,
                max:1000,
                ticks:{
                    stepSize:100,
                    callBack:(value)=> value + 'K'
                },
            }
        },
        responsive: true,
        maintainAspectRatio: false
    }

    return(
        <div className='mt-8 md:mt-0 bg-white rounded-2xl px-8 pt-8'>
            <div className='flex justify-between'>
                <div>
                    <div className='text-xl font-bold'>Activities</div>
                    <select className='border-0 text-gray-500' value={selectedMonth} onChange={handleMonthChange}>
                        <option value="May-June">May-June 2023</option>
                        <option value="April-May">April-May 2023</option>
                        <option value="March-April">March-April 2023</option>
                    </select>
                    </div>
                <div className='md:flex gap-8'>
                    <div className="flex items-center gap-4">
                            <div className='w-3 h-3 bg-[#9D9BF1] rounded-full'></div>
                            <div>No of Orders</div>
                    </div>
                   
                </div>
            </div>
            <div className='h-64 p-4'>
                {chartData && <Line data={chartData} options={options}></Line>}
            </div>
        </div>
    )
}