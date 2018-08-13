import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { Store, StateDecorator } from '@sambego/storybook-state'

import ReactLunr from './react-lunr'
import moonwalkers from './moonwalkers'

const store = new Store({
  filter: ''
})

function Input({ filter, ...rest }) {
  return <input value={filter} {...rest} />
}

Input.propTypes = {
  filter: PropTypes.string
}

storiesOf('ReactLunr', module)
  .addDecorator(StateDecorator(store))
  .add('default', () => {
    const handleChange = e => {
      store.set({ filter: e.target.value })
    }
    return [
      <Input key="input" onChange={handleChange} />,
      <ReactLunr
        key="lunr"
        id="id"
        fields={['name', 'body']}
        documents={moonwalkers}>
        {(result, i) => (
          <div key={i}>
            <p>
              <strong>{result.item.name}</strong> - {result.item.body}
            </p>
          </div>
        )}
      </ReactLunr>
    ]
  })
