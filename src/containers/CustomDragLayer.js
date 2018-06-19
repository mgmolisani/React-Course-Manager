import React, {Component} from "react";
import Widget from "../components/Widget";
import {DragLayer} from "react-dnd";

const layerStyles = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    width: '100%'
};

const collect = monitor => {
    let offsetDifference = monitor.getSourceClientOffset();
    let hiddenOffset = monitor.getItem() ? monitor.getItem().offsetTop : 0;
    let currentOffset = null;
    if (offsetDifference && hiddenOffset) {
        currentOffset = offsetDifference.y - hiddenOffset;
    }
    return {
        item: monitor.getItem() ? monitor.getItem().widgetId : null,
        currentOffset,
        itemType: monitor.getItemType(),
        maxOffset: monitor.getItem() ? monitor.getItem().maxOffset : null,
        isDragging: monitor.isDragging()
    }
};

class CustomDragLayer
    extends Component {

    style() {
        let top = 0;
        if (this.props.currentOffset + window.scrollY < 0) {
            top = 0;
        } else if (this.props.currentOffset + window.scrollY > this.props.maxOffset) {
            top = this.props.maxOffset;
        } else {
            top = this.props.currentOffset + window.scrollY;
        }

        return Object.assign({},
            layerStyles,
            {top})
    }

    render() {
        if (!this.props.isDragging) {
            return null;
        }

        if (this.props.itemType === 'WIDGET') {
            return (
                <Widget widgetId={this.props.item} style={this.style()}/>
            );
        } else {
            return null;
        }
    }
}

export default DragLayer(
    collect
)(CustomDragLayer);