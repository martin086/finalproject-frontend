import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const form = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        const email = Object.fromEntries(formData);
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        };
    };

    return (
        <div className="container">
            <form ref={form} onSubmit={handleSubmit}>
                <h2>Recuperación de cuenta</h2>
                <input type="email" placeholder="Email" name="email" required />
                <button className="btn btn-success mt-2">Send Password Recovery Email</button>
            </form>
            <button className="btn btn-warning mt-1">
                <Link to='/'><FontAwesomeIcon icon={faArrowLeft} /> Go Back</Link>
            </button>
        </div>
    );
};

export default ForgotPassword;