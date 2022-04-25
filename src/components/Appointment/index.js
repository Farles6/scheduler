import React, { Fragment } from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

import 'components/Appointment/styles.scss';
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';



export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));

  }
  function confirm() {
    transition(CONFIRM);
  }

  function deleteApp(id) {
    transition(CONFIRM);

    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
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
        {mode === SAVING && (<Status message='Saving' />)}
        {mode === CONFIRM && (<Confirm
          message='Are you sure you would like to delete?' onConfirm={() => deleteApp(props.id)}
          onCancel={() => back()}
        />)}
        {mode === DELETING && (<Status message='deleting' />)}
        {mode === SHOW && (<Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => confirm()}
        />)}
      </article>
    </Fragment>
  );
}