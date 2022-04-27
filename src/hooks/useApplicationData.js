import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  //sets day on nav bar when a day is clicked
  const setDay = day => setState({ ...state, day });

  //saves the input data and updates the interview slot

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [...state.days];

    const index = days.map(day => day.name).indexOf(state.day);

    const day = days[index];

    if (!state.appointments[id].interview) {
      day.spots--;
    }
    days[index] = day;


    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments, days });
      });
  }

  // deletes an appointment
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [...state.days];

    const index = days.map(day => day.name).indexOf(state.day);

    const day = days[index];

    day.spots++;

    days[index] = day;

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days }
        );
        console.log('successful');
      });
  }


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

  return { state, setDay, bookInterview, cancelInterview };
}
