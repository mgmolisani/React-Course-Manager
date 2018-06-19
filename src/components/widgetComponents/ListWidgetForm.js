import React, {Component} from 'react'
import {connect} from "react-redux";
import {listTypeChanged, widgetTextChanged} from "../../actions/WidgetActions";
import {FormGroup, Input, Label} from "reactstrap";

const mapStateToProps = (state, ownProps) => (state);

const mapDispatchToProps = (dispatch, ownProps) => ({
    widgetTextChanged: text => {
        dispatch(widgetTextChanged(ownProps.widgetId, text));
    },
    listTypeChanged: listType => {
        dispatch(listTypeChanged(ownProps.widgetId, listType));
    }
});

class ListWidgetForm
    extends Component {

    render() {
        return ([
            <FormGroup key={'widget' + this.props.widgetId + 'ListType'}>
                <Label htmlFor={'widget' + this.props.widgetId + 'ListTypeFld'}>
                    List Type
                </Label>
                <Input id={'widget' + this.props.widgetId + 'ListTypeFld'}
                       type="select"
                       onChange={(event) => {
                           this.props.listTypeChanged(event.target.value);
                       }}
                       value={this.props.widgets.byId[this.props.widgetId].listType}>
                    <option value="Ordered">Ordered</option>
                    <option value="Unordered">Unordered</option>
                </Input>
            </FormGroup>,
            <FormGroup key={'widget' + this.props.widgetId + 'Text'}>
                <Label htmlFor={'widget' + this.props.widgetId + 'TextFld'}>
                    List Items
                </Label>
                <Input id={'widget' + this.props.widgetId + 'TextFld'}
                       type="textarea"
                       placeholder="Enter list items separated with new lines"
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
)(ListWidgetForm);