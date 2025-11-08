import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './dashboard.css';
import ServiceList from './ServiceList';
import Nav from './Nav';
import Chart from './Chart';

const API_URL = '';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Nav />
      <ServiceList/>
      <div>
      <Chart />
      </div>
    </div>
  );
}

export default Dashboard;
