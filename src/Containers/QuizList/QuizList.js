import React from "react";
import s from "./QuizList.module.css"
import {NavLink} from "react-router-dom";
import Preloader from "../../Components/Ui/Preloader/Preloader";
import {connect} from "react-redux";
import {fetchQuizez} from "../../store/actions/quiz"

class QuizList extends React.Component {

    componentDidMount() {
        this.props.fetchQuizez()
    }


    renderQuizes = () => {
        return this.props.quizez.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={"/quiz/" + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )

        })
    };


    render() {
        return (
            <div className={s.quizList}>
                <div>
                    <h1>
                        Список тестов
                    </h1>
                    {
                        this.props.isLoading && this.props.quizez.length !==0
                        ? <Preloader/>
                        :   <ul>
                                {this.renderQuizes()}
                            </ul>
                    }

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
return{
    quizez: state.quiz.quizez,
    isLoading: state.quiz.isLoading
}
}

function mapDispatchToProps(dispatch) {
return {
fetchQuizez: () => dispatch(fetchQuizez())
}
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizList)