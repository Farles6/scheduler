import React, { Fragment } from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';


import 'components/Appointment/styles.scss';
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {

  const { mode, transition, back, history } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }
  console.log('HISTORY', history);
  
  function destroy(id) {

    transition(DELETING, true);
    
    props.cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }



  return (
    <Fragment>

      <article className='appointment'>
        <Header time={props.time} />
        {mode === EMPTY && <Empty
          onAdd={() => transition(CREATE)}
        />}
        {mode === CREATE && <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />}
        {mode === ERROR_SAVE && <Error
          message='Could not save appointment'
          onClose={() => back()}
        />}
        {mode === ERROR_DELETE && <Error
          message='Could not delete appointment'
          onClose={() => back()}
        />}
        {mode === EDIT && <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />}
        {mode === SAVING && (<Status message='Saving' />)}
        {mode === CONFIRM && (<Confirm
          message='Are you sure you would like to delete?' onConfirm={() => destroy(props.id)}
          onCancel={() => back()}
        />)}
        {mode === DELETING && (<Status message='deleting' />)}
        {mode === SHOW && (<Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />)}
      </article>
    </Fragment>
  );
}