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
        this.config = {
            validComponentTypes: {
                markdown: 'Markdown',
                markup: 'Markup',
                html: 'Html'
            }
        };
        this.strings = {
            headingGlobal: 'Markdown to HTML',
            headingMarkdown: 'Markdown:',
            headingMarkup: 'Markup:',
            headingHtml: 'Rendered HTML:'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.getComponent = this.getComponent.bind(this);
        this.getHtmlComponent = this.getHtmlComponent.bind(this);
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

    getComponent(id) {
        if (!(id || this.config.validComponentTypes.hasOwnProperty(id.toLowerCase()))) {
            return null;
        }

        const parsedId = this.config.validComponentTypes[id];
        console.log(id, parsedId);

        const componentConfig = {
            containerStyleId: 'container' + parsedId,
            headingStyleId: 'heading' + parsedId,
            headingStringId: 'heading' + parsedId
        };

        return (
            <div style={styles[componentConfig.containerStyleId]}>
                <h2 style={styles[componentConfig.headingStyleId]}>
                    {this.strings[componentConfig.headingStringId]}
                </h2>
                {this.getTextArea(parsedId)}
            </div>
        );
    }

    getHtmlComponent(id, strings) {
        const htmlComponent = this.state.isPreview ?
            this.getComponent('html') :
            this.getComponent('markup');
        return htmlComponent;
    }

    getTextArea(parsedId) {
        if (parsedId === this.config.validComponentTypes.markup) {
            return (
                <div style={styles.contentMarkup}>
                    {this.state.markup}
                </div>
            );

        }

        if (parsedId === this.config.validComponentTypes.html) {
            return (
                <div
                    style={styles.contentHtml}
                    dangerouslySetInnerHTML={{__html: this.state.markup}}>
                </div>
            );
        }

        if (parsedId === this.config.validComponentTypes.markdown) {
            return <textarea
                autoFocus
                rows='4'
                style={styles.contentMarkdown}
                value={this.state.markdown}
                onChange={this.handleChange}
                />;
        }

        return null;
    }

    render() {
        this.strings.previewLink = this.state.isPreview ? 'Hide preview' : 'Show preview';

        // const preview = <a href="#" onClick={this.handlePreview}>{this.strings.previewLink}</a>;
        const preview = null;

        return (
            <div style={styles.global}>
                <h1 style={styles.heading}>{this.strings.headingGlobal}</h1>
                <div style={styles.containerGlobal}>
                    {preview}
                    {this.getComponent('markdown')}
                    {this.getHtmlComponent()}
                </div>
            </div>
        );
    }
}

export default Page;
