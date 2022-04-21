import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

import "components/Application.scss";


export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  

const setDay = day => setState({...state, day})

useEffect(() => {
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments')
  ]).then((all) => {
    const dayInfo = all[0].data;
    const appointmentInfo = all[1].data;
    setState(prev => ({...prev, days: dayInfo, appointments: appointmentInfo}))
  })
}, []);

const schedule = dailyAppointments.map(app => 
  <Appointment
    key={app.id}
    {...app}
  />)

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key='last' time='5pm' />
      </section>
    </main>
  );
}
