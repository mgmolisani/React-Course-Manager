import React, {Component} from 'react'
import {
    addWidgetClass,
    addWidgetStyle,
    widgetClassChanged,
    widgetNameChanged,
    widgetStyleKeyChanged,
    widgetStyleValueChanged
} from "../../actions/WidgetActions";
import {Button, Col, FormGroup, Input, Label, Row} from "reactstrap";
import ClassList from "../../containers/widgetContainers/ClassList";
import StyleList from "../../containers/widgetContainers/StyleList";
import {connect} from "react-redux";

/**
 * State mapper
 * @param state
 * @param ownProps
 * @returns {*}
 */
const mapStateToProps = (state, ownProps) => (state);

/**
 * Dispatch mapper
 * @param dispatch
 * @param ownProps
 * @returns {{widgetNameChanged: widgetNameChanged, widgetClassChanged: widgetClassChanged, addWidgetClass: addWidgetClass, widgetStyleKeyChanged: widgetStyleKeyChanged, widgetStyleValueChanged: widgetStyleValueChanged, addWidgetStyle: addWidgetStyle}}
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
    widgetNameChanged: name => {
        dispatch(widgetNameChanged(ownProps.widgetId, name));
    },
    widgetClassChanged: className => {
        dispatch(widgetClassChanged(ownProps.widgetId, className));
    },
    addWidgetClass: () => {
        dispatch(addWidgetClass(ownProps.widgetId));
    },
    widgetStyleKeyChanged: styleKey => {
        dispatch(widgetStyleKeyChanged(ownProps.widgetId, styleKey));
    },
    widgetStyleValueChanged: styleValue => {
        dispatch(widgetStyleValueChanged(ownProps.widgetId, styleValue));
    },
    addWidgetStyle: () => {
        dispatch(addWidgetStyle(ownProps.widgetId));
    }
});

/**
 * Represents the shared parts of a widget form
 */
class WidgetForm
    extends Component {

    render() {
        let widget = this.props.widgets.byId[this.props.widgetId];
        return ([
                <FormGroup key={'widget' + this.props.widgetId + 'Name'}>
                    <Label htmlFor={'widget' + this.props.widgetId + 'NameFld'}>
                        Widget Name
                    </Label>
                    <Input id={'widget' + this.props.widgetId + 'NameFld'}
                           type="text"
                           onChange={(event) => {
                               this.props.widgetNameChanged(event.target.value);
                           }}
                           defaultValue={widget.name}>
                    </Input>
                </FormGroup>,
                <Row key={'widget' + this.props.widgetId + 'Style'}>
                    <Col xs="12" md="6">
                        <FormGroup>
                            <Label htmlFor={'widget' + this.props.widgetId + 'ClassFld'}>
                                Classes
                            </Label>
                            <Input id={'widget' + this.props.widgetId + 'ClassFld'}
                                   type="text"
                                   placeholder="Enter class name (e.g. container)"
                                   onChange={(event) => {
                                       this.props.widgetClassChanged(event.target.value);
                                   }}
                                   value={widget.classToAdd || ''}>
                            </Input>
                            <Button color="primary"
                                    type="button"
                                    className="col"
                                    onClick={this.props.addWidgetClass}>
                                <i className="fa fa-plus"/>
                            </Button>
                        </FormGroup>
                        <ClassList widgetId={this.props.widgetId}/>
                    </Col>
                    <Col xs="12" md="6" >
                        <FormGroup>
                            <Label htmlFor={'widget' + this.props.widgetId + 'StyleKeyFld'}>
                                Styles
                            </Label>
                            <Input id={'widget' + this.props.widgetId + 'StyleKeyFld'}
                                   type="text"
                                   placeholder="Enter style key (e.g. backgroundColor)"
                                   onChange={(event) => {
                                       this.props.widgetStyleKeyChanged(event.target.value);
                                   }}
                                   value={widget.styleKeyToAdd || ''}>
                            </Input>
                            <Input id={'widget' + this.props.widgetId + 'StyleValueFld'}
                                   type="text"
                                   placeholder="Enter style value (e.g. blue)"
                                   onChange={(event) => {
                                       this.props.widgetStyleValueChanged(event.target.value);
                                   }}
                                   value={widget.styleValueToAdd || ''}>
                            </Input>
                            <Button color="primary"
                                    type="button"
                                    className="col"
                                    onClick={this.props.addWidgetStyle}>
                                <i className="fa fa-plus"/>
                            </Button>
                        </FormGroup>
                        <StyleList widgetId={this.props.widgetId}/>
                    </Col>
                </Row>
        ]);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WidgetForm);