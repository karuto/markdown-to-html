import React from 'react';

class ContentAreaMarkdown extends React.Component {
    constructor(props) {
        super(props);
        this.element = null;
        this.style = null;

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.style = {height: `${this.element.scrollHeight}px`};
        this.props.handler(event);
    }

    render() {
        return (
            <textarea
                autoFocus
                className='content content--markdown'
                style={this.style}
                value={this.props.value}
                onChange={this.handleChange}
                ref={(ref) => {this.element = ref;}}
                />
        );
    }
}

export default ContentAreaMarkdown;
