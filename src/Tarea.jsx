import { useState } from 'react'


function Tarea({id,tarea,estado,borrarTarea,actualizarEstado,actualizarTexto}) {

  let [editando,setEditando] = useState(false)
  let [tareaTemporal,setTareaTemporal] = useState(tarea)

  return (
    <div className="tarea">
      <h2 className={ !editando ? "visible" : "" }>{ tarea }</h2>

      <input className={ editando ? "visible" : "" } type="text" value={tareaTemporal} onChange={ evento => setTareaTemporal(evento.target.value) } />

      <button className="boton" onClick={ async () => {
        
        if(editando){
          if(tareaTemporal.trim() != "" && tareaTemporal.trim() != tarea){
            let {resultado,error} = await fetch(`https://api-todo-mongo-598y.onrender.com/tareas/actualizar/${id}/1`,{
              method : "PUT",
              body : JSON.stringify({tarea : tareaTemporal.trim()}),
              headers : {
                "Content-type" : "application/json"
              }
            }).then(respuesta => respuesta.json())

            if(error){
              setTareaTemporal(tarea)
              setEditando(false)
              return console.log("error")
            }
            setTareaTemporal(tareaTemporal.trim())
            actualizarTexto(id,tareaTemporal)
          }
        }
        setTareaTemporal(tarea)
        setEditando(!editando)

      } }>{ editando ? "guardar" : "editar" }
      </button>

      <button className="boton" onClick={() => {
        fetch("https://api-todo-mongo-598y.onrender.com/tareas/borrar/" + id, {
          method : "DELETE"
        })
        .then(respuesta => respuesta.json())
        .then(({resultado,error}) => {
          if(!error && resultado == "ok"){
            return borrarTarea(id)
          }
          console.log("error")
        })
      }}>borrar</button>

      <button className={`estado ${estado ? "terminada" : ""}`} onClick={() => {
        fetch(`https://api-todo-mongo-598y.onrender.com/tareas/actualizar/${id}/2`, {
          method : "PUT"
        })
        .then(respuesta => respuesta.json())
        .then(({resultado,error}) => {
          if(!error && resultado == "ok"){
            return actualizarEstado(id)
          }
          console.log("error")
        })
      }}><span></span></button>
    </div>
  )
}

export default Tarea
