import React, {Component} from 'react'
import {connect} from "react-redux";
import {linkChanged, widgetTextChanged} from "../../actions/WidgetActions";
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
 * @returns {{widgetTextChanged: widgetTextChanged, linkChanged: linkChanged}}
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
    widgetTextChanged: text => {
        dispatch(widgetTextChanged(ownProps.widgetId, text));
    },
    linkChanged: link => {
        dispatch(linkChanged(ownProps.widgetId, link));
    }
});

/**
 * Represents the specific parts of link widgets
 */
class LinkWidgetForm
    extends Component {

    render() {
        console.log(this.props.widgets.byId[this.props.widgetId]);
        return ([
            <FormGroup key={'widget' + this.props.widgetId + 'Link'}>
                <Label htmlFor={'widget' + this.props.widgetId + 'LinkFld'}>
                    Link URL
                </Label>
                <Input id={'widget' + this.props.widgetId + 'LinkFld'}
                       type="text"
                       placeholder="e.g. http://google.com (include entire path)"
                       onChange={(event) => {
                           this.props.linkChanged(event.target.value);
                       }}
                       value={this.props.widgets.byId[this.props.widgetId].link}>
                </Input>
            </FormGroup>,
            <FormGroup key={'widget' + this.props.widgetId + 'Text'}>
                <Label htmlFor={'widget' + this.props.widgetId + 'TextFld'}>
                    Link Text
                </Label>
                <Input id={'widget' + this.props.widgetId + 'TextFld'}
                       type="textarea"
                       placeholder="Enter text to replace the URL"
                       value={this.props.widgets.byId[this.props.widgetId].text}
                       onChange={(event) => {
                           this.props.widgetTextChanged(event.target.value)
                       }}/>
            </FormGroup>]
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LinkWidgetForm);