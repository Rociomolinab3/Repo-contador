import React, {useState, useEffect, useRef} from 'react';
import './Timer.css';

const Timer = () => {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [tipo, setTipo] = useState('Contador')
  const myRef = useRef(null);  
  
  function reset() {
    // const input = document.querySelector(".cuenta-regresiva-input");
    setSegundos(0);
    setActivo(false);
    // input.value = "Ingresa Segundos";
    // intervalo=null;
  }

  function agregarSegundos(){
    let ref = myRef.current.value;
    setSegundos(ref)
  }

  useEffect(() => {
    let intervalo = null;
    if (activo && tipo === 'Contador') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos + 1);
      }, 1000);
    }

    if (activo && tipo === 'Cuenta Regresiva') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos - 1);
      }, 1000);
    }

    if (!activo && segundos !== 0 && tipo === 'Contador') {
      clearInterval(intervalo);
    }

    if (segundos <= 0 && tipo === 'Cuenta Regresiva') {
      reset();
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [activo, segundos, tipo]);

  return (
    <div className="box">
    <div className="app">

      <div className="time">
        {segundos}
      </div>

      <div className="row">
        <button onClick={() => setActivo(activo ? false : true)} className="button button-primary">
          {activo ? <p>Pausa</p> : <p>Inicio</p>}
        </button>
        <button onClick={reset} className="button button-secondary">
         <p><strong> RESET </strong></p>
        </button>
      </div>

      <button onClick={() => setTipo(tipo === 'Contador' ? 'Cuenta Regresiva' : 'Contador')}   className="button">
          {tipo}
      </button>
      {tipo === 'Cuenta Regresiva' && <input type="number" className="cuenta-regresiva-input" ref={myRef} onChange={agregarSegundos} placeholder="Ingresa Segundos" autoComplete="off"/>}

    </div>
    </div>
    );
};

export default Timer;