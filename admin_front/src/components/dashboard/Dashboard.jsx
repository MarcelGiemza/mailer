import { useEffect, useState } from 'react';
import './Dashboard.scss';
import axios from 'axios';

const Dashboard = () => {
    const [users, setUsers] = useState([]);

    const addUser = async (e) => {
        const form = e.target.parentNode;
        const name = form[0].value;
        const surname = form[1].value;
        const email = form[2].value;
        const emailIsValid = /^\S+@\S+\.\S+$/.test(email);
        const password = form[3].value;
        const admin = form[4].value === 'true';
        const id = users.length + 1;

        if (!name || !surname || !emailIsValid || !password) {
            // TODO Implement better validation
            alert('Formularz nieprawidłowy');
            return;
        }

        const userData = { id, name, surname, email, password, admin };

        try {
            const response = await axios.post(`/api/user?token=${sessionStorage.getItem('token')}`, userData);
            const data = response.data;

            if (data.success) {
                getUsers();
                form.reset();
            }
        } catch (error) {
            // TODO Error handling
            alert('Error')
        }
    }

    const getUsers = async () => {
        const response = await axios.get(`/api/users?token=${sessionStorage.getItem('token')}`);
        const data = response.data;

        if (data.success) {
            setUsers(data.users);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return(
        <div className="dashboard-container">
            <div className="form">
                <h2>Stwórz konto email</h2>
                <form>
                    <input type="text" placeholder="Imię" />
                    <input type="text" placeholder="Nazwisko" />
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Hasło" />
                    <select>
                        <option value="true">Admin - TAK</option>
                        <option value="false">Admin - NIE</option>
                    </select>
                    <button type="button" onClick={(e) => addUser(e)}>Dodaj</button>
                </form>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Imię i Nazwisko</th>
                    <th>Email</th>
                    <th>Hasło</th>
                    <th>Admin</th>
                </tr>
                </thead>
                <tbody>
                    {users.map(user => <tr key={user._id}>
                        <td>{user.name} {user.surname}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.admin ? 'TAK' : 'NIE'}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard;