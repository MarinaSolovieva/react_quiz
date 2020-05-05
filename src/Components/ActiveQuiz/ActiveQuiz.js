import React from "react";
import s from "./ActiveQuiz.module.css"
import AnswerList from "../AnswersList/AnswersList";


const ActiveQuiz = props => {
    return (
        <div className={s.ActiveQuiz}>
            <p className={s.question}>
                <span>
                    <strong>{props.answerNumber}.</strong>&nbsp;
                    {props.question}
                </span>
                <small>{props.answerNumber} из {props.quizLength} </small>
            </p>
            <AnswerList answers={props.answers}
                        onAnswerClick={props.onAnswerClick}
                        state={props.state}/>
        </div>
    );
};

export default ActiveQuiz;
