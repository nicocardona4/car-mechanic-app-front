import { useState } from "react"
import { useDispatch } from "react-redux";
import { addService } from "../../features/servicesSlice";

export const AddService = () => {
  const dispatch = useDispatch();
  const [serviceName, setServiceName] = useState("");

  const handleOnClick = () => {
    const newService = {
      name: serviceName,
      completed: false
    }
    dispatch(addService(newService));
    setServiceName("");
  }

  const handleNameChange = (evt) => {
    setServiceName(evt.target.value)
  }

  const buttonDisabled = serviceName === "";

  return (
    <div className="d-flex mb-3">
      <input onChange={handleNameChange} value={serviceName} type="text" className="form-control me-2" placeholder="Service name" />
      <button onClick={handleOnClick} className="btn btn-primary" disabled={buttonDisabled}>Add Service</button>
    </div>
  )
}