import './App.css';
import { useState } from 'react';

function App() {
  
  const [matricula, setMatricula] = useState('');
  const [nombre, setNombre] = useState('');
  const [materia, setMateria] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [mensajeBusqueda, setMensajeBusqueda] = useState('');

  const manejarRegistro = (e) => {
    e.preventDefault();

    if (!matricula || !nombre || !materia || !calificacion) {
      setMensaje("Es necesario llenar todos los campos para guardar tu registro.");
      return;
    }

    let contieneSoloNumeros = true;
    for (let i = 0; i < matricula.length; i++) {
      if (matricula[i] < '0' || matricula[i] > '9') {
        contieneSoloNumeros = false;
        break;
      }
    }
    
    if (!contieneSoloNumeros) {
      setMensaje("Matrícula inválida, ingresa una matrícula válida.");
      return;
    }

    let contieneNumeros = false;
    for (let i = 0; i < nombre.length; i++) {
      if (nombre[i] >= '0' && nombre[i] <= '9') {
        contieneNumeros = true;
        break;
      }
    }

    if (contieneNumeros) {
      setMensaje("Nombre incorrecto, solo se permiten letras y acentos.");
      return;
    }

    const materiasPermitidas = ["Cálculo Integral", "POO", "Redes"];
    if (!materiasPermitidas.includes(materia)) {
      setMensaje("Materia fuera de la tira. Opciones válidas: Cálculo Integral, POO, Redes.");
      return;
    }

    const valorCalificacion = parseFloat(calificacion);
    if (valorCalificacion < 0 || valorCalificacion > 10) {
      setMensaje("Calificación fuera de rango. Por favor, introduce una calificación entre 0 y 10.");
      return;
    }

    setMensaje("Registro exitoso");
    
    const nuevoRegistro = { matricula, nombre, materia, calificacion };
    setEstudiantes([...estudiantes, nuevoRegistro]);

    setMatricula('');
    setNombre('');
    setMateria('');
    setCalificacion('');

  };

  const manejarBusqueda = () => {
    if (!busqueda) {
      setMensajeBusqueda("Ingresa un nombre para buscar.");
      setResultadosBusqueda([]);
      return;
    }

    const resultados = estudiantes.filter((estudiante) => {
      return estudiante.nombre.toLowerCase() === busqueda.toLowerCase();
    });

    if (resultados.length === 0) {
      setMensajeBusqueda("Alumno no encontrado.");
      setResultadosBusqueda([]);
    } else {
      setMensajeBusqueda("");
      setResultadosBusqueda(resultados);
    }
  };

  return (
    <div className="contenedor-principal">
      <div className="seccion-izquierda">
        <h1 className="titulo">Registro de Estudiantes</h1>
        <p className="descripcion">Bienvenido al sistema de registro de estudiantes. Por favor, complete el formulario a continuación para registrar un nuevo estudiante.</p>
        <form onSubmit={manejarRegistro}>
        <label htmlFor="matricula">Matrícula:</label>
        <input type="text" id="matricula" name="matricula" value={matricula} onChange={(e) => setMatricula(e.target.value)}/>

        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>

        <label htmlFor="materia">Materia:</label>
        <input type="text" id="materia" name="materia" list="lista-materias" value={materia} onChange={(e) => setMateria(e.target.value)}/>
        <datalist id="lista-materias">
          <option value="Cálculo Integral" />
          <option value="POO" />
          <option value="Redes" />
        </datalist>

        <label htmlFor="calificacion">Calificación:</label>
        <input type="number" id="calificacion" name="calificacion" value={calificacion} onChange={(e) => setCalificacion(e.target.value)} />

        <button type="submit">Registrar</button>
        {mensaje && <p className="mensaje">{mensaje}</p>}
        </form>
      </div>

      <div className="seccion-derecha">
        <h2 className="subtitulo">Búsqueda de Estudiantes</h2>
        <div className="busqueda">
          <input type="text"placeholder="Ingresa el nombre del estudiante" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
          <button type="button" onClick={manejarBusqueda}>Buscar</button>
        </div>

        <div className="resultados-contenedor">
          {mensajeBusqueda && <p className="mensaje">{mensajeBusqueda}</p>}
          {resultadosBusqueda.map((alumno, index) => (
            <div key={index} className="tarjeta-resultado">
              <p><strong>Matrícula:</strong> {alumno.matricula}</p>
              <p><strong>Nombre:</strong> {alumno.nombre}</p>
              <p><strong>Materia:</strong> {alumno.materia}</p>
              <p><strong>Calificación:</strong> {alumno.calificacion}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;
