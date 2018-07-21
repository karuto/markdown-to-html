import React from 'react';
import marked from 'marked';
import styles from './styles.js'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: 'markdown',
            markup: 'markup',
            isPreview: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
    }

    handleChange(event) {
        this.setState({
            markdown: event.target.value,
            markup: marked(event.target.value)
        });
    }

    handlePreview() {
        this.setState((prevState) => ({
            isPreview: !prevState.isPreview
        }));
    }

    render() {
        const strings = {
                headingGlobal: 'Markdown to HTML',
                headingMarkdown: 'Markdown:',
                headingMarkup: 'Markup:',
                headingHtml: 'Rendered HTML:',
                previewLink: this.state.isPreview ? 'Hide preview' : 'Show preview'
        };

        const htmlMarkup = (
            <div style={styles.containerString}>
                {strings.headingMarkup}
                <textarea value={this.state.markup} readOnly />
            </div>
        );

        const htmlRendered = (
            <div>
                {strings.headingHtml}
                <div dangerouslySetInnerHTML={{__html: this.state.markup}} />
            </div>
        );

        const htmlArea = this.state.isPreview ? htmlRendered : htmlMarkup;

        return (
            <div style={styles.global}>
                <div style={styles.heading}>{strings.headingGlobal}</div>
                <a href="#" onClick={this.handlePreview}>{strings.previewLink}</a>
                <div style={styles.containerMarkdown}>
                    {strings.headingMarkdown}
                    <textarea style={styles.textareaMarkdown} value={this.state.markdown} onChange={this.handleChange} />
                </div>
                <br/>
                {htmlArea}
            </div>
        );
    }
}

export default Page;
