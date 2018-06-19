import {connect} from "react-redux";
import React, {Component} from "react"
import {deleteWidgetStyle} from "../../../actions/WidgetActions";

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
 * @returns {{deleteWidgetStyle: deleteWidgetStyle}}
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteWidgetStyle: styleKey => {
        dispatch(deleteWidgetStyle(ownProps.widgetId, styleKey));
    }
});

/**
 * Represents a style that overwrites all other default styles
 */
class Style
    extends Component {

    render() {
        return (
            <li>
                {this.props.styleKey + ': ' + this.props.widgets.byId[this.props.widgetId].style[this.props.styleKey]}
                <span className="float-right"
                      onClick={() => this.props.deleteWidgetStyle(this.props.styleKey)}>
                    <i className="fa fa-remove"/>
                </span>
            </li>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Style);