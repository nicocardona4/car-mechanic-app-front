import { useDispatch } from "react-redux";
import { deleteService, updateService } from "../../store/features/servicesSlice";
import "./ServiceListItem.css";
import { API_URL } from "../../api/config";
import { reauth } from "../../utils/reauthUtils";


const ServiceListItem = ({ id, customerName, licensePlate, serviceType, status }) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(deleteService(id));
  };

  const handleCompleteService = (newStatus) => {
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
        toast.error("An error occurred while updating the service status.");
      })
      .finally(() => setIsLoading(false))
  };

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

      {/* Acciones */}
      <td>
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
      </td>

      <td>
        <button onClick={handleOnClick} className="action-btn btn-delete">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ServiceListItem;
