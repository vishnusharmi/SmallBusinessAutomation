import { Route, Routes } from "react-router";

import Layout from "../pages/Layout/Layout.jsx";
import Login from "../components/Auth/Login/Login.jsx";

// ADMIN DASHBOARD IMPORTS
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import Disputes from "../pages/adminDashboard/pages/Disputes/Disputes.jsx";
import Employer from "../pages/adminDashboard/pages/Employer/Employer.jsx";
import Monitoring from "../pages/adminDashboard/pages/Monitoring/Monitoring.jsx";
import SecurityCompliances from "../pages/adminDashboard/pages/SecurityCompliance/SecurityCompliance.jsx";

// EMPLOYER DASHBOARD IMPORTS
import EmployerDashboard from "../pages/employerDashboard/EmployerDashboard";
import Analytics from "../pages/employerDashboard/pages/Analytics/Analytics.jsx";
import Blacklist from "../pages/employerDashboard/pages/Blacklist/Blacklist.jsx";
import EmployeeList from "../pages/employerDashboard/pages/EmployeeList/EmployeeList.jsx";
import History from "../pages/employerDashboard/pages/History/History.jsx";
import Reviews from "../pages/employerDashboard/pages/Reviews/Reviews.jsx";
import Records from "../pages/adminDashboard/pages/Records/Records.jsx";

import EmployerVerificationSearch from "../pages/employerDashboard/pages/EmployerVerificationSearch/EmployerVerificationSearch.jsx";
import EmployeeRatingsFeedback from "../pages/employerDashboard/pages/RatingsAndFeedback/EmployeeRatingsFeedback.jsx";
import UserManagement from "../pages/adminDashboard/pages/UserManagement/UserManagement.jsx";
import SecurityCompliance from "../pages/employerDashboard/pages/SecurityCompliance/SecurityCompliance.jsx";
import AdminSettings from "../pages/adminDashboard/pages/Settings/AdminSettings.jsx";
import EmployeeAdminSettings from "../pages/employerDashboard/pages/Settings/EmployeeAdminSettings.jsx";
// import SecurityCompliance from "../pages/employerDashboard/pages/SecurityCompliance/SecurityCompliance.jsx"
import OTP from "../components/Auth/Login/otp.jsx";
import AppTest from "../components/Sample/AppTest.jsx";

const AllRoutes = () => {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="/otp" element={<OTP />} />

      <Route path="/admin" element={<Layout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="/admin/disputes" element={<Disputes />} />
        <Route path="/admin/employer" element={<Employer />} />
        <Route path="/admin/records" element={<Records />} />
        <Route path="/admin/monitoring" element={<Monitoring />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route
          path="/admin/security-compliance"
          element={<SecurityCompliances />}
        />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      <Route path="/company" element={<Layout />}>
        <Route index element={<EmployerDashboard />} />
        <Route path="/company/analytics" element={<Analytics />} />
        <Route path="/company/blacklist" element={<Blacklist />} />
        <Route path="/company/employee-list" element={<EmployeeList />} />
        <Route path="/company/history" element={<History />} />
        <Route
          path="/company/verification"
          element={<EmployerVerificationSearch />}
        />
        <Route path="/company/reviews" element={<Reviews />} />
        <Route
          path="/company/ratings-feedback"
          element={<EmployeeRatingsFeedback />}
        />
        <Route
          path="/company/security-compliance"
          element={<SecurityCompliance />}
        />
        <Route
          path="/company/employee-settings"
          element={<EmployeeAdminSettings />}
        />
      </Route>

      <Route path="/custom" element={<AppTest />} />
    </Routes>
  );
};

export default AllRoutes;
