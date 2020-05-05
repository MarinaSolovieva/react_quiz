import React from "react";
import s from "./AnswerItem.module.css"

const AnswerItem = props => {
const cls = [s.AnswerItem];
    if (props.state) {
        cls.push(s[props.state])
    } else {

    }
    return (
        <li className={cls.join(" ")}
            onClick={() => props.onAnswerClick(props.answer.id)}>
            {props.answer.text}
        </li>
    )
}

export default AnswerItem