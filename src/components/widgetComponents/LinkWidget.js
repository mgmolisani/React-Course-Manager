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
 * Represents a link widget fully previewed
 */
class LinkWidget
    extends AbstractStyledComponent {

    render() {
        return (
            <a className={this.createClassName()}
               style={{
                   textDecoration: 'underline',
                   ...(this.createStyle())
               }}
               href={this.props.widgets.byId[this.props.widgetId].link}>
                {this.props.widgets.byId[this.props.widgetId].text || this.props.widgets.byId[this.props.widgetId].link}
            </a>
        )
    }
}


export default connect(
    mapStateToProps
)(LinkWidget);