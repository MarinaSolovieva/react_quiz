import React from "react";
import s from "./Quiz.module.css"
import ActiveQuiz from "../../Components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../Components/FinishedQuiz/FinishedQuiz";

class Quiz extends React.Component {
    state = {
        results: {},  // { [id]: "success" "error" }
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // { [id]: "success" "error" }
        quiz: [
            {
                question: "Какого цвета небо",
                id: 1,
                rightAnswerId: 2,
                answers: [
                    {text: "Черный", id: 1},
                    {text: "Синий", id: 2},
                    {text: "Красный", id: 3},
                    {text: "Зеленый", id: 4}
                ]
            },
            {
                question: "В каком году основали Санкт-Петербург",
                id: 2,
                rightAnswerId: 3,
                answers: [
                    {text: "1700", id: 1},
                    {text: "1702", id: 2},
                    {text: "1703", id: 3},
                    {text: "1803", id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = answerId => {
        const results = this.state.results;
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === "success") {
                return
            }
        }
        if (this.state.quiz[this.state.activeQuestion].rightAnswerId === answerId) {
            if (!results[this.state.quiz[this.state.activeQuestion].id]) {
                results[this.state.quiz[this.state.activeQuestion].id] = "success"
            }
            this.setState({
                answerState: {[answerId]: "success"},
                results
            })

            let timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000);

        } else {
            results[this.state.quiz[this.state.activeQuestion].id] = "error"
            this.setState({
                answerState: {[answerId]: "error"},
                results
            })
        }


    }

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    };

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            results: {},  // { [id]: "success" "error" }
            isFinished: false
        })
    }


    render() {
        return (
            <div className={s.Quiz}>
                <div className={s.quizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished
                            ? <FinishedQuiz results={this.state.results}
                                            quiz={this.state.quiz}
                                            onRetry={this.retryHandler}/>
                            : <ActiveQuiz answers={this.state.quiz[this.state.activeQuestion].answers}
                                          question={this.state.quiz[this.state.activeQuestion].question}
                                          onAnswerClick={this.onAnswerClickHandler}
                                          answerNumber={this.state.activeQuestion + 1}
                                          quizLength={this.state.quiz.length}
                                          state={this.state.answerState}/>
                    }

                </div>
            </div>
        )
    }
}

export default Quiz