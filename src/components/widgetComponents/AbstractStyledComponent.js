import {Component} from "react";

export default class AbstractStyledComponent
    extends Component {

    constructor(props) {
        super(props);
        if (new.target === AbstractStyledComponent) {
            throw new TypeError("Cannot construct instances directly");
        }
    }

    createClassName() {
         return this.props.widget.className.join(' ');
    }

    createStyle() {
        let style = {};
        for (let i = 0; i < this.props.widget.style.keys.length; i++) {
            Object.assign(style,
                JSON.parse(`{"${this.props.widget.style.keys[i]}":"${this.props.widget.style.values[i]}"}`));
        }
        return style;
    }
}