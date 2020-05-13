import React from "react";
import s from "./Quiz.module.css"
import ActiveQuiz from "../../Components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../Components/FinishedQuiz/FinishedQuiz";
import Preloader from "../../Components/Ui/Preloader/Preloader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";


class Quiz extends React.Component {
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }
    componentWillUnmount() {
        this.props.retryQuiz()
    }
    render() {
        console.log(this.props)
        return (
            <div className={s.Quiz}>
                <div className={s.quizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.props.isLoading || !this.props.quiz
                            ? <Preloader/>
                            : this.props.isFinished
                            ? <FinishedQuiz results={this.props.results}
                                            quiz={this.props.quiz}
                                            onRetry={this.props.retryQuiz}/>
                            : <ActiveQuiz answers={this.props.quiz[this.props.activeQuestion].answers}
                                          question={this.props.quiz[this.props.activeQuestion].question}
                                          onAnswerClick={this.props.quizAnswerClick}
                                          answerNumber={this.props.activeQuestion + 1}
                                          quizLength={this.props.quiz.length}
                                          state={this.props.answerState}/>
                    }


                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,  // { [id]: "success" "error" }
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState, // { [id]: "success" "error" }
        quiz: state.quiz.quiz,
        isLoading: state.quiz.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: quizId => dispatch(fetchQuizById(quizId)),
        quizAnswerClick: answerId => dispatch( quizAnswerClick(answerId )),
        retryQuiz: () => dispatch( retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)