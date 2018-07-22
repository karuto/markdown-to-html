import React from 'react';
import marked from 'marked';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: '# Markdown',
            markup: '<h1 id="markdown">Markdown</h1>',
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
            subheadingGlobal: 'Type Markdown on the left, see HTML on the right.',
            headingMarkdown: 'Markdown:',
            headingMarkup: 'Markup:',
            headingHtml: 'Rendered HTML:',
            placeholderMarkdown: 'Enter your markdown here',
            previewOn: 'Show markup',
            previewOff: 'Show rendered HTML'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.getComponent = this.getComponent.bind(this);
        this.getPreview = this.getPreview.bind(this);
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

        const componentConfig = {
            containerClasses: 'container--content container--' + parsedId.toLowerCase(),
            headingClasses: 'heading heading--' + parsedId.toLowerCase(),
            headingStringId: 'heading' + parsedId
        };

        return (
            <div className={componentConfig.containerClasses}>
                <h2 className={componentConfig.headingClasses}>
                    {this.strings[componentConfig.headingStringId]}
                </h2>
                {this.getTextArea(parsedId)}
            </div>
        );
    }

    getPreview() {
        const text = this.state.isPreview ? this.strings.previewOn : this.strings.previewOff;
        const preview = (
            <div className='preview'>
                <a
                href='#'
                className='preview__link'
                onClick={this.handlePreview}>
                    {text}
                </a>
            </div>
        );

        return preview;
    }

    getHtmlComponent(id, strings) {
        const htmlComponent = this.state.isPreview ?
            this.getComponent('html') :
            this.getComponent('markup');
        return htmlComponent;
    }

    getTextArea(parsedId) {
        const preview = this.getPreview();

        if (parsedId === this.config.validComponentTypes.markup) {
            return (
                <div>
                    {preview}
                    <div className='content content--markup'>
                        {this.state.markup}
                    </div>
                </div>
            );

        }

        if (parsedId === this.config.validComponentTypes.html) {
            return (
                <div>
                    {preview}
                    <div
                        className='content content--html'
                        dangerouslySetInnerHTML={{__html: this.state.markup}}>
                    </div>
                </div>
            );
        }

        if (parsedId === this.config.validComponentTypes.markdown) {
            return <textarea
                autoFocus
                placeholder={this.strings.placeholderMarkdown}
                className='content content--markdown'
                value={this.state.markdown}
                onChange={this.handleChange}
                />;
        }

        return null;
    }

    render() {
        return (
            <div className='container container--global'>
                <div className='overlay'>
                    <header className='titles'>
                        <h1 className='heading heading--titles'>{this.strings.headingGlobal}</h1>
                        <h3 className='subheading subheading--titles'>{this.strings.subheadingGlobal}</h3>
                    </header>
                </div>
                <div className='container container--contents'>
                    {this.getComponent('markdown')}
                    {this.getHtmlComponent()}
                </div>
                <footer className='container'>
                    Made by <a href='https://github.com/karuto'>Vincent Zhang.</a> Find this project on <a href='https://github.com/karuto/markdown-to-html'>GitHub</a> or contact me with <a href='mailto:hello@vincentzh.com'>email.</a>
                </footer>
            </div>
        );
    }
}

export default Page;
