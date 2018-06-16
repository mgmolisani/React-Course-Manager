import {connect} from "react-redux";
import React, {Component} from "react";
import Style from "../../components/widgetComponents/widgetSubcomponents/Style";

const mapStateToProps = (state, ownProps) => (state);

class StyleList
    extends Component {

    renderStyles() {
        return Object.keys(this.props.widgets.byId[this.props.widgetId].style).map(key => {
            return <Style key={key}
                       widgetId={this.props.widgetId}
                       styleKey={key}/>

        });
    }

    render() {
        return (
            <ul className="list-unstyled px-2">
                {this.renderStyles()}
            </ul>
        )
    }
}

export default connect(
    mapStateToProps
)(StyleList);