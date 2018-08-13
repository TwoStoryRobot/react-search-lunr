import React from 'react'
import PropTypes from 'prop-types'

import lunr from 'lunr'

class ReactLunr extends React.Component {
  constructor(props) {
    super(props)
    const index = lunr(function() {
      this.field('name')
      this.field('body')
      this.ref('id')
      props.moonwalkers.forEach(walker => this.add(walker))
    })
    this.state = { filter: '', index, results: [] }
  }

  handleChange = event => {
    const filter = event.target.value
    const results = this.state.index
      .search(filter) // search the index
      .map(({ ref, ...rest }) => ({
        ref,
        item: this.props.moonwalkers.find(m => m.id === ref),
        ...rest
      })) // attach each item
    this.setState({ results, filter })
  }

  render() {
    const { results } = this.state
    return (
      <div>
        <input onChange={this.handleChange} value={this.state.filter} />
        {results.map((result, i) => (
          <div key={i}>
            <h1>{result.item.name}</h1>
            <p>{result.item.body}</p>
          </div>
        ))}
      </div>
    )
  }
}

ReactLunr.propTypes = {
  moonwalkers: PropTypes.array
}

export default ReactLunr
