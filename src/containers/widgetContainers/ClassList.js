import {connect} from "react-redux";
import React, {Component} from "react";
import ClassName from "../../components/widgetComponents/widgetSubcomponents/ClassName";

const mapStateToProps = (state, ownProps) => (state);

class ClassList
    extends Component {

    renderClassNames() {
        let i = 0;
        return (
            this.props.widget.className.map(className => (
                <ClassName key={'widgetClass' + i++}
                           widget={this.props.widget}
                           className={className}/>
            ))
        )
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