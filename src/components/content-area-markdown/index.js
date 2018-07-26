import React from 'react';

export default function ContentAreaMarkdown({handler, value}) {
    return (
        <textarea
            autoFocus
            className='content content--markdown'
            value={value}
            onChange={handler}
            />
    );
};