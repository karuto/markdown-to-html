import React from 'react';
import marked from 'marked';
import ContentAreaHtml from '../content-area-html';
import ContentAreaMarkup from '../content-area-markup';
import ContentAreaMarkdown from '../content-area-markdown';
import PreviewToggle from '../preview-toggle';
import Footer from '../footer';

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
            containerClasses: 'container--content container--' + parsedId.toLowerCase()
        };

        return (
            <div className={componentConfig.containerClasses}>
                {this.getContentArea(parsedId)}
            </div>
        );
    }

    getPreview() {
        const text = this.state.isPreview ? this.strings.previewOn : this.strings.previewOff;
        return <PreviewToggle text={text} handler={this.handlePreview} />
    }

    getHtmlComponent(id, strings) {
        const htmlComponent = this.state.isPreview ?
            this.getComponent('html') :
            this.getComponent('markup');
        return htmlComponent;
    }

    getContentArea(parsedId) {
        const preview = this.getPreview();

        if (parsedId === this.config.validComponentTypes.markup) {
            return (
                <div>
                    {preview}
                    <ContentAreaMarkup markup={this.state.markup} />
                </div>
            );

        }

        if (parsedId === this.config.validComponentTypes.html) {
            return (
                <div>
                    {preview}
                    <ContentAreaHtml markup={this.state.markup} />
                </div>
            );
        }

        if (parsedId === this.config.validComponentTypes.markdown) {
            return <ContentAreaMarkdown value={this.state.markdown} handler={this.handleChange} />;
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
                <Footer />
            </div>
        );
    }
}

export default Page;
