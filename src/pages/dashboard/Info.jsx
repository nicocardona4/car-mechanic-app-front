import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import "./Info.css";

const Info = () => {
  const token = localStorage.getItem("userToken");
  let userType = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userType = decoded.userType; 
    } catch (error) {
      console.error("Invalid token", error);
    }
  }
  const servicesCount = useSelector(state => state.services.services.length);
  const MAX_SERVICES = 10;
  const percentage = userType === "plus" ? Math.min((servicesCount / MAX_SERVICES) * 100, 100) : null;
  const remaining = userType === "plus" ? MAX_SERVICES - servicesCount : null;

  // 🔹 Determinar color según cantidad de servicios
  let progressColor = "#22c55e"; // verde (0-2)
  if (servicesCount >= 3 && servicesCount <= 5) progressColor = "#eab308"; // amarillo
  else if (servicesCount >= 6 && servicesCount <= 7) progressColor = "#f97316"; // naranja
  else if (servicesCount >= 8) progressColor = "#dc2626"; // rojo

   return (
    <div className="info-container">

      {userType === "premium" && (
        <div className="info-card premium">
          <h3>Plan Premium</h3>
          <p className="info-text">You currently have <strong>{servicesCount}</strong> services registered.</p>
        </div>
      )}

      {userType === "plus" && (
        <div className="info-card plus">
          <h3>Plan Plus</h3>
          <p className="info-text">
            You’ve used <strong>{servicesCount}</strong> of <strong>{MAX_SERVICES}</strong> services.
          </p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${percentage}%`,
                backgroundColor: progressColor
              }}
            ></div>
          </div>

          <p className="remaining-text">
            {remaining > 0
              ? `${remaining} service${remaining !== 1 ? "s" : ""} remaining`
              : "You’ve reached your service limit"}
          </p>
        </div>
      )}

      {!userType && <p className="info-error">No user information available.</p>}
    </div>
  );
};

export default Info;