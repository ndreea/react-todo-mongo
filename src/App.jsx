import { useState, useEffect } from 'react'
import Formulario from "./Formulario"
import Tarea from "./Tarea"
import './App.css'


function App() {

  let [tareas,setTareas] = useState([]) //Llamada a la API

  //Nos traemos las tareas
  useEffect(() => {
    fetch("https://api-todo-mongo-598y.onrender.com/tareas")
    .then(respuesta => respuesta.json())
    .then(tareas => setTareas(tareas));
  }, [])

  //Nos traemos las cosas del back: las tareas que ya existían les añadimos las nuevas tareas
  function crearTarea(tarea){
    setTareas([...tareas,tarea])
  }

  //Borramos tareas y modificamos datos
  function borrarTarea(id){
    setTareas(tareas.filter(tarea => tarea.id != id))
  }

  //Actualizar el estado (toggle), solo necesitaríamos el id
  function actualizarEstado(id){
    setTareas(tareas.map(tarea => {
      if(tarea.id == id){
        tarea.estado = !tarea.estado
      }
      return tarea
    }))
  }

  //Actualizar el texto, solo necesitaríamos el id y el texto de la tarea
  function actualizarTexto(id,texto){
    setTareas(tareas.map(tarea => {
      if(tarea.id == id){
        tarea.tarea = texto
      }
      return tarea
    }))
  }


  return (
    <>
      <Formulario crearTarea={crearTarea} />
      <section className="tareas">
        { tareas.map(({id,tarea,estado}) => <Tarea key={id} id={id} tarea={tarea} estado={estado} borrarTarea={borrarTarea} actualizarEstado={actualizarEstado} actualizarTexto={actualizarTexto} /> ) }
      </section>
    </>
  )
}

export default App
