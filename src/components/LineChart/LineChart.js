import './LineChart.css';
import {Chart} from 'chart.js/auto';
import {Line} from 'react-chartjs-2';

export const LineChart = (props) => {
    const {data, showLegend = false} = props;
    return (
        <div className="chart-container">
            <Line
                data={data}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: showLegend
                        }
                    }
                }}
            />
        </div>
    );
}