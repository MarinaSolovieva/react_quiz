import React from "react";
import s from "./QuizList.module.css"
import {NavLink} from "react-router-dom";
import Preloader from "../../Components/Ui/Preloader/Preloader";
import instance from "../../Api/Api"

export default class QuizList extends React.Component {

    state= {
       quizez: [],
        isLoading: true
    }

    async componentDidMount() {
        try {
            const response = await instance.get('quizez.json')
            const quizez = []
         Object.keys(response.data).forEach( (key, index) =>{
             quizez.push({
                 id: key,
                 name: `Тест №${index + 1}`
             })
             this.setState({
                 quizez,
                 isLoading: false
             })
         } )
        } catch (error) {
            console.log(error)
        }

        }


    renderQuizes = () => {
        return this.state.quizez.map(quiz => {
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
                        this.state.isLoading
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