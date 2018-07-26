import React from 'react';

export default function ContentAreaMarkdown({h}) {
    const content = (
        <div>
            Made by <a href='https://github.com/karuto'>Vincent Zhang.</a> 
            Find this project on <a href='https://github.com/karuto/markdown-to-html'>GitHub</a> or write me an <a href='mailto:hello@vincentzh.com'>email.</a>
        </div>
    );

    return (
        <footer className='container'>
            {content}
        </footer>
    );
};