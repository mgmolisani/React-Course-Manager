import {connect} from "react-redux";
import React, {Component} from "react";
import Style from "../../components/widgetComponents/widgetSubcomponents/Style";

const mapStateToProps = (state, ownProps) => (state);

/**
 * Class to contain a list of styles
 */
class StyleList
    extends Component {

    /**
     * Renders all of the styles.
     * @returns {any[]}
     */
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