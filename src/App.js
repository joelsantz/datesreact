import React, { useState, useEffect, Fragment } from 'react';



function Date({date, index, deleteDate}) {
    return (
      <div className="cita">
        <p>Pet: <span>{date.pet}</span></p>
        <p>Owner: <span>{date.owner}</span></p>
        <p>Date: <span>{date.date}</span></p>
        <p>Time: <span>{date.time}</span></p>
        <p>Symptoms: <span>{date.symptoms}</span></p>
        <button 
          onClick = {() => deleteDate(index)}
          type = "button" className = "button eliminar u-full-width">Delete X</button>
      </div>

    )
}

function Form({createDate}) {

  const stateInitial = {
    pet : '',
    owner : '',
    date : '',
    time : '',
    symptoms : ''

  }

  // date = state actual
  //setDate = fn para cambiar stte
  const [date, setDate] = useState(stateInitial);

  // Actualiza el state
  const handleChange = e => {
    setDate({
      ...date,
      [e.target.name] : e.target.value

    })

  }
  
  // pasamos la cita al componente principal
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(date);
    // Pasar la cita hacia el componente principal
    createDate(date)


    // Reiniciar el State (reinicia el form)
    setDate(stateInitial)

  }

    return (
      <Fragment>
      <h2>Make an Appointment</h2>

      <form onSubmit = {handleSubmit}>
                  <label>Pet's Name</label>
                  <input 
                    type="text" 
                    name="pet"
                    className="u-full-width" 
                    placeholder="Pet's Name"
                    onChange = {handleChange}
                    value = {date.pet} 
                  />

                  <label>Owner's Name</label>
                  <input 
                    type="text" 
                    name="owner"
                    className="u-full-width"  
                    placeholder="Owner's Name"
                    onChange = {handleChange}
                    value = {date.owner}  
                  />

                  <label>Date</label>
                  <input 
                    type="date" 
                    className="u-full-width"
                    name="date"
                    onChange = {handleChange}
                    value = {date.date} 
                  />               

                  <label>Time</label>
                  <input 
                    type="time" 
                    className="u-full-width"
                    name="time"
                    onChange = {handleChange}
                    value = {date.time} 
                  />

                  <label>Symptoms</label>
                  <textarea 
                    className="u-full-width"
                    name="symptoms"
                    onChange = {handleChange}
                    value = {date.symptoms} 
                  ></textarea>

                  <button type="submit" className="button-primary u-full-width">Add Appointment</button>
          </form>
  </Fragment>
    )

}


function App() {

  //cargar las citas de localstorage como state inicial
  let initialDates = JSON.parse(localStorage.getItem('dates'));

        if(!initialDates) {
          initialDates = [];
        }

  //useState retorna 2 funciones
  // state = this.state, setState = this.setState();

  const [dates, setDate] = useState(initialDates);


  //Agregar las nuevas citas al State
  const createDate = date => {
    //tomar copia del state y agregr nuevo cliente
    const newDates = [...dates, date];

    //Almacenamos en el State
    setDate (newDates);

  }

  //Elimina las citas del state
  const deleteDate = index => {
    const newDates = [...dates];
    newDates.splice(index,1);
    setDate(newDates);

  }
  
  useEffect( 
    () => {
        let initialDates = JSON.parse(localStorage.getItem('dates'));

        if(initialDates) {
          localStorage.setItem('dates', JSON.stringify(dates));
        } else {
          localStorage.setItem('dates', JSON.stringify([]));
        }
    }, [dates] )
  
  //Cargar condicionalmente un titulo
  const title = Object.keys(dates).length === 0 ? 'There are no Appointments' : 'Appointment Manager'

  
  return (
    <Fragment>
      <h1>Patient Manager</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Form
                createDate = {createDate}
              
              />
          </div>
          <div className="one-half column">
            <h2>{title}</h2>
            {dates.map(( date, index )=> (
              <Date 
                key = {index}
                index = {index}
                date = {date}
                deleteDate = {deleteDate}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )

}

export default App;