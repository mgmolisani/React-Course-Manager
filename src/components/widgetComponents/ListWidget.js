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
 * Represents a list widget fully previewed
 */
class ListWidget
    extends AbstractStyledComponent {

    renderItems() {
        let i = 0;
        let widget = this.props.widgets.byId[this.props.widgetId];
        if (widget.text) {
            return this.props.widgets.byId[this.props.widgetId].text.split('\n').map(item => (
                <li key={i++}>
                    {item}
                </li>))
        } else {
            return '';
        }
    }

    render() {
        let widget = this.props.widgets.byId[this.props.widgetId];
        console.log(widget.listType);
        switch (widget.listType) {
            case 'Ordered':
                return (
                    <ol className={this.createClassName()}
                        style={this.createStyle()}>
                        {this.renderItems()}
                    </ol>
                );
            case 'Unordered':
                return (
                    <ul className={this.createClassName()}
                        style={this.createStyle()}>
                        {this.renderItems()}
                    </ul>
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
)(ListWidget);