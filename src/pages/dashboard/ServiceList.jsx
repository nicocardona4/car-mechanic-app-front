import { useDispatch, useSelector } from "react-redux"
import ServiceTable from "./ServiceTable"
import { useNavigate } from "react-router";
import { setServices, setServicesLoading } from "../../store/features/servicesSlice";
import { useEffect, useState } from "react";
import { API_URL } from "../../api/config";
import Spinner from "../../components/Spinner";
import { reauth } from "../../utils/reauthUtils";
import "./ServiceList.css";




const ServiceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      reauth(navigate);
      return;
    }
    dispatch(setServicesLoading(true));
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

  const [filters, setFilters] = useState({
    status: "all",
    startDate: "",
    endDate: "",
  });

  const handleFilterChange = (field, value) => {
    const updated = { ...filters, [field]: value };

    if (field === "range" && value !== "all") {
        updated.startDate = "";
        updated.endDate = "";
    }

    setFilters(updated);

    const token = localStorage.getItem("userToken");
    dispatch(setServicesLoading(true));

    let queryParams = "";
    let start = updated.startDate;
    let end = updated.endDate;

    if (updated.range === "week") {
      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);

      start = lastWeek.toISOString().split("T")[0];
      end = today.toISOString().split("T")[0];
    }

    if (updated.range === "month") {
      const today = new Date();
      const lastMonth = new Date();
      lastMonth.setMonth(today.getMonth() - 1);

      start = lastMonth.toISOString().split("T")[0];
      end = today.toISOString().split("T")[0];
    }

    if (updated.status !== "all") {
      queryParams += `?status=${updated.status}`;
    }

    if (start) {
      queryParams += queryParams ? "&" : "?";
      queryParams += `startDate=${start}`;
    }
    if (end) {
      queryParams += queryParams ? "&" : "?";
      queryParams += `endDate=${end}`;
    }

    console.log("Query:", queryParams);

    fetch(API_URL + "/v1/services" + queryParams,
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
  }



  if (loading) {
    return (
      <div className="page-spinner">
        <Spinner />
      </div>
    );
  }



  return (
    <><div className="filters-container">

      {/* STATUS FILTER */}
      <div className="filter-group">
        <label>Status</label>
        <select
          className="filter-input"
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
        </select>
      </div>

      {/* QUICK RANGE FILTER */}
      <div className="filter-group">
        <label>Range</label>
        <select
          value={filters.range}
          className="filter-input"
          onChange={(e) => handleFilterChange("range", e.target.value)}
        >
          <option value="all">All</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
        </select>
      </div>

      {/* START DATE */}
      <div className="filter-group">
        <label>From</label>
        <input
          type="date"
          value={filters.startDate}
          className="filter-input"
          onChange={(e) => handleFilterChange("startDate", e.target.value)}
        />
      </div>

      {/* END DATE */}
      <div className="filter-group">
        <label>To</label>
        <input
          type="date"
          value={filters.endDate}
          className="filter-input"
          onChange={(e) => handleFilterChange("endDate", e.target.value)}
        />
      </div>

    </div>
      <div className="service-list-container">
        {services.length > 0 ? (
          <ServiceTable />
        ) : (
          <div className="empty-state">
            <div className="empty-image">
              <svg width="150" viewBox="0 0 24 24" fill="none">
                <path d="M3 13L5 6H19L21 13" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5 6L9 3H15L19 6" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="7" cy="16" r="2.5" stroke="#2563eb" strokeWidth="1.5" />
                <circle cx="17" cy="16" r="2.5" stroke="#2563eb" strokeWidth="1.5" />
                <path d="M3 13H21" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            <h2 className="empty-title">{filters.status === "all" && filters.range === "all" && filters.startDate === "" && filters.endDate === "" ? `No services added yet` : `No services added with the current filters`}</h2>
            <p className="empty-text">
              Add a service record to track repairs, maintenance and inspections efficiently.
            </p>

            <button
              className="add-service-btn"
              onClick={() => navigate("/newService")}
            >
              Add a New Service
            </button>
          </div>
        )}
      </div>
    </>
  );


}

export default ServiceList
