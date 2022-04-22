import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

import "components/Application.scss";


export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')

    ]).then((all) => {
      const dayInfo = all[0].data;
      const appointmentInfo = all[1].data;
      const interviewerInfo = all[2].data;
      setState(prev => ({ ...prev, days: dayInfo, appointments: appointmentInfo, interviewers: interviewerInfo }));
    });
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map(app => {
    const interview = getInterview(state, appointments.interview);
    return (
      < Appointment
        key={app.id}
        id={app.id}
        time={app.time}
        interview={interview}
        {...app}
      />
    );
  });

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
