import { useNavigate } from "react-router";
import "./Nav.css";
import { API_URL } from "../../api/config";
import { useState } from "react";
import { toast } from "react-toastify";
import { set } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setPlan } from "../../store/features/userSlice";


const Nav = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleOnClickLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

const handleOnClickUpgrade = () => {
  const confirmChange = window.confirm("Are you sure you want to upgrade your plan?");
  if (!confirmChange) return;

  const token = localStorage.getItem("userToken");
  setIsLoading(true);
  fetch(API_URL + "/v1/users/change-plan", {
    method: "PUT",
    headers: {
      "Authorization": `${token}`, 
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        toast.success("Plan upgraded successfully!");
        return response.json();
      }
       if (response.status === 401) {
          throw new Error("UNAUTHORIZED");
        }
        if (response.status === 403) {
          throw new Error("FORBIDDEN");
        }
        throw new Error("INTERNAL_ERROR");
    })
    .then(data => {
      localStorage.setItem("userToken", data.token);
      dispatch(setPlan("premium"));
    })
    .catch(error => {
      console.error(error);
    if (error.message === "UNAUTHORIZED") {
          reauth(navigate)
          return;
        }
    if (error.message === "FORBIDDEN") {
        toast.error("You are already on the highest plan.");
        return;
    }
    toast.error("An error occurred while upgrading the plan. Please try again later.");
    })
    .finally(() => setIsLoading(false))

};



  return (
    <nav className="nav-container">
      <span className="nav-title">Car Mechanic App</span>

      <div className="nav-actions">
        <button onClick={handleOnClickUpgrade} className="btn-upgrade">{isLoading ? "Upgrading..." : "Upgrade Plan"}</button>
        <button onClick={handleOnClickLogout} className="btn-logout">Logout</button>
      </div>
    </nav>
  );
};

export default Nav;
