import { Form, redirect, useActionData, useNavigate, type ActionFunctionArgs } from "react-router-dom";
import { login } from '../services/UsuariosService'


export async function action({ request }: ActionFunctionArgs) {
    const formData = Object.fromEntries(await request.formData())
    const resultado = await login(formData)
    if (!resultado.success) {
        return resultado
    }
    return redirect('/')
}



export default function Sesion() {
    const actionData = useActionData() as {
        success?: boolean,
        error?: string,
        detalleErrores?: { [key: string]: string[] }
    }
    const navigate = useNavigate()
    const handleCrear = () => {
        navigate('CrearUsuario')

    }

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body">
                    <div className="text-center pb-4 ">
                        <i className="bi bi-car-front-fill fs-1 me-3"></i>
                        <span className="fs-4">Renta de Autos</span>
                        <hr />
                    </div>
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>

                    {actionData?.error && (
                        <div className="alert alert-danger text-center">{actionData.error}</div>
                    )}

                    <Form method="POST">
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className={`form-control ${actionData?.detalleErrores?.email ? 'is-invalid' : ''}`}
                                id="email"
                                name="email"
                                placeholder="correo@ejemplo.com"
                            />
                            <label htmlFor="email">Correo Electrónico</label>
                            {actionData?.detalleErrores?.email && (
                                <div className="invalid-feedback">{actionData.detalleErrores.email[0]}</div>
                            )}
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className={`form-control ${actionData?.detalleErrores?.password ? 'is-invalid' : ''}`}
                                id="password"
                                name="password"
                                placeholder="Contraseña"
                            />
                            <label htmlFor="password">Contraseña</label>
                            {actionData?.detalleErrores?.password && (
                                <div className="invalid-feedback">{actionData.detalleErrores.password[0]}</div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Iniciar Sesión
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary w-100 mt-3"
                            onClick={handleCrear}
                        >
                            Crear Usuario
                        </button>
                    </Form>
                </div>
            </div>
        </div>
        </>

    )

}