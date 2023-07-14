import Login from '../Login/Login';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { getCurrentSession } from '../../db/Session';
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";

const Home = () => {
    const navigate = useNavigate();
    const { userData, setUser } = useContext(UserContext);
    const { fetchCart } = useContext(CartContext);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const sessionData = await getCurrentSession();
                if (sessionData) {
                    setUser(sessionData);
                    fetchCart();
                    navigate('/products');
                }
            } catch (error) {
                console.error('Error checking session: ', error);
            }
        };
        checkSession();
    }, []);

    return <>{!userData && <Login />}</>;
};

export default Home;