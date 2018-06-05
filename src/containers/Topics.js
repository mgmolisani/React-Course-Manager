import React from 'react'

/**
 * This is a placeholder class for a topic as it was not required for this assignment.
 * This placeholder currently will only dynamically tell you what lesson the topic belongs to that you are editing.
 * Normally, this would render cards or something similar under the lesson tabs.
 */
export default class Topics
    extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topics: []
        };
    }

    render() {
        return (
            <div className="text-center">
                <h3>
                    This is a placeholder where you would edit topics for lesson {this.props.lessonId} if it had been required.
                </h3>
            </div>
        );
    }
}

