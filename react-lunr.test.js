import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'

import ReactLunr from './react-lunr'

afterEach(cleanup)

const documents = [
  { id: 'a', name: 'test a', body: 'test a was found' },
  { id: 'b', name: 'test b', body: 'test b was unknown' },
  { id: 'c', name: 'ignore c', body: 'ignore this result' }
]

const mapResults = results =>
  results.map(result => (
    <div key={result.ref}>
      <h1>{result.item.name}</h1>
      <p>{result.item.body}</p>
    </div>
  ))

test('should render only results matching initial filter', async () => {
  const { container, queryByText } = render(
    <ReactLunr
      id="id"
      documents={documents}
      fields={['name', 'body']}
      filter="test">
      {mapResults}
    </ReactLunr>
  )

  expect(queryByText('test a')).toBeInTheDocument()
  expect(queryByText('test b')).toBeInTheDocument()
  expect(queryByText('ignore c')).not.toBeInTheDocument()

  expect(container.firstChild).toMatchSnapshot()
})

test('should only index specified fields', async () => {
  const { queryByText } = render(
    <ReactLunr id="id" documents={documents} fields={['name']} filter="result">
      {mapResults}
    </ReactLunr>
  )

  expect(queryByText('test a')).not.toBeInTheDocument()
  expect(queryByText('ignore c')).not.toBeInTheDocument()
})

test('updating filter will rerender with new results', async () => {
  const { queryByText, rerender } = render(
    <ReactLunr
      id="id"
      documents={documents}
      fields={['name', 'body']}
      filter="test">
      {mapResults}
    </ReactLunr>
  )

  expect(queryByText('test a')).toBeInTheDocument()
  expect(queryByText('ignore c')).not.toBeInTheDocument()

  // change the filter to ignore, rerender
  rerender(
    <ReactLunr
      id="id"
      documents={documents}
      fields={['name', 'body']}
      filter="ignore">
      {mapResults}
    </ReactLunr>
  )

  expect(queryByText('test a')).not.toBeInTheDocument()
  expect(queryByText('ignore c')).toBeInTheDocument()
})
