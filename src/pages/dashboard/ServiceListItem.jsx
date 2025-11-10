import { useDispatch } from "react-redux";
import { deleteService, updateService } from "../../store/features/servicesSlice";
import "./ServiceListItem.css";
import { API_URL } from "../../api/config";
import { reauth } from "../../utils/reauthUtils";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import SmallSpinner from "../../components/SmallSpinner";
import { set } from "react-hook-form";

const ServiceListItem = ({ id, customerName, licensePlate, serviceType, status ,imageUrl }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
 useEffect(() => {
  setIsLoading(false);
  }, [status]);

  const handleOnClick = () => {
    setIsLoading(true);
    fetch(API_URL + "/v1/services/" + id, {
      method: "DELETE",
      headers: {
        "authorization": localStorage.getItem("userToken")
      }
    })
      .then(response => {
        if (response.ok) {
          dispatch(deleteService(id));
          return;
        }
        if (response.status === 401) throw new Error("UNAUTHORIZED");
        throw new Error("INTERNAL_ERROR");
      })
      .catch(e => {
        if (e.message === "UNAUTHORIZED") return reauth(navigate);
        toast.error("An error occurred while deleting the service.");
      })
      // .finally(() => setIsLoading(false));
  };

  const handleCompleteService = (newStatus) => {
    setIsLoading(true)
    const body = { status: newStatus }
    const payload = { id, updatedService: body }

    fetch(API_URL + "/v1/services/" + id, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "authorization": localStorage.getItem("userToken"),
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) return dispatch(updateService(payload));

        if (response.status === 401) throw new Error("UNAUTHORIZED");
        throw new Error("INTERNAL_ERROR");
      })
      .catch(e => {
        if (e.message === "UNAUTHORIZED") return reauth(navigate);
        toast.error("An error occurred while updating the service status.");
      })
      // .finally(() => setIsLoading(false)); LO COMENTO PARA QUE NO SE VEA POR UN SEGUNDO LA FILA. IGUALMENTE EL PADRE ESCUCHA EL EL CAMBIO EN EL SERVICES GLOBAL Y SE EJECUTA DE NUEVO EL FILTRO
  };

  if (isLoading) {
    return (
      <tr className="service-row">
        <td colSpan="6">
          <SmallSpinner />
        </td>
      </tr>
    );
  }

  return (
    <tr className="service-row">
      <td data-label="Customer">{customerName}</td>
      <td data-label="License plate">{licensePlate}</td>
      <td data-label="Service type">{serviceType}</td>

      {/* Badge status */}
      <td data-label="Status">
        <span className={`status-badge status-${status}`}>
          {status}
        </span>
      </td>

      <td data-label="Image">
        {imageUrl ? <img src={imageUrl} alt="Service" className="service-image" /> : "No image"}
      </td>

      {/* Action: Start / Complete / ✔ */}
      <td data-label="Action">
        <>
          {status === "pending" && (
            <button
              onClick={() => handleCompleteService("in-progress")}
              className="action-btn btn-start"
            >
              ▶
            </button>
          )}

          {status === "in-progress" && (
            <button
              onClick={() => handleCompleteService("completed")}
              className="action-btn btn-complete"
            >
              ✓
            </button>
          )}

          {status === "completed" && (
            <span className="completed-icon" title="Service completed">
              ✓
            </span>
          )}
        </>
      </td>

      {/* Delete */}
      <td data-label="Delete">
        <button onClick={handleOnClick} className="action-btn btn-delete">
          ✕
        </button>
      </td>
    </tr>
  );
};

export default ServiceListItem;
