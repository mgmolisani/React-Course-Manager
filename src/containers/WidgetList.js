import React, {Component} from "react";
import {connect} from "react-redux";
import {addWidget, findAllWidgets, previewWidgets, saveWidgets} from "../actions/WidgetActions";
import Widget from "../components/Widget";
import {Input, Label} from "reactstrap";

const mapStateToProps = (state, ownProps) => (state);

const mapDispatchToProps = (dispatch, ownProps) => ({
    addWidget: () => {
        dispatch(addWidget())
    },

    saveWidgets: () => {
        dispatch(saveWidgets())
    },

    findAllWidgets: () => {
        dispatch(findAllWidgets())
    },

    previewWidgets: () => {
        dispatch(previewWidgets())
    }
});

class WidgetList
    extends Component {

    componentDidMount() {
        this.props.findAllWidgets();
    }


    render() {
        let widgets = this.props.widgets;
        widgets.sort((a, b) => (a.position - b.position));
        return (
            <div>
                <div className="d-flex align-items-center justify-content-between w-100 mt-1">
                    <div>
                        <button className="btn btn-secondary m-1"
                                onClick={this.props.saveWidgets}>
                            Save
                        </button>
                        <button className="btn btn-primary m-1"
                                onClick={this.props.addWidget}>
                            <i className="fa fa-plus"/>
                        </button>
                    </div>
                    <div className="d-flex align-items-center">
                        Preview
                        <Label className="switch m-1">
                            <Input type="checkbox"
                                   onClick={this.props.previewWidgets}
                                   checked={this.props.previewWidgetsFlag}/>
                            <span className="slider round"/>
                        </Label>
                    </div>
                </div>
                <hr className="mt-1"/>
                <div>
                    {this.props.widgets.map(widget => (
                        <Widget widget={widget}
                                key={widget.id}/>
                    ))}
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WidgetList);