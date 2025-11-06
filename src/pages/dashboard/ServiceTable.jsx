import { useDispatch, useSelector } from "react-redux"
import ServiceListItem from "./ServiceListItem"
import { useEffect } from "react"
import { setServices } from "../../store/features/servicesSlice";

const ServiceTable = () => {
  const dispatch = useDispatch();

//   useEffect(async() => {
//     fetch("url")
//     .then(response => response.json())
//     .then(data => dispatch(setServices(data)));
//   }, [])

  const services = useSelector(state => state.services.services)
  return (
    <table className="table text-center table-hover mb-0">
      <thead>
        <tr>
          <th>Customer name</th>
          <th>License plate</th>
          <th>Service type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {services.map(service => <ServiceListItem key={service.id} customerName={service.customerName} licensePlate={service.licensePlate} serviceType={service.serviceType} status={service.status} />)}
      </tbody>
    </table>
  )
}



export default ServiceTable