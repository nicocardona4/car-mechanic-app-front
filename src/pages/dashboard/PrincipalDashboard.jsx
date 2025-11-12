import './Dashboard.css';
import ServiceList from './ServiceList';
import Nav from './Nav';
import Chart from './Chart';
import Info from './Info';

const API_URL = '';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Nav />
      <Info />
      <ServiceList/>
      <div>
      <Chart />
      </div>
    </div>
  );
}

export default Dashboard;
