import React, { useEffect, useState } from 'react'
import {db} from '../firebase'
import {addDoc, doc, collection, onSnapshot, deleteDoc, updateDoc, query} from 'firebase/firestore'
import './Formulario.css'

const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [correo, setCorreo] = useState('')
    const [nacimiento, setNacimiento] = useState('')
    const [telefono, setTelefono] = useState('')
    const [genero, setGenero] = useState('')
    const [carrera, setCarrera] = useState('')
    const [registrado, setRegistrado] = useState(false)
    const [id, setId] = useState('')
    const [listaEstudiantes, setListaEstudiantes] = useState([])

    useEffect(()=>{
        const obtenerListaEstudiantes = async () =>{
            try {
                await onSnapshot(collection(db,'estudiantes'), (query)=>{
                    setListaEstudiantes(query.docs.map((doc)=>({...doc.data(),id:doc.id})))
                    console.log('succes')
                })
            } catch (error) {
                console.log('failed')
            }
        }
            obtenerListaEstudiantes()
    }, [])

    const registrar = async (e) => {
        e.preventDefault()
        try {
            const data = await addDoc(collection(db,'estudiantes'),{
                nombre,
                apellido,
                correo,
                nacimiento,
                telefono,
                genero,
                carrera
            })

            setListaEstudiantes(
                [...listaEstudiantes,{
                    nombre,
                    apellido,
                    correo,
                    nacimiento,
                    telefono,
                    genero,
                    carrera,
                    id: data.id
                }]
            )
            setNombre('')
            setApellido('')
            setCorreo('')
            setNacimiento('')
            setTelefono('')
            setGenero('')
            setCarrera('')
        } catch (error) {
            console.log(error)
        }   
    }

    const eliminar = async id =>{
        try {
            await deleteDoc(doc(db,'estudiantes',id))
        } catch (error) {
            console.log(error)
        }
    }

    const edicion = estudiante =>{
        setNombre(estudiante.nombre)
        setApellido(estudiante.apellido)
        setCorreo(estudiante.correo)
        setNacimiento(estudiante.nacimiento)
        setTelefono(estudiante.telefono)
        setGenero(estudiante.genero)
        setCarrera(estudiante.carrera)
        setId(estudiante.id)
        setRegistrado(true)
    }

    const editar = async e =>{
        e.preventDefault()
        const docRef = doc(db,'estudiantes',id)
        await updateDoc(docRef,{
            nombre,
            apellido,
            correo,
            nacimiento,
            telefono,
            genero, 
            carrera
        })

        const nuevoArray = listaEstudiantes.map(
            estudiante => estudiante.id === id ? {id, nombre, apellido, correo, nacimiento, telefono, genero, carrera} : estudiante
        )
        setListaEstudiantes(nuevoArray)
        setNombre('')
        setApellido('')
        setCorreo('')
        setNacimiento('')
        setTelefono('')
        setGenero('')
        setCarrera('')
        setId('')
        setRegistrado(false)
    }
    
    const cancelar = () =>{
        setNombre('')
        setApellido('')
        setCorreo('')
        setNacimiento('')
        setTelefono('')
        setGenero('')
        setCarrera('')
        setRegistrado(false)
    }

    return(
        <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1>{registrado ? 'Editar' : 'Registrar'} estudiante</h1>
            <form onSubmit={registrado ? editar : registrar}>
              <div className="form-group mt-2">
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Ingresa tu nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="apellido">Apellido:</label>
                <input type="text" className="form-control" id="apellido" name="apellido" placeholder="Ingresa tu apellido" value={apellido} onChange={(e)=>setApellido(e.target.value)}/>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="correo">Correo electrónico:</label>
                <input type="email" className="form-control" id="correo" name="correo" placeholder="Ingresa tu correo electrónico" value={correo} onChange={(e)=>setCorreo(e.target.value)}/>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="fecha-nacimiento">Fecha de nacimiento:</label>
                <input type="date" className="form-control" id="fecha-nacimiento" name="fecha-nacimiento" value={nacimiento} onChange={(e)=>setNacimiento(e.target.value)}/>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="telefono">Número de teléfono:</label>
                <input type="number" className="form-control" id="telefono" name="telefono" placeholder="Ingresa tu número de teléfono" value={telefono} onChange={(e)=>setTelefono(e.target.value)}/>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="genero">Género:</label>
                <select className="form-control" id="genero" name="genero" value={genero} onChange={(e)=>setGenero(e.target.value)}>
                  <option value="">Selecciona tu género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="carrera">Carrera que estás estudiando:</label>
                <input type="text" className="form-control" id="carrera" name="carrera" placeholder="Ingresa la carrera que estás estudiando" value={carrera} onChange={(e)=>setCarrera(e.target.value)}/>
              </div>
              {
                registrado ? 
                (
                    <>
                        <button type="submit" className="btn btn-success my-2">Editar</button>  
                        <button type="button"  className="btn btn-danger my-2" onClick={()=>cancelar()}>Cancelar</button>
                    </>
                ):
                    <button type="submit" className="btn btn-primary my-2">Enviar</button>
              }
            </form>
          </div>
        </div>
        <hr />
        <div className="lista_estudiantes text-center">
            <h2>Lista de estudiantes</h2>
            {
                listaEstudiantes.map(estudiante=>(
                    <div key={estudiante.id} className='contenedor-lista'>
                        <img className='mx-2' src="https://picsum.photos/40" alt="imagen aleatoria" />
                        <div className='texto-solicitud'>
                          {estudiante.nombre} | {estudiante.apellido} | {estudiante.correo} | {estudiante.nacimiento} | {estudiante.telefono} | {estudiante.genero} | {estudiante.carrera}
                        </div>
                        <div className='btn btn-outline-secondary' onClick={()=>edicion(estudiante)}>Editar</div>
                        <div className='btn btn-danger' onClick={()=>eliminar(estudiante.id)}>Eliminar</div>
                    </div>
                ))
            }
        </div>
      </div>
    )
}
export default Formulario