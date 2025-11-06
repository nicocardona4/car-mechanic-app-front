import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './dashboard.css';
import ServiceList from './ServiceList';

const API_URL = '';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <ServiceList/>
    </div>
  );
}

export default Dashboard;
