import './Login.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const naviagte = useNavigate();

    const login = async (e) => {
        const form = e.target.parentNode;
        const email = form[0].value;
        const password = form[1].value;

        const userData = { email, password };

        const response = await axios.post('/api/login/admin', userData);
        const data = response.data;

        console.log(data);

        if (data.success && data.token) {
            sessionStorage.setItem('token', data.token);
            naviagte('/dashboard');
        }
    };

    return(
        <div className="login-container">
            <div className="form">
                <h2>Admin</h2>
                <form>
                    <input name="email" type="text" placeholder="Email" />
                    <input name="password" type="password" placeholder="Password" />
                    <button type="button" onClick={(e) => login(e)}>Zaloguj</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
