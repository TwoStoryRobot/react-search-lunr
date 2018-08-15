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

  static getDerivedStateFromProps(props, state) {
    if (state.prevFilter !== props.filter) {
      try {
        const results = state.index
          .search(props.filter)
          .map(({ ref, ...rest }) => ({
            ref,
            item: state.documents.find(m => m.id === ref),
            ...rest
          }))

        return { results, prevFilter: props.filter, error: null }
      } catch (e) {
        if (!(e instanceof lunr.QueryParseError)) throw e
        return { error: e }
      }
    }
    return null
  }

  render() {
    if (this.props.onErrorChange) this.props.onErrorChange(this.state.error)

    return this.props.children(this.state.results)
  }
}

ReactLunr.propTypes = {
  documents: PropTypes.array,
  id: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.string,
  children: PropTypes.func,
  onErrorChange: PropTypes.func
}

export default ReactLunr
