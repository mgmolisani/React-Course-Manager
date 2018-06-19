import React, {Component} from 'react'
import {connect} from "react-redux";
import {headingSizeChanged, widgetTextChanged} from "../../actions/WidgetActions";
import {FormGroup, Input, Label} from "reactstrap";

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
 * @returns {{widgetTextChanged: widgetTextChanged, headingSizeChanged: headingSizeChanged}}
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
    widgetTextChanged: text => {
        dispatch(widgetTextChanged(ownProps.widgetId, text));
    },
    headingSizeChanged: size => {
        dispatch(headingSizeChanged(ownProps.widgetId, size));
    }
});

/**
 * Represents the specific parts of a heading widget
 */
class HeadingWidgetForm
    extends Component {

    render() {
        return ([
            <FormGroup key={'widget' + this.props.widgetId + 'Size'}>
                <Label htmlFor={'widget' + this.props.widgetId + 'SizeFld'}>
                    Heading Size
                </Label>
                <Input id={'widget' + this.props.widgetId + 'SizeFld'}
                       type="select"
                       onChange={(event) => {
                           this.props.headingSizeChanged(parseInt(event.target.value, 10));
                       }}
                       value={this.props.widgets.byId[this.props.widgetId].size}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </Input>
            </FormGroup>,
            <FormGroup key={'widget' + this.props.widgetId + 'Text'}>
                <Label htmlFor={'widget' + this.props.widgetId + 'TextFld'}>
                    Heading Text
                </Label>
                <Input id={'widget' + this.props.widgetId + 'TextFld'}
                       type="textarea"
                       placeholder="Enter heading content here"
                       value={this.props.widgets.byId[this.props.widgetId].text}
                       onChange={(event) => {
                           this.props.widgetTextChanged(event.target.value)
                       }}/>
            </FormGroup>
        ]);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeadingWidgetForm);