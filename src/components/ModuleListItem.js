import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {ListGroupItem} from "reactstrap";

/**
 * Represents a modules as a side nav list.
 */
export default class ModuleListItem
    extends Component {

    render() {
        let module = this.props.module;
        return (
            <ListGroupItem tag={Link}
                           className={`list-group-item ${this.props.isSelected}`}
                           onClick={() => {
                               this.props.changeTab(this.props.module.id)
                           }}
                           style={{
                               display: 'block',
                               textDecoration: 'none',
                               whiteSpace: 'nowrap'
                           }}
                           to={`/course/${this.props.courseId}/module/${module.id}`}>
                {module.title}
                <span className="float-right"
                      onClick={(event) => {
                          this.props.delete(module.id, event)
                      }}>
                    <i className="fa fa-remove"/>
                </span>
                <span className="float-right mr-3"
                      onClick={(event) => {
                          this.props.update(module, event)
                      }}>
                    <i className="fa fa-edit"/>
                </span>
            </ListGroupItem>
        );
    }
}
