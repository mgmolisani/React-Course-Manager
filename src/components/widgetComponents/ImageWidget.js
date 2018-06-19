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
 * Represents an image widget fully previewed
 */
class ImageWidget
    extends AbstractStyledComponent {

    render() {
        return (
            <img className={this.createClassName()}
                 style={{
                     height: this.props.widgets.byId[this.props.widgetId].height,
                     width: this.props.widgets.byId[this.props.widgetId].width,
                     ...(this.createStyle())
                 }}
                 src={this.props.widgets.byId[this.props.widgetId].image}
                 alt={this.props.widgets.byId[this.props.widgetId].text}/>
        )
    }
}

export default connect(
    mapStateToProps
)(ImageWidget);