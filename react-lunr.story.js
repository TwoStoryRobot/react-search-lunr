import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'

import ReactLunr from './react-lunr'
import moonwalkers from './moonwalkers'

class Wrapper extends React.Component {
  state = { filter: '' }

  handleChange = event => {
    const filter = event.target.value
    this.setState({ filter })
  }

  render() {
    return (
      <div>
        search:
        <input onChange={this.handleChange} value={this.state.filter} />
        {this.props.children(this.state.filter)}
      </div>
    )
  }
}

Wrapper.propTypes = {
  children: PropTypes.func
}

storiesOf('ReactLunr', module).add('default', () => {
  const fields = ['name', 'body']
  const id = 'id'
  return (
    <Wrapper>
      {filter => (
        <ReactLunr
          id={id}
          fields={fields}
          documents={moonwalkers}
          filter={filter}>
          {(result, i) => (
            <div key={i}>
              <p>
                <strong>{result.item.name}</strong> - {result.item.body}
              </p>
            </div>
          )}
        </ReactLunr>
      )}
    </Wrapper>
  )
})
