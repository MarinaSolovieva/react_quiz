import React from "react";
import s from "./button.module.css"

const Button = props => {
    const cls = [
        s.button,
        s[props.type]
    ]
    return (
        <button onClick={props.onClick}
        className={cls.join(" ")}
        disabled={props.disabled}>
            {props.children}
        </button>
    )
}

export default Button