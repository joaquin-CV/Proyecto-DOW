import { Form, redirect, useActionData, type ActionFunctionArgs } from "react-router-dom"
import { agregarArriendo } from "../services/ArriendoActivoService"


export async function action({ request }: ActionFunctionArgs) {
    const formData = Object.fromEntries(await request.formData())
    const resultado = await agregarArriendo(formData)
    if (!resultado?.success) {
        return resultado
    }
    window.confirm('Arriendo añadido correctamente')
    return redirect('/arriendos/activos')
}

export default function AgregarArriendo() {
    const actionData = useActionData() as { success: boolean, error?: string, detalleErrores: { [key: string]: string[] } }

    return (
        <>
            <div className="container min-vh-100 d-flex justify-content-center align-items-center">
                <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
                    <div className="card-body">

                        <h2 className="mb-4 text-center">Agregar Arriendo</h2>

                        {/* Error  */}
                        {actionData?.error && (
                            <div className="alert alert-danger text-center">
                                Error: alguno de los datos no ha sido ingresado correctamente.
                            </div>
                        )}

                        <Form method="POST">
                            <div className="mb-3">
                                <label htmlFor="nombreCliente" className="form-label">Nombre y Apellido</label>
                                <input
                                    name="nombreCliente"
                                    type="text"
                                    className={`form-control ${actionData?.detalleErrores?.nombreCliente ? 'is-invalid' : ''}`}
                                    id="nombreCliente"
                                    placeholder="Ingrese el nombre y apellido del cliente"
                                />
                                {actionData?.detalleErrores?.nombreCliente && (
                                    <div className="invalid-feedback">
                                        {actionData.detalleErrores.nombreCliente[0]}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="rutCliente" className="form-label">RUT</label>
                                <input
                                    name="rutCliente"
                                    type="text"
                                    className={`form-control ${actionData?.detalleErrores?.rutCliente ? 'is-invalid' : ''}`}
                                    id="rutCliente"
                                    placeholder="Ingrese el RUT del cliente"
                                />
                                {actionData?.detalleErrores?.rutCliente && (
                                    <div className="invalid-feedback">
                                        {actionData.detalleErrores.rutCliente[0]}
                                    </div>
                                )}
                                <div className="form-text text-muted">Ej. 12345678-9</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="patente" className="form-label">Patente</label>
                                <input
                                    name="patenteVehiculo"
                                    type="text"
                                    className={`form-control ${actionData?.detalleErrores?.patenteVehiculo ? 'is-invalid' : ''}`}
                                    id="patente"
                                    placeholder="Ingrese la patente del vehículo"
                                />
                                {actionData?.detalleErrores?.patenteVehiculo && (
                                    <div className="invalid-feedback">
                                        {actionData.detalleErrores.patenteVehiculo[0]}
                                    </div>
                                )}
                                <div className="form-text text-muted">Ej. ABCD12</div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="tipoVehiculo" className="form-label">Tipo de Vehículo</label>
                                <select
                                    name="tipoVehiculo"
                                    className={`form-select ${actionData?.detalleErrores?.tipoVehiculo ? 'is-invalid' : ''}`}
                                    id="tipoVehiculo"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Selecciona un tipo de vehículo</option>
                                    <option value="Sedan">Sedán</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Camioneta">Camioneta</option>
                                </select>
                                {actionData?.detalleErrores?.tipoVehiculo && (
                                    <div className="invalid-feedback">
                                        {actionData.detalleErrores.tipoVehiculo[0]}
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Agregar Arriendo
                            </button>
                        </Form>
                    </div>
                </div>
            </div>


        </>
    )
}