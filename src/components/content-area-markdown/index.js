import React from 'react';

class ContentAreaMarkdown extends React.Component {
    constructor(props) {
        super(props);
        this.element = null;

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(this.element.scrollHeight);
        this.props.handler(event);
    }

    render() {
        return (
            <textarea
                autoFocus
                className='content content--markdown'
                value={this.props.value}
                onChange={this.handleChange}
                ref={(ref) => {this.element = ref;}}
                />
        );
    }
}

export default ContentAreaMarkdown;
