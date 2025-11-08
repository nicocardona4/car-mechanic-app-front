
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartServicesStats = () => {
    const services = useSelector(state => state.services.services);
    const completed = services.filter(service => service.status === "completed").length
    const pending = services.filter(service => service.status === "pending").length
    const inProgress = services.length - completed - pending;

    const data = {
        labels: ['Completed', 'Pending', 'In Progress'],
        datasets: [
            {
                label: 'Status',
                data: [completed, pending, inProgress],
                backgroundColor: [
                    'rgba(40, 167, 69, 1)',
                    'rgba(200, 200, 200, 1)',
                    'rgba(0, 123, 255, 1)',
                ],
                borderColor: [
                    'rgba(151, 255, 98, 1)',
                    'rgba(140, 138, 138, 1)',
                    'rgba(0, 165, 194, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Doughnut data={data} />
    )
}
