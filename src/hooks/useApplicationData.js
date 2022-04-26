import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments }
        );
        console.log('successful');
      });
  }

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

  return { state, setDay, bookInterview, cancelInterview };
}
