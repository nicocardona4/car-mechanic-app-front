import { useDispatch } from "react-redux";
import { deleteService, updateService } from "../../features/servicesSlice";

const ServiceListItem = ({ id, customerName, licensePlate, serviceType, status }) => {

  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(deleteService(id));
  }

  const handleCompleteService = () => {
    //id
    //datos modificados

    const payload = {
      id: id,
      updatedService: { status: !status }
    }
    dispatch(updateTodo(payload))
  }

  return (
    <tr>
      <td>{customerName}</td>
      <td>{licensePlate}</td>
      <td>{serviceType}</td>
<td>
  <span
    className={`badge ${
      status === "completed"
        ? "bg-success"
        : status === "pending"
        ? "bg-warning"
        : status === "in-progress"
        ? "bg-danger"
        : "bg-secondary"
    }`}
  >
    {status}
  </span>
</td>
   
<td>
  {status === "pending" ? (
    <button
      onClick={() => handleCompleteService("in-progress")}
      className="btn btn-sm btn-primary"
    >
      <i className="bi bi-play-circle me-2"></i> Start Service
    </button>
  ) : status === "in-progress" ? (
    <button
      onClick={() => handleCompleteService("completed")}
      className="btn btn-sm btn-success"
    >
      <i className="bi bi-check-circle me-2"></i> Complete Service
    </button>
  ) : null}
</td>

      <td>
        <button onClick={handleOnClick} className="btn btn-sm btn-danger">
          <i className="bi bi-trash me-2"></i> Eliminar
        </button>
      </td>
    </tr>
  )
}

export default ServiceListItem