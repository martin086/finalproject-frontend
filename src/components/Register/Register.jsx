import { useRef } from "react"

const Register = () => {

    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const consultarForm = (e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
        console.log(cliente)
        fetch('http://localhost:4000/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        }).then(response => response.json())
            .then(data => {
                document.cookie = `token=${data.token};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`
                console.log(data.token)
            })
            .catch(error => console.error(error))
        e.target.reset() //Reset form
    }
    return (
        <div className="container divForm" >
            <h3>Formulario de registro</h3>
            <form className="d-flex flex-column justify-content-center" onSubmit={consultarForm} ref={datForm}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="justify-content-center form-label">Nombre</label>
                    <input type="text" className="m-auto w-auto form-control" name="first_name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="justify-content-center form-label">Apellido</label>
                    <input type="text" className="m-auto w-auto form-control" name="last_name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="justify-content-center form-label">Email</label>
                    <input type="email" className="m-auto w-auto form-control" name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="justify-content-center form-label">Password</label>
                    <input type="password" className="m-auto w-auto form-control" name="password" />
                </div>

                <button type="submit" className="btn btn-primary m-4 justify-content-center">Registrarse</button>
            </form>
        </div>
    )
}

export default Register;