import React from 'react'
import PropTypes from 'prop-types'

import lunr from 'lunr'

class ReactLunr extends React.Component {
  constructor(props) {
    super(props)
    const index = lunr(function() {
      this.ref(props.id)
      props.fields.forEach(field => this.field(field))
      props.documents.forEach(doc => this.add(doc))
    })
    this.state = { filter: '', index, results: [] }
  }

  getResults(filter) {
    if (!filter) return []
    const results = this.state.index
      .search(filter) // search the index
      .map(({ ref, ...rest }) => ({
        ref,
        item: this.props.documents.find(m => m.id === ref),
        ...rest
      })) // attach each item
    return results
  }

  render() {
    const results = this.getResults(this.props.filter)
    return (
      <div>{results.map((result, i) => this.props.children(result, i))}</div>
    )
  }
}

ReactLunr.propTypes = {
  documents: PropTypes.array,
  id: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.string,
  children: PropTypes.func
}

export default ReactLunr
