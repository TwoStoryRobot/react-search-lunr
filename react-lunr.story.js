import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { State, Store, StateDecorator } from '@sambego/storybook-state'

import ReactLunr from './react-lunr'
import moonwalkers from './moonwalkers'

const store = new Store({
  filter: ''
})
const errorStore = new Store({
  error: null
})

function Input({ filter, ...rest }) {
  return <input value={filter} {...rest} />
}

Input.propTypes = {
  filter: PropTypes.string
}

function Error({ error }) {
  const message = error ? error.message : null
  return <div>{message}</div>
}

Error.propTypes = {
  error: PropTypes.instanceOf(Error)
}

storiesOf('ReactLunr', module)
  .addDecorator(StateDecorator(store))
  .add('default', () => {
    const handleChange = e => {
      store.set({ filter: e.target.value })
    }
    const onError = e => {
      errorStore.set({ error: e })
    }
    return [
      <Input key="input" onChange={handleChange} />,
      <State key="error" store={errorStore}>
        <Error />
      </State>,
      <ReactLunr
        key="lunr"
        id="id"
        fields={['name', 'body']}
        onErrorChange={onError}
        documents={moonwalkers}>
        {results => {
          return results.map(result => (
            <div key={result.ref}>
              <p>
                <strong>{result.item.name}</strong> - {result.item.body}
              </p>
            </div>
          ))
        }}
      </ReactLunr>
    ]
  })
