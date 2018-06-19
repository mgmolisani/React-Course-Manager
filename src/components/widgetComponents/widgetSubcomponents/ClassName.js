import {connect} from "react-redux";
import React, {Component} from "react";
import {deleteWidgetClass} from "../../../actions/WidgetActions";

/**
 * State mapper
 * @param state
 * @param ownProps
 * @returns {*}
 */
const mapStateToProps = (state, ownProps) => (state);

/**
 * Dispatch mapper
 * @param dispatch
 * @param ownProps
 * @returns {{deleteWidgetClass: deleteWidgetClass}}
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteWidgetClass: className => {
        dispatch(deleteWidgetClass(ownProps.widgetId, className));
    }
});

/**
 * Represents a classname. these will overwrite all other styles and defaults
 */
class ClassName
    extends Component {

    render() {
        return (
            <li>
                {this.props.className}
                <span className="float-right"
                      onClick={() => this.props.deleteWidgetClass(this.props.className)}>
                    <i className="fa fa-remove"/>
                </span>
            </li>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClassName);