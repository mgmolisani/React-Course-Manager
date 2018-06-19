import {Component} from "react";

/**
 * Creates the shared methods of the widgets
 */
export default class AbstractStyledComponent
    extends Component {

    constructor(props) {
        super(props);
        if (new.target === AbstractStyledComponent) {
            throw new TypeError("Cannot construct instances directly");
        }
    }

    /**
     * Creates the classes
     * @returns {string}
     */
    createClassName() {
         return this.props.widgets.byId[this.props.widgetId].className.join(' ');
    }

    /**
     * Creaetes the styles
     * @returns {*}
     */
    createStyle() {
        return this.props.widgets.byId[this.props.widgetId].style;
    }
}