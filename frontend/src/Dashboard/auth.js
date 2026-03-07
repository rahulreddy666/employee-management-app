/* =========================================================
   AUTH UTILITIES — FINAL STABLE VERSION
========================================================= */

/* ---------- Get logged user ---------- */
export const getLoggedInUser = () => {
  try {
    return JSON.parse(localStorage.getItem("loggedInUser"));
  } catch {
    return null;
  }
};


/* ---------- Get token ---------- */
export const getToken = () => {
  return localStorage.getItem("token");
};


/* ---------- Check login ---------- */
export const isLoggedIn = () => {
  const token = getToken();
  const user = getLoggedInUser();

  // ✅ MUST be BOTH present
  return !!token && !!user;
};


/* ---------- Role Helpers ---------- */
export const isAdmin = () => {
  const user = getLoggedInUser();
  return user?.role === "ADMIN";
};

export const isEmployee = () => {
  const user = getLoggedInUser();
  return user?.role === "EMPLOYEE";
};


/* ---------- Logout ---------- */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedInUser");
};
