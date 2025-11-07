import { useNavigate } from "react-router";
import "./Nav.css";
import { API_URL } from "../../api/config";

const Nav = () => {
  const navigate = useNavigate();

  const handleOnClickLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

const handleOnClickUpgrade = () => {
  const confirmChange = window.confirm("Are you sure you want to upgrade your plan?");
  if (!confirmChange) return; // Si cancela, no hace nada

  const token = localStorage.getItem("userToken");

  fetch(API_URL + "/v1/users/change-plan", {
    method: "PUT",
    headers: {
      "Authorization": `${token}`, 
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response);
      }
      return response.json();
    })
    .then(data => {
      console.log("Plan updated:", data);
      alert("✅ Plan upgraded successfully!");
    })
    .catch(error => {
      console.error("Error upgrading plan:", error);
      alert("❌ Something went wrong while upgrading the plan");
    });
};



  return (
    <nav className="nav-container">
      <span className="nav-title">Car Mechanic App</span>

      <div className="nav-actions">
        <button onClick={handleOnClickUpgrade} className="btn-upgrade">Upgrade Plan now!</button>
        <button onClick={handleOnClickLogout} className="btn-logout">Logout</button>
      </div>
    </nav>
  );
};

export default Nav;
