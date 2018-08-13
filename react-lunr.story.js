import React from 'react'
import { storiesOf } from '@storybook/react'

import ReactLunr from './react-lunr'
import moonwalkers from './moonwalkers'

storiesOf('ReactLunr', module).add('default', () => {
  const fields = ['name', 'body']
  const id = 'id'
  return (
    <ReactLunr id={id} fields={fields} documents={moonwalkers}>
      {(result, i) => (
        <div key={i}>
          <p>
            <strong>{result.item.name}</strong> - {result.item.body}
          </p>
        </div>
      )}
    </ReactLunr>
  )
})
