import React, { useState } from 'react'

const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [correo, setCorreo] = useState('')
    const [nacimiento, setNacimiento] = useState('')
    const [telefono, setTelefono] = useState('')
    const [carrera, setCarrera] = useState('')

    return(
        <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1>Registro de estudiante</h1>
            <form>
              <div className="form-group mt-2">
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Ingresa tu nombre" />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="apellido">Apellido:</label>
                <input type="text" className="form-control" id="apellido" name="apellido" placeholder="Ingresa tu apellido" />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="correo">Correo electrónico:</label>
                <input type="email" className="form-control" id="correo" name="correo" placeholder="Ingresa tu correo electrónico" />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="fecha-nacimiento">Fecha de nacimiento:</label>
                <input type="date" className="form-control" id="fecha-nacimiento" name="fecha-nacimiento" />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="telefono">Número de teléfono:</label>
                <input type="number" className="form-control" id="telefono" name="telefono" placeholder="Ingresa tu número de teléfono" />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="genero">Género:</label>
                <select className="form-control" id="genero" name="genero">
                  <option value="">Selecciona tu género</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="carrera">Carrera que estás estudiando:</label>
                <input type="text" className="form-control" id="carrera" name="carrera" placeholder="Ingresa la carrera que estás estudiando" />
              </div>
              <button type="submit" className="btn btn-primary my-2">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    )
}
export default Formulario