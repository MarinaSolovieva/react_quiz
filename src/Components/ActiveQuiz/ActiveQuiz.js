import React from "react";
import s from "./ActiveQuiz.module.css"
import AnswerList from "../AnswersList/AnswersList";


const ActiveQuiz = props => {
    return (
        <div className={s.ActiveQuiz}>
            <p className={s.question}>
                <span>
                    <strong>2.</strong>&nbsp;
                    Как дела?
                </span>
                <small>4 из 12 </small>
            </p>
            <AnswerList answers={props.answers}/>
        </div>
    );
};

export default ActiveQuiz;
