import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, createService, removeService, modifyService } from '../../store/features/servicesSlice';
import { useNavigate } from 'react-router';
import './dashboard.css';
import ServiceList from './ServiceList';

const API_URL = '';

function Dashboard({ user, onLogout }) {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector(state => state.services);

  const [serviceTypes, setServiceTypes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);

  const [clientName, setClientName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate("/login")
      return;
    }
    dispatch(fetchServices(token));
    loadServiceTypes(token);
  }, [dispatch]);

  const loadServiceTypes = (token) => {
    fetch(`${API_URL}/v1/service-types`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
      .then(response => response.json())
      .then(data => setServiceTypes(data))
      .catch(error => console.error('Error:', error));
  };

  const handleAddService = (e) => {
    e.preventDefault();

    const serviceData = {
      clientName,
      brand,
      model,
      licensePlate,
      serviceType,
      imageUrl,
      description
    };

    dispatch(createService(serviceData));

    setClientName('');
    setBrand('');
    setModel('');
    setLicensePlate('');
    setServiceType('');
    setImageUrl('');
    setDescription('');
    setShowAddForm(false);
  };

  const handleDeleteService = (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este servicio?')) return;
    dispatch(removeService(id));
  };

  const handleUpdateStatus = (id, newStatus) => {
    dispatch(modifyService(id, { status: newStatus }));
    setEditingServiceId(null);
  };

  const filteredServices = services.filter(service => {
    const serviceDate = new Date(service.createdAt);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    if (filter === 'week') return serviceDate >= weekAgo;
    if (filter === 'month') return serviceDate >= monthAgo;
    return true;
  });

  const maxServices = user?.plan === 'plus' ? 10 : Infinity;
  const canAddService = user?.plan === 'premium' || services.length < maxServices;
  const usagePercentage = user?.plan === 'plus' ? (services.length / maxServices) * 100 : 0;
  const isFormValid = clientName && brand && model && licensePlate && serviceType && description;

  if (loading && services.length === 0) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          {user && <h1>Dashboard</h1>}
          {user && <p>Welcome, {user.username}</p>}
        </div>
        <button onClick={onLogout} className="logout-button">Log Out</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="usage-section">
        <div className="usage-box">
          <h3>Usage Report</h3>
          {user?.plan === 'plus' ? (
            <>
              <p>Plan: <strong>Plus</strong></p>
              <p>Services: {services.length} / {maxServices}</p>
              <div className="usage-bar">
                <div className="usage-progress" style={{ width: `${usagePercentage}%` }}></div>
              </div>
            </>
          ) : (
            <>
              <p>Plan: <strong>Premium</strong></p>
              <p>Services: {services.length} (unlimited)</p>
            </>
          )}
        </div>

        {user?.plan === 'plus' && (
          <div className="upgrade-box">
            <h3>Upgrade to Premium</h3>
            <p>Unlimited services</p>
            <button onClick={handleChangePlan} className="upgrade-button">Change plan</button>
          </div>
        )}
      </div>

      <div className="filter-section">
        <div>
          <label>Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Historical</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          disabled={!canAddService}
          className={`add-button ${!canAddService ? 'disabled' : ''}`}
        >
          {showAddForm ? 'Cancel' : '+ Add Service'}
        </button>
      </div>

      {!canAddService && <div className="warning-message">You have reached the limit of your current plan</div>}

      {showAddForm && (
        <div className="add-form">
          <h3>New Service</h3>
          <form onSubmit={handleAddService}>
            <div className="form-grid">
              <input type="text" placeholder="Client" value={clientName} onChange={(e) => setClientName(e.target.value)} />
              <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
              <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
              <input type="text" placeholder="License Plate" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} />
              <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                <option value="">Service Type</option>
                {serviceTypes.map(type => (
                  <option key={type._id} value={type._id}>{type.name}</option>
                ))}
              </select>
              <input type="url" placeholder="Image URL (optional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </div>
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit" className={`submit-button ${!isFormValid ? 'disabled' : ''}`}>Create Service</button>
          </form>
        </div>
      )}

      <ServiceList/>
    </div>
  );
}

export default Dashboard;
