import { useRef, useState, useContext } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { login } from "../../db/Session";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';


const Login = () => {
    const { setUser } = useContext(UserContext);
    const { fetchCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [loginError, setLoginError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(email, password);

            if (userData) {
                setUser(userData);
                fetchCart();
                setLoginError(false);
                navigate('/products');
                return;
            }
            setLoginError(true);
        } catch (error) {
            setLoginError(true);
        }
    };

    return (
        <>
            <form className="d-flex flex-column justify-content-center" onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input onChange={(e) => setEmail(e.target.value)} className="m-1" type="email" id="email" name="email" required />

                <label htmlFor="password">Password:</label>
                <input onChange={(e) => setPassword(e.target.value)} className="m-1" type="password" id="password" name="password" required />
                <button className="btn btn-primary m-1" id="submitBtn" type="submit">
                    <FontAwesomeIcon icon={faArrowRightToBracket} /> Login
                </button>
                <p className={`message-error-login text-center ${loginError ? '' : 'hidden'}`}>Usuario o contraseña incorrectos</p>
            </form>
            <div className="d-flex justify-content-center m-1">
                <Link to="/forgotpassword">Olvidé mi contraseña</Link>
            </div>
        </>
    );
};

export default Login;


/*
const Login = () => {

    const datForm = useRef()
    const navigate = useNavigate();
    const consultarForm = (e) => {
        //Consultar los datos del formulario
        e.preventDefault()
        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        fetch('http://localhost:8080/api/session/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        })
            .then(response => response.json())
            .then(data => {
                document.cookie = `token=${data.token};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`
                console.log(data.token)
            })
            .catch(error => console.error(error))

        e.target.reset()//Reset form
        navigate('/products')
    }
    return (
        <div className="container divForm" >
            <h3>Formulario de Inicio de Sesion</h3>
            <form onSubmit={consultarForm} ref={datForm}>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name="password" />
                </div>

                <button type="submit" className="btn btn-primary">Iniciar Sesion</button>
            </form>
        </div>
    )
}

export default Login;
*/