import React from 'react';

export default function ContentAreaHtml({markup}) {
  return (
    <div
        className='content content--html'
        dangerouslySetInnerHTML={{__html: markup}}>
    </div>
  );
};