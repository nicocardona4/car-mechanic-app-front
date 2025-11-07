import { useDispatch } from "react-redux";
import { deleteService, updateService } from "../../store/features/servicesSlice";
import "./ServiceListItem.css";
import { API_URL } from "../../api/config";
import { reauth } from "../../utils/reauthUtils";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Spinner from "../../components/Spinner";
import SmallSpinner from "../../components/SmallSpinner";


const ServiceListItem = ({ id, customerName, licensePlate, serviceType, status }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnClick = () => {
    setIsLoading(true)
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
        if (response.status === 401) {
          throw new Error("UNAUTHORIZED");
        }
        throw new Error("INTERNAL_ERROR");
      })
      .catch(e => {
        if (e.message === "UNAUTHORIZED") {
          reauth(navigate)
          return;
        }
        toast.error("An error occurred while deleting the service.");
      })
      .finally(() => setIsLoading(false))
  }

  const handleCompleteService = (newStatus) => {
    setIsLoading(true)
    const body = { status: newStatus }
    const payload = {
      id: id,
      updatedService: body
    }
    fetch(API_URL + "/v1/services/" + id, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "authorization": localStorage.getItem("userToken"),
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          dispatch(updateService(payload));
          return;
        }

        if (response.status === 401) {
          throw new Error("UNAUTHORIZED");
        }
        throw new Error("INTERNAL_ERROR");
      })
      .catch(e => {
        if (e.message === "UNAUTHORIZED") {
          reauth(navigate)
          return;
        }
        console.error(e);
        toast.error("An error occurred while updating the service status.");
      })
      .finally(() => setIsLoading(false))
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
      
      <td>{customerName}</td>
      <td>{licensePlate}</td>
      <td>{serviceType}</td>

      {/* Badge de estado */}
      <td>
        <span className={`status-badge status-${status}`}>
          {status}
        </span>
      </td>


      <td>

    <>
      {status === "pending" && (
        <button
          onClick={() => handleCompleteService("in-progress")}
          className="action-btn btn-start"
        >
          Start
        </button>
      )}

      {status === "in-progress" && (
        <button
          onClick={() => handleCompleteService("completed")}
          className="action-btn btn-complete"
        >
          Complete
        </button>
      )}

      {status === "completed" && (
      <span title="Service completed" className="completed-icon">✔</span>
      )}

    </>
</td>


      <td>
        <button onClick={handleOnClick} className="action-btn btn-delete">
          🗑️
        </button>
      </td>
    </tr>
  );
};

export default ServiceListItem;
