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
         return this.props.widgets.byId[this.props.widgetId].className.join(' ');
    }

    createStyle() {
        return this.props.widgets.byId[this.props.widgetId].style;
    }
}