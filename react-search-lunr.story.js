import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { create } from 'reworm'

import ReactSearchLunr from './react-search-lunr'
import moonwalkers from './moonwalkers'

const { get, set } = create({ filter: '' })

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }

  componentDidCatch(error) {
    this.setState({ hasError: true, error: error })
  }

  render() {
    if (this.state.hasError) {
      return (
        <p>
          {this.state.error.name} - {this.state.error.message}
        </p>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.func
}

const renderResults = results =>
  results.map(result => (
    <p key={result.ref}>
      <strong>{result.item.name}</strong> - {result.item.body}
    </p>
  ))

storiesOf('ReactSearchLunr', module)
  .add('interactive', () =>
    get(s => (
      <div>
        <input
          onChange={e => set({ filter: e.target.value })}
          value={s.filter}
        />
        <ErrorBoundary key={s.filter}>
          <ReactSearchLunr
            id="id"
            fields={['name', 'body']}
            filter={s.filter}
            documents={moonwalkers}>
            {renderResults}
          </ReactSearchLunr>
        </ErrorBoundary>
      </div>
    ))
  )
  .add('initial filter', () => (
    <div>
      Initial Filter: alan
      <ReactSearchLunr
        id="id"
        fields={['name', 'body']}
        filter="alan"
        documents={moonwalkers}>
        {renderResults}
      </ReactSearchLunr>
    </div>
  ))
