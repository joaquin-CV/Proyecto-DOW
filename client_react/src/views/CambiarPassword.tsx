import { Form, redirect, useActionData, type ActionFunctionArgs } from "react-router-dom";
import { cambiarPassword } from "../services/UsuariosService";


export async function action({ request }: ActionFunctionArgs) {
    const formData = Object.fromEntries(await request.formData())
    const resultado = await cambiarPassword(formData)
    if (!resultado?.success) {
        return resultado
    }
    window.confirm("Contraseña modificada correctamente")
    return redirect('/')

}


export default function CambiarPassword() {

    const actionData = useActionData() as {
        success?: boolean,
        error?: string,
        detalleErrores?: { [key: string]: string[] }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body">
                    <h2 className="text-center mb-4">Cambiar Contraseña</h2>

                    {actionData?.error && (
                        <div className="alert alert-danger text-center">{actionData.error}</div>
                    )}

                    <Form method="POST">
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className={`form-control ${actionData?.detalleErrores?.password ? 'is-invalid' : ''}`}
                                id="password"
                                name="password"
                                placeholder="Nueva contraseña"
                            />
                            <label htmlFor="password">Nueva Contraseña</label>
                            {'password' in (actionData?.detalleErrores || {}) && (
                                <div className="invalid-feedback">
                                    {actionData.detalleErrores?.password[0]}
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Guardar Cambios
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    )
}