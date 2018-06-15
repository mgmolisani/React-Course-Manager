import React, {Component} from 'react'
import {connect} from "react-redux";
import {deleteWidget, moveWidgetDown, moveWidgetUp, selectWidgetType, toggleWidgetEdit} from "../actions/WidgetActions";
import {Card, CardBody, CardFooter, CardHeader, Form, Label} from "reactstrap";
import HeadingWidgetForm from "./widgetComponents/HeadingWidgetForm";
import HeadingWidget from "./widgetComponents/HeadingWidget";
import WidgetForm from "./widgetComponents/WidgetForm";
import ParagraphWidgetForm from "./widgetComponents/ParagraphWidgetForm";
import ParagraphWidget from "./widgetComponents/ParagraphWidget";
import {DragLayer, DragSource} from "react-dnd";

const WIDGET = 'WIDGET';

const widgetSourceSpec = {
    beginDrag(props) {
        return {};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

function collect2(monitor) {
    return {
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    };
}

const mapStateToProps = (state, ownProps) => (state);

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteWidget: () => {
        dispatch(deleteWidget(ownProps.widget.id));
    },
    selectWidgetType: widgetType => {
        dispatch(selectWidgetType(ownProps.widget.id, widgetType));
    },
    moveWidgetUp: () => {
        dispatch(moveWidgetUp(ownProps.widget.id));
    },
    moveWidgetDown: () => {
        dispatch(moveWidgetDown(ownProps.widget.id));
    },
    toggleWidgetEdit: () => {
        dispatch(toggleWidgetEdit(ownProps.widget.id));
    }
});

class Widget
    extends Component {

    constructor(props) {
        super(props);
        this.widgetTypeRef = null;
    }

    renderWidget() {
        switch (this.props.widget.widgetType) {
            case 'Heading':
                return <HeadingWidget widget={this.props.widget}/>;
            case 'Paragraph':
                return <ParagraphWidget widget={this.props.widget}/>;
            default:
                return null;
        }
    }

    render() {
        if (this.props.previewWidgetsFlag
            || (this.props.widgetToEdit && this.props.widgetToEdit !== this.props.widget.id)) {
            return this.renderWidget();
        } else if (!this.props.isDragging) {
            return (this.props.connectDragSource(
                <div className="card my-3">
                    <CardHeader className="form-inline">
                        <div className="d-flex flex-wrap justify-content-between w-100">
                            <div>
                                <h2>{this.props.widget.name || this.props.widget.widgetType + ' Widget'}</h2>
                            </div>
                            <div className="d-flex align-items-center">
                                <select className="form-control"
                                        onChange={(event) => {
                                            this.props.selectWidgetType(this.widgetTypeRef.value)
                                        }}
                                        value={this.props.widget.widgetType}
                                        ref={node => this.widgetTypeRef = node}>
                                    <option>Paragraph</option>
                                    <option>Heading</option>
                                </select>
                                <span className={`float-right ml-3`}
                                      onClick={this.props.toggleWidgetEdit}>
                                    <i className="fa fa-edit"/>
                                </span>
                                <span className={`float-right ml-3 ${this.props.widget.position === 0 ? 'd-none' : ''}`}
                                      onClick={this.props.moveWidgetUp}>
                                    <i className="fa fa-arrow-up"/>
                                </span>
                                <span
                                    className={`float-right ml-3 ${this.props.widget.position === this.props.widgets.length - 1 ? 'd-none' : ''}`}
                                    onClick={this.props.moveWidgetDown}>
                                    <i className="fa fa-arrow-down"/>
                                </span>
                                <span className="float-right ml-3"
                                      onClick={this.props.deleteWidget}>
                                    <i className="fa fa-remove"/>
                                </span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <WidgetForm widget={this.props.widget}/>
                            {this.props.widget.widgetType === 'Heading' &&
                            <HeadingWidgetForm widget={this.props.widget}/>}
                            {this.props.widget.widgetType === 'Paragraph' &&
                            <ParagraphWidgetForm widget={this.props.widget}/>}
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Label className="d-block">
                            Preview
                        </Label>
                        {this.renderWidget()}
                    </CardFooter>
                </div>
            ))
        } else {
            return null;
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DragLayer(
    collect2
)(DragSource(
    WIDGET,
    widgetSourceSpec,
    collect
)(Widget)));