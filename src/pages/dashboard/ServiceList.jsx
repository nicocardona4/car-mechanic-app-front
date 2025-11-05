import { useSelector , useDispatch} from "react-redux"
import { AddService } from "./AddService"
import ServiceTable  from "./ServiceTable"
import { useNavigate } from "react-router";
import { setServices , setServicesLoading } from "../../features/servicesSlice";
import { useEffect, useState } from "react";
import { BASE_DOMAIN_APP } from "../../api/config";



const ServiceList = () => {
  const services = useSelector(state => state.services.services)
  const dispatch = useDispatch();
  const navigate = useNavigate();

   useEffect(() => {
    localStorage.setItem("userToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlZmVuc2EiLCJ1c2VySWQiOiI2OGVlZTc2OTZiMjM3N2Y2MzczNTYwNWMiLCJpYXQiOjE3NjIyMjI5NzYsImV4cCI6MTc2MjIyNjU3Nn0.mo2FXEQGYi587XEgBHJubiWUjM26spmL8w3VQc1Mgsk");
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
      return;
    }

    dispatch(setServicesLoading(true));
    fetch(BASE_DOMAIN_APP + "/v1/services",
      {
        method: "GET",
        headers: {
          "authorization": token
        }
      }
    )
      .then(response => {
        console.log("Response status:", response.status);
        console.log("Response:", response);
        if (response.ok) {
          console.log("Response OK");
          return response.json();
        }
        if (response.status === 401) {
          console.log("Response UNAUTHORIZED");
          throw new Error("UNAUTHORIZED");
        }
      })
      .then(data => {
        console.log("Fetched services:", data);
        dispatch(setServices(data))
      })
      .catch(e => {
        if (e.message === "UNAUTHORIZED") {
          navigate('/login');
        }
      })
      .finally(() => dispatch(setServicesLoading(false)));
  }, [])

  return (
    <div className="todos-table shadow-sm p-6 rounded-xl bg-white">
      <AddService />
      {services.length > 0 ? (
        <ServiceTable />
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-12 text-gray-600">
          <h2 className="text-2xl font-semibold mb-2">Todavía no tenés servicios</h2>
          <p className="text-gray-500 mb-4">
            Agregá tu primer servicio para empezar a organizarte 🚀
          </p>
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl">
            ☕
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiceList
