import { useForm } from "react-hook-form";
import { API_URL } from "../../api/config";
import { useNavigate } from "react-router";
import "./NewService.css";
import { toast } from "react-toastify";
import { reauth } from "../../utils/reauthUtils";
import { useState, useEffect } from "react";

const NewService = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serviceTypes, setServiceTypes] = useState([]);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

 useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      reauth(navigate);
      return;
    }

    fetch(API_URL + "/v1/service-types", {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setServiceTypes(data);
      })
      .catch((err) => {
        toast.error("Error fetching service types");
        console.log(err);
      });
  }, []);

  const onSubmit = async (body) => {
      
      const token = localStorage.getItem("userToken");
      setIsLoading(true);
      fetch(API_URL + "/v1/services",
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            }
        ).then(response => {
            if (response.status === 401) {
                throw new Error("UNAUTHORIZED");
            }
            return response.json()
        }).then(data => {
            toast.success("Service created successfully");
            navigate("/dashboard")
        }).catch(error => {
            if (error.message === "UNAUTHORIZED") {
                reauth(navigate);
            } else {
                toast.error("Error creating service");
            }
        }).finally(() => {
            setIsLoading(false);
        })
  }
  
  return (
    <div className="new-service-container">
      <form className="new-service-card" onSubmit={handleSubmit(onSubmit)}>
        <h2>New Service</h2>

        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            id="customerName"
            {...register("customerName", { required: "Required" })}
            type="text"
            placeholder="John Doe"
          />
          {errors.customerName && (
            <span className="field-error">{errors.customerName.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            id="brand"
            {...register("brand", { required: "Required" })}
            type="text"
            placeholder="Ferrari"
          />
          {errors.brand && (
            <span className="field-error">{errors.brand.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input
            id="model"
            {...register("model", { required: "Required" })}
            type="text"
            placeholder="488 Spider"
          />
          {errors.model && (
            <span className="field-error">{errors.model.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            id="year"
            {...register("year", {
              required: "Required",
              min: { value: 1900, message: "Must be >= 1900" },
              max: { value: new Date().getFullYear(), message: "Invalid year" },
              valueAsNumber: true,
            })}
            type="number"
            placeholder="2005"
          />
          {errors.year && (
            <span className="field-error">{errors.year.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="licensePlate">License Plate</label>
          <input
            id="licensePlate"
            {...register("licensePlate", {
              required: "Required",
              minLength: { value: 6, message: "Min 6 chars" },
            })}
            type="text"
            placeholder="ABC1234"
          />
          {errors.licensePlate && (
            <span className="field-error">{errors.licensePlate.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="serviceType">Service Type</label>
        <select
          id="serviceType"
          {...register("serviceType", { required: "Required" })}
        >
          <option value="">Select one</option>
          {serviceTypes.map((type) => (
  <option key={type.name} value={type.name}>
    {type.name}
  </option>
))}

        </select>
        {errors.serviceType && (
          <span className="field-error">{errors.serviceType.message}</span>
        )}
        </div>

        <div className="form-group">
          <label htmlFor="cost">Cost ($)</label>
          <input
            id="cost"
            {...register("cost", {
              required: "Required",
              min: { value: 1, message: "Must be > 0" },
              valueAsNumber: true,
            })}
            type="number"
            placeholder="500"
          />
          {errors.cost && (
            <span className="field-error">{errors.cost.message}</span>
          )}
        </div>

        <button type="submit" disabled={!isValid || isLoading}>
          {isLoading ? "Saving..." : "Add Service"}
        </button>
      </form>
    </div>
  );
};

export default NewService;
