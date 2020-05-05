import React from "react";
import s from "./Drawer.module.css"
import Backdrop from "../../Ui/Backdrop/Backdrop";

const links = [1, 2, 3];

class Drawer extends React.Component {

    renderLinks = () => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <a> Link {link}</a>
                </li>
            )
        })
    };

    render() {
        const cls = [s.drawer]
        if (!this.props.isOpen) {
            cls.push(s.close)
        }

        return (
            <React.Fragment>
                <nav className={cls.join(" ")}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onclick={this.props.onClose}/>: null}
            </React.Fragment>
        )
    }
}

export default Drawer