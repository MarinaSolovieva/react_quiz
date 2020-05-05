import React from "react";
import s from "./AnswersList.module.css"
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswerList = props => {
    return (
        <ul className={s.answerList}>
            {props.answers.map((answer, index) => {
                return (
                    <AnswerItem key={index}
                                answer={answer}
                                onAnswerClick={props.onAnswerClick}
                                state={props.state
                                    ? props.state[answer.id]
                                    : null}/>
                )
            })}
        </ul>
    )
}

export default AnswerList