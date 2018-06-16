import React, {Component} from 'react'
import {connect} from "react-redux";
import {deleteWidget, moveWidget, selectWidgetType, toggleWidgetEdit} from "../actions/WidgetActions";
import {Card, CardBody, CardFooter, CardHeader, Form, Label} from "reactstrap";
import HeadingWidgetForm from "./widgetComponents/HeadingWidgetForm";
import HeadingWidget from "./widgetComponents/HeadingWidget";
import WidgetForm from "./widgetComponents/WidgetForm";
import ParagraphWidgetForm from "./widgetComponents/ParagraphWidgetForm";
import ParagraphWidget from "./widgetComponents/ParagraphWidget";
import {DragSource, DropTarget} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";

const WIDGET = 'WIDGET';

const widgetSourceSpec = {
    beginDrag(props, monitor, component) {
        return {
            widgetId: props.widgetId,
            offsetTop: component.widgetRef.parentElement.getBoundingClientRect().top + window.scrollY,
            maxOffset: component.widgetRef.parentElement.offsetHeight - component.widgetRef.offsetHeight
        };
    }
};

const widgetTargetSpec = {
    hover(props, monitor, component) {
        let targetWidget = props.widgets.byId[props.widgetId];
        let sourceWidget = props.widgets.byId[monitor.getItem().widgetId];
        if (targetWidget.position !== sourceWidget.position) {
            props.moveWidget(sourceWidget.id, targetWidget.position);
        }
    }
};

function collectDrag(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

const mapStateToProps = (state, ownProps) => (state);

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteWidget: () => {
        dispatch(deleteWidget(ownProps.widgetId));
    },
    selectWidgetType: widgetType => {
        dispatch(selectWidgetType(ownProps.widgetId, widgetType));
    },
    moveWidget: (id, position) => {
        dispatch(moveWidget(id, position))
    },
    toggleWidgetEdit: () => {
        dispatch(toggleWidgetEdit(ownProps.widgetId));
    }
});

class Widget
    extends Component {

    constructor(props) {
        super(props);
        this.widgetTypeRef = null;
        this.widgetRef = null;
    }

    componentWillMount() {
        this.props.connectDragPreview(getEmptyImage());

    }

    renderWidget() {
        switch (this.props.widgets.byId[this.props.widgetId].widgetType) {
            case 'Heading':
                return <HeadingWidget widgetId={this.props.widgetId}/>;
            case 'Paragraph':
                return <ParagraphWidget widgetId={this.props.widgetId}/>;
            default:
                return null;
        }
    }

    render() {
        let widget = this.props.widgets.byId[this.props.widgetId];
        if (this.props.previewWidgetsFlag
            || (this.props.widgetToEdit && this.props.widgetToEdit !== this.props.widgetId)) {
            return this.renderWidget();
        } else {
            return (
                this.props.connectDropTarget(
                <div className="card mb-3" style={Object.assign({},
                    {opacity: this.props.isDragging ? 0.4 : 1},
                    this.props.style)}
                     ref={node => this.widgetRef = node}>
                    {this.props.connectDragSource(
                        <div className={`card-header form-inline ${this.props.condenseWidgetsFlag ? 'border-0' : ''}`}>
                            <div className="d-flex flex-wrap justify-content-between w-100">
                                <div>
                                    <h2>{widget.name || widget.widgetType + ' Widget'}</h2>
                                </div>
                                <div className="d-flex align-items-center">
                                    <select className="form-control"
                                            onChange={(event) => {
                                                this.props.selectWidgetType(this.widgetTypeRef.value)
                                            }}
                                            value={widget.widgetType}
                                            ref={node => this.widgetTypeRef = node}>
                                        <option>Paragraph</option>
                                        <option>Heading</option>
                                    </select>
                                    <span className={`float-right ml-3`}
                                          onClick={this.props.toggleWidgetEdit}>
                                    <i className="fa fa-edit"/>
                                </span>
                                    <span
                                        className={`float-right ml-3 ${widget.position === 0 ? 'd-none' : ''}`}
                                        onClick={() => (this.props.moveWidget(widget.id, widget.position - 1))}>
                                    <i className="fa fa-arrow-up"/>
                                </span>
                                    <span
                                        className={`float-right ml-3 ${widget.position === this.props.widgets.allIds.length - 1 ? 'd-none' : ''}`}
                                        onClick={() => (this.props.moveWidget(this.props.widgetId, widget.position + 1))}>
                                    <i className="fa fa-arrow-down"/>
                                </span>
                                    <span className="float-right ml-3"
                                          onClick={this.props.deleteWidget}>
                                    <i className="fa fa-remove"/>
                                </span>
                                </div>
                            </div>
                        </div>)}
                    <CardBody className={this.props.condenseWidgetsFlag ? 'd-none' : ''}>
                        <Form>
                            <WidgetForm widgetId={this.props.widgetId}/>
                            {widget.widgetType === 'Heading' &&
                            <HeadingWidgetForm widgetId={this.props.widgetId}/>}
                            {widget.widgetType === 'Paragraph' &&
                            <ParagraphWidgetForm widgetId={this.props.widgetId}/>}
                        </Form>
                    </CardBody>
                    <CardFooter className={this.props.condenseWidgetsFlag ? 'd-none' : ''}>
                        <Label className="d-block">
                            Preview
                        </Label>
                        {this.renderWidget()}
                    </CardFooter>
                </div>
            ))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DropTarget(
    WIDGET,
    widgetTargetSpec,
    collectDrop
)(DragSource(
    WIDGET,
    widgetSourceSpec,
    collectDrag
)(Widget)));