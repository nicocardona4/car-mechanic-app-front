import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, createService, removeService, modifyService } from '../../store/features/servicesSlice';
import { useNavigate } from 'react-router';

const API_URL = '';

function Dashboard({ user, onLogout }) {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector(state => state.services);
  
  const [serviceTypes, setServiceTypes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);

  // Form states
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
      .then(response => {
        if (response.status !== 200) {
          console.error('Error fetching service types:', response);
          throw new Error('Error al cargar tipos de servicio');
        }
        return response.json();
      })
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

    // Limpiar formulario
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

  const handleChangePlan = () => {
    if (!window.confirm('¿Estás seguro de cambiar a plan Premium?')) return;

    fetch(`${API_URL}/v1/users/change-plan`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ plan: 'premium' })
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Error al cambiar plan');
        }
        return response.json();
      })
      .then(() => {
        const updatedUser = { ...user, plan: 'premium' };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Filtrar servicios
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
    return <div style={{ textAlign: 'center', padding: '50px' }}>Cargando...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <div>
          {user && <h1>Dashboard</h1>}
          {user && <p>Welcome, {user.username}</p>}
        </div>
        <button 
          onClick={onLogout}
          style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}
        >
         Log Out
        </button>
      </div>

      {error && (
        <div style={{ padding: '15px', backgroundColor: '#f8d7da', color: '#721c24', marginBottom: '20px' }}>
          {error}
        </div>
      )}

    
      <div style={{ display: 'grid', gridTemplateColumns: user?.plan === 'plus' ? '2fr 1fr' : '1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Usage Report</h3>
          {user?.plan === 'plus' ? (
            <>
              <p>Plan: <strong>Plus</strong></p>
              <p>Services: {services.length} / {maxServices}</p>
              <div style={{ width: '100%', height: '24px', backgroundColor: '#e0e0e0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${usagePercentage}%`, 
                  height: '100%', 
                  backgroundColor: usagePercentage > 80 ? '#dc3545' : '#28a745'
                }}></div>
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
          <div style={{ border: '2px solid #ffc107', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h3>Upgrade to Premium</h3>
            <p>Unlimited services</p>
            <button 
              onClick={handleChangePlan}
              style={{ padding: '10px 20px', backgroundColor: '#ffc107', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Change plan 
            </button>
          </div>
        )}
      </div>

   
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <label style={{ marginRight: '10px' }}>Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Historical</option>
            <option value="week">Last Weeh</option>
            <option value="month">Last Month</option>
          </select>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          disabled={!canAddService}
          style={{
            padding: '10px 20px',
            backgroundColor: canAddService ? '#28a745' : '#ccc',
            color: 'white',
            border: 'none',
            cursor: canAddService ? 'pointer' : 'not-allowed'
          }}
        >
          {showAddForm ? 'Cancel' : '+ Add Service'}
        </button>
      </div>

   
      {!canAddService && (
        <div style={{ padding: '15px', backgroundColor: '#fff3cd', color: '#856404', marginBottom: '20px' }}>
          You have reached the limit of your current plan
        </div>
      )}

    
      {showAddForm && (
        <div style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
          <h3>New Service</h3>
          <form onSubmit={handleAddService}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input 
                type="text" 
                placeholder="Client" 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)}
                style={{ padding: '8px' }}
              />
              <input 
                type="text" 
                placeholder="Brand" 
                value={brand} 
                onChange={(e) => setBrand(e.target.value)}
                style={{ padding: '8px' }}
              />
              <input 
                type="text" 
                placeholder="Model" 
                value={model} 
                onChange={(e) => setModel(e.target.value)}
                style={{ padding: '8px' }}
              />
              <input 
                type="text" 
                placeholder="License Plate" 
                value={licensePlate} 
                onChange={(e) => setLicensePlate(e.target.value)}
                style={{ padding: '8px' }}
              />
              <select 
                value={serviceType} 
                onChange={(e) => setServiceType(e.target.value)}
                style={{ padding: '8px' }}
              >
                <option value="">Service Type</option>
                {serviceTypes.map(type => (
                  <option key={type._id} value={type._id}>{type.name}</option>
                ))}
              </select>
              <input 
                type="url" 
                placeholder="Image URL (optional)" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)}
                style={{ padding: '8px' }}
              />
            </div>
            <textarea 
              placeholder="Description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '15px', minHeight: '80px' }}
            />
            <button 
              type="submit" 
              disabled={!isFormValid}
              style={{ 
                marginTop: '15px', 
                padding: '10px 20px', 
                backgroundColor: isFormValid ? '#007bff' : '#ccc', 
                color: 'white', 
                border: 'none', 
                cursor: isFormValid ? 'pointer' : 'not-allowed'
              }}
            >
              Create Service
            </button>
          </form>
        </div>
      )}


      <div>
        <h2>Servicios ({filteredServices.length})</h2>
        {filteredServices.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
           THere is no services registered
          </p>
        ) : (
          filteredServices.map(service => (
            <div key={service._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <h3>{service.clientName} - {service.brand} {service.model}</h3>
                  <p>License Plate: {service.licensePlate}</p>
                  <p>{service.description}</p>
                  <small>Created: {new Date(service.createdAt).toLocaleDateString()}</small>
                  
                  {editingServiceId === service._id ? (
                    <div style={{ marginTop: '10px' }}>
                      <select 
                        value={service.status} 
                        onChange={(e) => handleUpdateStatus(service._id, e.target.value)}
                        style={{ padding: '5px', marginRight: '10px' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">in progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button 
                        onClick={() => setEditingServiceId(null)}
                        style={{ padding: '5px 10px' }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p>Status: <strong>{service.status}</strong></p>
                  )}
                </div>
                {service.imageUrl && (
                  <img 
                    src={service.imageUrl} 
                    alt="Service" 
                    style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} 
                  />
                )}
              </div>
              <div style={{ marginTop: '10px' }}>
                <button 
                  onClick={() => setEditingServiceId(service._id)}
                  style={{ padding: '5px 10px', marginRight: '10px', backgroundColor: '#ffc107', border: 'none', cursor: 'pointer' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteService(service._id)}
                  style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;