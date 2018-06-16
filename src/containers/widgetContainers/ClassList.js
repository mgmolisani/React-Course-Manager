import {connect} from "react-redux";
import React, {Component} from "react";
import ClassName from "../../components/widgetComponents/widgetSubcomponents/ClassName";

const mapStateToProps = (state, ownProps) => (state);

class ClassList
    extends Component {

    renderClassNames() {
        return this.props.widgets.byId[this.props.widgetId].className.map(className => (
            <ClassName key={className}
                       widgetId={this.props.widgetId}
                       className={className}/>
        ));
    }

    render() {
        return (
            <ul className="list-unstyled px-2">
                {this.renderClassNames()}
            </ul>
        )
    }
}

export default connect(
    mapStateToProps
)(ClassList);