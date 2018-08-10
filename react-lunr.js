import React from 'react'
import PropTypes from 'prop-types'

class ReactLunr extends React.Component {
  render() {
    return (
      <div>
        {this.props.documents.map((doc, i) => (
          <div key={i}>
            <h2>{doc.name}</h2>
            <p>{doc.body}</p>
          </div>
        ))}
      </div>
    )
  }
}

ReactLunr.propTypes = {
  documents: PropTypes.array
}

export default ReactLunr
