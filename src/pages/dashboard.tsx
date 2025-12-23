import UserDashboard from "../components/customerDashboard";
import AdminDashboard from "../components/adminDashboard";
import AgentDashboard from "../components/agentDashboard";
import { useAuth } from "../context/authContext";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const context = useAuth();
  if (!context?.user) 
    return <div>Please log in to view the dashboard.</div>;
  const user = context?.user;

  if(user.role === "admin") 
    return <AdminDashboard/>;
  else if(user.role === "customer")
    return <UserDashboard/>;
  else
    return <AgentDashboard />;

  <Outlet />
 
}
export default Dashboard;