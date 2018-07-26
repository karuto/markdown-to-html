import React from 'react';

export default function PreviewToggle({handler, text}) {
  const preview = (
      <div className='preview'>
          <a
          href='#'
          className='preview__link'
          onClick={handler}>
              {text}
          </a>
      </div>
  );

  return preview;
};