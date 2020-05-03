import React from "react";
import s from "./AnswerItem.module.css"

const AnswerItem = props => {
    return (
        <li className={s.AnswerItem}>
            {props.answer.text}
        </li>
    )
}

export default AnswerItem