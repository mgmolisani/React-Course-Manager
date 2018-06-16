import {connect} from "react-redux";
import React from "react";
import AbstractStyledComponent from "./AbstractStyledComponent";

const mapStateToProps = (state, ownProps) => (state);

class ParagraphWidget
    extends AbstractStyledComponent {

    render() {
        return (
            <p className={this.createClassName()}
               style={this.createStyle()}>
                {this.props.widgets.byId[this.props.widgetId].text}
            </p>
        )
    }
}


export default connect(
    mapStateToProps
)(ParagraphWidget);