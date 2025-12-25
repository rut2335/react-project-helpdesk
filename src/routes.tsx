import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import TicketDetail from "./components/ticketDetail";
import Tickets from "./components/tickets";
import Register from "./pages/register";
import AddTickets from "./components/addTickets";
import UserManagement from "./components/userManagement";
import PriorityStatus from "./components/priorityAndStatus";
import RoleGuard from "./components/roleGuard";
import NotFound from "./components/notFound";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";

function Routs() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    <Route path="/dashboard" element={<RoleGuard allowedRoles={['admin', 'agent', 'customer']}><Dashboard /></RoleGuard>} >
                        <Route path="tickets" element={<Tickets />} />
                        <Route path="tickets/new" element={<RoleGuard allowedRoles={['customer']}><AddTickets /></RoleGuard>} />
                        <Route path="tickets/:id" element={<TicketDetail />} />
                        
                        <Route path="users" element={<RoleGuard allowedRoles={['admin']}><UserManagement /></RoleGuard>} />
                        <Route path="statusPriority" element={<RoleGuard allowedRoles={['admin']}><PriorityStatus /></RoleGuard>} />
                    </Route>
                    
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default Routs;