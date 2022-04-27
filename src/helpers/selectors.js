//uses appointment info in state to generate an array of appointments for given day

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

// gets all info about interviews and returns an object 

export function getInterview(state, interview) {
  const interviewerData = Object.values(state.interviewers);
  let resObject = {};

  if (!interview) {
    return null;
  }

  for (let interviewer of interviewerData) {

    if (interviewer.id === interview.interviewer) {
      resObject = {
        'student': interview.student,
        'interviewer': {
          ...interviewer
        }
      };

    }
  }

  return resObject;
}

//generates an array of available interviews for given day

export function getInterviewersForDay(state, day) {
  const resArray = [];
  let selectedDay = null;

  if (!state.days.length) {
    return resArray;
  }

  if (!day) {
    return resArray;
  }

  const interviewersData = Object.values(state.interviewers);
  for (let result of state.days) {
    if (result.name === day) {
      selectedDay = result;
    }
  }

  if (!selectedDay) {
    return resArray;
  }
  for (let interviewersID of selectedDay.interviewers) {
    for (let interviewer of interviewersData) {
      if (interviewersID === interviewer.id) {
        resArray.push(interviewer);
      }

    }
  }

  return resArray;
}