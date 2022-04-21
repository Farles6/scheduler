
export function getAppointmentsForDay(state, day) {
  const resArray = [];
  let selectedDay = null;

  if (!state.days.length) {
    return resArray;
  }

  if (!day) {
    return resArray;
  }

  const appointmentsData = Object.values(state.appointments);

  for (let result of state.days) {
    if (result.name === day) {
      selectedDay = result;
    }
  }

  if (!selectedDay) {
    return resArray;
  }

  for (let dayAppointments of selectedDay.appointments) {
    for (let appointments of appointmentsData) {
      if (dayAppointments === appointments.id) {
        resArray.push(appointments);
      }

    }
  }


  return resArray;
}