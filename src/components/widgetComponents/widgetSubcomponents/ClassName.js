import {connect} from "react-redux";
import React, {Component} from "react";
import {deleteWidgetClass} from "../../../actions/WidgetActions";

const mapStateToProps = (state, ownProps) => (state);

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteWidgetClass: className => {
        dispatch(deleteWidgetClass(ownProps.widget.id, className));
    }
});

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