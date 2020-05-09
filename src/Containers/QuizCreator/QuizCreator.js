import React from "react";
import s from "./QuizCreator.module.css"
import Button from "../../Components/Ui/Button/button";
import {createControl, validate, validateForm} from "../../Form/FormFramework";
import Input from "../../Components/Ui/Input/input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../Components/Ui/Select/Select";

function createOptionConrtol(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: "Значение не может быть пустым",
        id: number
    }, {required: true})
};

function createFormControls() {
    return {
        question: createControl({
            label: "Введите вопрос",
            errorMessage: "Вопрос не может быть пустым"
        }, {required: true}),
        option1: createOptionConrtol(1),
        option2: createOptionConrtol(2),
        option3: createOptionConrtol(3),
        option4: createOptionConrtol(4)
    }
}


export default class QuizCreator extends React.Component {

    state = {
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    };

    submitHandler = e => {
        e.preventDefault()
    };

    addQuestionHandler = () => {

    };

    createQuizHandler = () => {

    };

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.touched = true;
        control.value = value;
        control.valid = validate(value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls: formControls,
            isFormValid: validateForm(formControls)
        })
    };

    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        value={control.value}
                        touched={control.touched}
                        label={control.label}
                        errorMessage={control.errorMessage}
                        shouldValidate={!!control.validation}
                        valid={control.valid}
                        onChange={e => this.changeHandler(e.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </Auxiliary>
            )
        })
    };

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    };

    render() {
        const select = <Select
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />;
        return (
            <div className={s.quizCreator}>
                <div>
                    <h1>
                        Создание теста
                    </h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}
                        {select}
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}