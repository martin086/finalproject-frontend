const SESSION_API = 'http://localhost:8080/api/session' || 'https://finalproject-backend-rwbk.onrender.com/api/session';
const HEADERS = { 'Content-Type': 'application/json' }

export const getCurrentSession = async () => {
    try {
        const response = await fetch(`${SESSION_API}/current`, {
            method: 'GET',
            credentials: 'include',
            headers: HEADERS
        })
        if (response.ok) {
            return await response.json() // JSON with user info
        }
        if (response.status === 401) {
            return null
        }

        throw new Error('Failed to get current session');

    } catch (error) {
        throw new Error('An error occurred while fetching the current session');
    }
}

export const login = async (email, password) => {
    
    try {
        const response = await fetch (`${SESSION_API}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: HEADERS,
            body: JSON.stringify({ email, password })
        })
        if (response.ok) {
            const data = await response.json();
            //document.cookie = `token=${data.token};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`
            //console.log(data.token)
            return data; // Return the data for successful login
        } else {
            const errorData = await response.json();
            console.error('Login failed:', errorData);
            throw new Error('Login failed');
        }        
    } catch (error) {
        console.error(error)
        throw new Error('An error occurred while logging in');
    }
};

export const logout = async () => {
    try {
        const response = await fetch(`${SESSION_API}/logout`, {
            method: 'GET',
            credentials: 'include',
            headers: HEADERS
        })
        if (response.ok) {
            return true
        }
        return false

    } catch (error) {
        throw new Error(error)
    }
}

export const register = async (first_name, last_name, email, password) => {
    try {
        const response = await fetch(`${SESSION_API}/register`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ first_name, last_name, email, password })
        })
        if (response.status === 201) {
            return true
        }
        return false
    } catch (error) {
        throw new Error(error)
    }
}

// export const sendRecoveryEmail = async (options) => {
//   try {
//     const response = await fetch(`${SESSION_API}/password/createlink`, options) //POST
//   } catch (error) {

//   }
// }

// export const resetPassword = async () => {
//   try {
//     const response = await fetch(`${SESSION_API}/password/reset`) //PUT
//   } catch (error) {

//   }
// }