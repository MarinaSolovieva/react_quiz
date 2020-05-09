import React from "react";
import s from "./Auth.module.css"
import Button from "../../Components/Ui/Button/button";
import Input from "../../Components/Ui/Input/input";
import is from "is_js"


export default class Auth extends React.Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: " ",
                type: "email",
                label: "Email",
                errorMessage: "Введите корректный email",
                valid: false,
                toTouched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: " ",
                type: "password",
                label: "Пароль",
                errorMessage: "Введите корректный пароль",
                valid: false,
                toTouched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    loginHandler = () => {

    };
    registerHandler = () => {

    };
    submitHandler = event => {
        event.preventDefault()
    };

    validateControl(value, validation) {
        let isValid = true;

        if (!validation) {
            return isValid
        }

        if (validation.required) {
            isValid = value.trim() !== "" && isValid
        }
        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    }

    onChangeHandler = (e, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = e.target.value;
        control.toTouched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        });
        this.setState({
            formControls: formControls,
            isFormValid
        })
    };

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    touched={control.toTouched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    valid={control.valid}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    };



    render() {
        return (
            <div className={s.auth}>
                <div>
                    <h1>
                        Авторизация
                    </h1>
                    <form onSubmit={this.submitHandler} className={s.authForm}>
                        {this.renderInputs()}
                        <Button type="success"
                                onClick={this.loginHandler}
                                disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>
                        <Button type="primary"
                                onClick={this.registerHandler}
                                disabled={!this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

