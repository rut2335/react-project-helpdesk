import { useEffect, useState } from "react";
import { addUser, getUser } from "../services/users-service";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { User } from "../model/user";
import Swal from "sweetalert2";
import Loader from "./loading";

const UserManagement = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUsers = async () => {
        try {
            const response = await getUser();
            setUsers(response.data);
        }
        catch (error) {
            console.error("Error fetching users:", error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    if (loading)
        return <Loader></Loader>

    const toAddUser = () => {
        Swal.fire({
            title: "update ticket",
            html: `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                <input type="text" id="Name" class="swal2-input" placeholder="Name" style="margin: 0; width: 80%;" required>
                <input type="text" id="Email" class="swal2-input" placeholder="Email" style="margin: 0; width: 80%;" required>
                <input type="password" id="Password" class="swal2-input" placeholder="Password" style="margin: 0; width: 80%;" required>
                
                <select id="Role" class="swal2-input" style="margin: 0; width: 80%; height: 3.5rem; background-color: white; color: #545454;" required>
                    <option value="" disabled selected>Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="agent">Agent</option>
                    <option value="customer">Customer</option>
                </select>
            </div>
        `,
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "update",
            showLoaderOnConfirm: true,


            preConfirm: async () => {
                const name = (document.querySelector('#Name') as HTMLInputElement).value;
                const email = (document.querySelector('#Email') as HTMLInputElement).value;
                const role = (document.querySelector('#Role') as HTMLInputElement).value;
                const password = (document.querySelector('#Password') as HTMLInputElement).value;

                const namePattern = /^[א-תA-Za-z\s]+$/;
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const passwordPattern = /^(?=.*[A-Za-z])[A-Za-z0-9!@#$%^&*()_\-+=]{4,}$/;

                if (!name || !email || !password || !role) {
                    Swal.showValidationMessage('נא למלא את כל השדות');
                    return false;
                }

                if (!namePattern.test(name)) {
                    Swal.showValidationMessage("השם יכול להכיל רק אותיות ורווחים");
                    return false;
                }

                if (!emailPattern.test(email)) {
                    Swal.showValidationMessage("פורמט אימייל לא תקין");
                    return false;
                }

                if (!passwordPattern.test(password)) {
                    Swal.showValidationMessage("הסיסמה חייבת להכיל לפחות 4 תווים, אותיות ומספרים");
                    return false;
                }

                const user: User = {
                    name: name,
                    email: email,
                    role: role,
                    created_at: new Date().toISOString(),
                    password: password
                }

                try {
                    await addUser(user);
                    return true
                }
                catch (error) {
                    Swal.showValidationMessage(`Request failed: ${error}`);
                    return false;
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                fetchUsers();
                Swal.fire({
                    title: "Updated!",
                    text: "The ticket has been updated successfully.",
                    icon: "success"
                });
            }
        });

    }

    return (
        <>
            <Button variant="contained" sx={{ margin: 2, marginLeft: 10 }} onClick={toAddUser}>הוספת משתמש</Button>
            <TableContainer
                component={Paper}
                sx={{
                    maxWidth: 950,
                    margin: '30px auto',
                    boxShadow: 3,
                    borderRadius: 2
                }}
            >
                <Table sx={{ width: '100%', tableLayout: 'fixed' }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                            <TableCell
                                align="center"
                                sx={{
                                    color: '#1565c0',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    width: '25%'
                                }}
                            >
                                Id
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    color: '#1565c0',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    width: '25%'
                                }}
                            >
                                Name
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    color: '#1565c0',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    width: '25%'
                                }}
                            >
                                Email
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    color: '#1565c0',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    width: '25%'
                                }}
                            >
                                Role
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    color: '#1565c0',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    width: '25%'
                                }}
                            >
                                Created At
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { backgroundColor: '#f5f5f5' }
                                }}
                            >
                                <TableCell component="th" scope="row" align="center" sx={{ fontSize: '1rem' }}>
                                    {row.id}
                                </TableCell>
                                <TableCell component="th" scope="row" align="center" sx={{ fontSize: '1rem' }}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: '1rem' }}>
                                    {row.email}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: '1rem' }}>
                                    {row.role}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: '1rem' }}>
                                    {row.created_at}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default UserManagement;