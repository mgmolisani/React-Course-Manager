import React, {Component} from "react";
import {connect} from "react-redux";
import {
    addWidget,
    condenseWidgets,
    findAllWidgets,
    previewWidgets,
    saveWidgets
} from "../actions/WidgetActions";
import Widget from "../components/Widget";
import {Input, Label} from "reactstrap";
import CustomDragLayer from "./CustomDragLayer";

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
    },

    condenseWidgets: () => {
        dispatch(condenseWidgets())
    }
});

class WidgetList
    extends Component {

    componentDidMount() {
        this.props.findAllWidgets();
    }

    render() {
        let widgets = this.props.widgets;
        //widgets.allIds.sort((a, b) => (widgets.byId[a].position - widgets.byId[b].position));
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
                    <form className="d-flex align-items-center">
                        <div className="row">
                            <Label className="col-form-label">
                                Condense
                            </Label>
                            <Label className="switch m-1">
                                <Input type="checkbox"
                                       onClick={this.props.condenseWidgets}
                                       checked={this.props.condenseWidgetsFlag}
                                       disabled={this.props.previewWidgetsFlag}/>
                                <span className="slider round"/>
                            </Label>
                            <Label className="col-form-label ml-2">
                                Preview
                            </Label>
                            <Label className="switch m-1">
                                <Input type="checkbox"
                                       onClick={this.props.previewWidgets}
                                       checked={this.props.previewWidgetsFlag}/>
                                <span className="slider round"/>
                            </Label>
                        </div>
                    </form>
                </div>
                <hr className="mt-1"/>
                <div className="position-relative">
                    <CustomDragLayer/>
                    {widgets.allIds.map(widgetId => (
                        <Widget widgetId={widgetId}
                                key={widgetId}/>))}
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WidgetList);