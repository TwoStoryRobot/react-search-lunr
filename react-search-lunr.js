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
    this.state = { index, documents: props.documents }
  }

  getResults(filter) {
    if (!filter) return []
    const results = this.state.index
      .search(filter) // search the index
      .map(({ ref, ...rest }) => ({
        ref,
        item: this.state.documents.find(m => m.id == ref),
        ...rest
      })) // attach each item
    return results
  }

  render() {
    const results = this.getResults(this.props.filter)
    return this.props.children(results)
  }
}

ReactLunr.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
  documents: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  children: PropTypes.func
}

export default ReactLunr
