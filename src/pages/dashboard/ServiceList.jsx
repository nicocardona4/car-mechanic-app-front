import { useDispatch, useSelector } from "react-redux"
import ServiceTable  from "./ServiceTable"
import { useNavigate } from "react-router";
import { setServices , setServicesLoading } from "../../store/features/servicesSlice";
import { useEffect, useState } from "react";
import { API_URL } from "../../api/config";
import Spinner from "../../components/Spinner";
import { reauth } from "../../utils/reauthUtils";




const ServiceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


   useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      reauth(navigate);
      return;
    }
    console.log(setServicesLoading);
    console.log("Loading desde selector (antes del fetch):", loading);
     dispatch(setServicesLoading(true));
  console.log("Después del setServicesLoading dispatch (pero antes del re-render):", loading);
  
    fetch(API_URL + "/v1/services",
      {
        method: "GET",
        headers: {
          "authorization": token
        }
      }
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        if (response.status === 401) {
          throw new Error("UNAUTHORIZED");
        }
      })
      .then(data => {
        dispatch(setServices(data))
      })
      .catch(e => {
        if (e.message === "UNAUTHORIZED") {
          reauth(navigate);
        }
      })
      .finally(() => {
        dispatch(setServicesLoading(false));
      });
  }, []);

  const services = useSelector(state => state.services.services);
  const loading = useSelector(state => state.services.loading);

  console.log("⏱ Render actual → Services:", loading);



if (loading) {
  return (
    <div className="page-spinner">
      <Spinner />
    </div>
  );
}



  return (
    <div className="todos-table shadow-sm p-6 rounded-xl bg-white">
      { services.length > 0 ? (
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
