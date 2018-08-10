import React from 'react'

import lunr from 'lunr'
import moonwalkers from './moonwalkers'

class ReactLunr extends React.Component {
  constructor(props) {
    super(props)
    console.log({ props, moonwalkers })
    const index = lunr(function() {
      this.field('name')
      this.field('body')
      this.ref('id')
      moonwalkers.forEach(walker => this.add(walker))
    })
    this.state = { filter: '', index, results: [] }
  }

  handleChange = event => {
    const filter = event.target.value
    const results = this.state.index.search(filter).map(({ ref, ...rest }) => ({
      ref,
      item: moonwalkers.find(m => m.id === ref),
      ...rest
    }))
    this.setState({ results, filter })
  }

  render() {
    const { results } = this.state
    console.log({ results })
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

export default ReactLunr
