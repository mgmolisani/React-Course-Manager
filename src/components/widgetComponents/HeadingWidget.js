import {connect} from "react-redux";
import React from "react";
import AbstractStyledComponent from "./AbstractStyledComponent";

/**
 * State mapper
 * @param state
 * @param ownProps
 * @returns {*}
 */
const mapStateToProps = (state, ownProps) => (state);

/**
 * Represents a heading widget fully previewed
 */
class HeadingWidget
    extends AbstractStyledComponent {

    render() {
        let widget = this.props.widgets.byId[this.props.widgetId];
        switch (widget.size) {
            case 1:
                return (
                    <h1 className={this.createClassName()}
                        style={this.createStyle()}>
                        {widget.text}
                    </h1>
                );
            case 2:
                return (
                    <h2 className={this.createClassName()}
                        style={this.createStyle()}>
                        {widget.text}
                    </h2>
                );
            case 3:
                return (
                    <h3 className={this.createClassName()}
                        style={this.createStyle()}>
                        {widget.text}
                    </h3>
                );
            default:
                return (
                    <p>Error: Could not render</p>
                );
        }
    }
}

export default connect(
    mapStateToProps
)(HeadingWidget);