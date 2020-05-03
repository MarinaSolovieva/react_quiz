import React from "react";
import s from "./Quiz.module.css"
import ActiveQuiz from "../../Components/ActiveQuiz/ActiveQuiz";

class Quiz extends React.Component {
    state = {
        quiz:[
            {
                answers: [
                    {text: "Вопрос 1"},
                    {text: "Вопрос 1"},
                    {text: "Вопрос 1"},
                    {text: "Вопрос 1"}
                ]
            }
        ]
    }
    render() {
        return (
            <div className={s.Quiz}>
                <div className={s.quizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    <ActiveQuiz answers={this.state.quiz[0].answers}/>
                </div>
            </div>
        )
    }
}

export default Quiz