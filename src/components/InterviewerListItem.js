import React, { useState } from "react";
import classNames from "classnames";

import 'components/InterviewerListItem.scss';

export default function InterviewerItemList(props) {

  let interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected
  });
  const showName = (selected) => selected && <span>{props.name}</span>;

  return (
    <li 
    onClick={() => props.setInterviewer(props.id)} 
    className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {showName(props.selected)}
    </li>
  );
}
