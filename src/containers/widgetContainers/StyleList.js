import {connect} from "react-redux";
import React, {Component} from "react";
import Style from "../../components/widgetComponents/widgetSubcomponents/Style";

const mapStateToProps = (state, ownProps) => (state);

class StyleList
    extends Component {

    renderStyles() {
        let style = [];
        for (let i = 0; i < this.props.widget.style.keys.length; i++) {
            style.push(
                <Style key={'widgetStyle' + i}
                       widget={this.props.widget}
                       styleKey={this.props.widget.style.keys[i]}
                       styleValue={this.props.widget.style.values[i]}/>
            )
        }
        return style;
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