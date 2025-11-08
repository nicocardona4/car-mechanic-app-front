import { useDispatch, useSelector } from "react-redux"
import ServiceListItem from "./ServiceListItem"
import { useEffect, useState } from "react"
import { setServices } from "../../store/features/servicesSlice";
import "./ServiceTable.css"
import { useNavigate } from "react-router";
import { set } from "react-hook-form";
import Spinner from "../../components/Spinner";
import { API_URL } from "../../api/config";

const ServiceTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



  const services = useSelector(state => state.services.services)
  return (
     <table className="table text-center table-hover mb-0">
        <thead>
          <tr>
            <th>Customer name</th>
            <th>License plate</th>
            <th>Service type</th>
            <th>Status</th>
            <th>Image</th>
            <th></th>
            <th><button
              className="add-service-btn"
              onClick={() => navigate("/newService")}
            >
              +
            </button></th>
          </tr>
        </thead>
        <tbody>
          {loading ? <tr><Spinner /></tr> : services.map(service => <ServiceListItem key={service.id} id={service.id} customerName={service.customerName} licensePlate={service.licensePlate} serviceType={service.serviceType} status={service.status} imageUrl={service.imageUrl} />)}
        </tbody>
      </table>
  )
}



export default ServiceTable