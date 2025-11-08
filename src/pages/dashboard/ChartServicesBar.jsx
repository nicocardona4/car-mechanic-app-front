import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const ChartServicesBar = () => {
    const services = useSelector(state => state.services.services);
    const repair = services.filter(service => service.serviceType === "repair").length
    const maintenance = services.filter(service => service.serviceType === "maintenance").length
    const inspection = services.filter(service => service.serviceType === "inspection").length

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const labels = ['Repair', 'Maintenance', 'Inspection'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Repair vs. Maintenance vs. Inspection',
                data: [repair, maintenance, inspection],
                backgroundColor: 'rgba(99, 172, 255, 0.5)',
            },
            {
                label: 'Total',
                data: [repair.length, maintenance.length, inspection.length],
                backgroundColor: 'rgba(99, 172, 255, 0.5)',
            }
        ],
    };
    return (
        <Bar options={options} data={data} />
    )
}
