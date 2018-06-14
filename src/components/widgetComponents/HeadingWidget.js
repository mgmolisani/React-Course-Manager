import {connect} from "react-redux";
import React from "react";
import AbstractStyledComponent from "./AbstractStyledComponent";

const mapStateToProps = (state, ownProps) => (state);

class HeadingWidget
    extends AbstractStyledComponent {

    render() {
        switch (this.props.widget.size) {
            case 1:
                return (
                    <h1 className={this.createClassName()}
                        style={this.createStyle()}>
                        {this.props.widget.text}
                    </h1>
                );
            case 2:
                return (
                    <h2 className={this.createClassName()}
                        style={this.createStyle()}>
                        {this.props.widget.text}
                    </h2>
                );
            case 3:
                return (
                    <h3 className={this.createClassName()}
                        style={this.createStyle()}>
                        {this.props.widget.text}
                    </h3>
                );
            default:
                return (
                    <p>Error: Could not render</p>
                );
        }
    }
}

export default connect(
    mapStateToProps
)(HeadingWidget);