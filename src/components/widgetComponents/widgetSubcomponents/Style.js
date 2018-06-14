import {connect} from "react-redux";
import React, {Component} from "react"
import {deleteWidgetStyle} from "../../../actions/WidgetActions";

const mapStateToProps = (state, ownProps) => (state);

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteWidgetStyle: styleKey => {
        dispatch(deleteWidgetStyle(ownProps.widget.id, styleKey));
    }
});

class ClassName
    extends Component {

    render() {
        return (
            <li>
                {this.props.styleKey + ': ' + this.props.styleValue}
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
)(ClassName);