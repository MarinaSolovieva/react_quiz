import React from "react";
import s from "./Quiz.module.css"
import ActiveQuiz from "../../Components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../Components/FinishedQuiz/FinishedQuiz";
import instance from "../../Api/Api";
import Preloader from "../../Components/Ui/Preloader/Preloader";

class Quiz extends React.Component {
    state = {
        results: {},  // { [id]: "success" "error" }
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // { [id]: "success" "error" }
        quiz: [],
        isLoading: true
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
    };

async componentDidMount() {
    try {
        const response = await instance.get(`quizez/${this.props.match.params.id}.json`)
        const quiz = response.data
            this.setState({
                quiz,
                isLoading: false
            })
    } catch (error) {
        console.log(error)
    }

}

    render() {
        return (
            <div className={s.Quiz}>
                <div className={s.quizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.state.isLoading
                        ? <Preloader/>
                        : this.state.isFinished
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