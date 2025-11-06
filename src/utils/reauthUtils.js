export const reauth = navigate => {
    localStorage.removeItem("userToken");
    navigate("/login")
}