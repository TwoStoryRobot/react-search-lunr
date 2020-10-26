import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'

import ReactSearchLunr from './react-search-lunr'

afterEach(cleanup)

const documents = [
  { id: 1, name: 'test a', body: 'test a was found' },
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
    <ReactSearchLunr
      id="id"
      documents={documents}
      fields={['name', 'body']}
      filter="test">
      {mapResults}
    </ReactSearchLunr>
  )

  expect(queryByText('test a')).toBeInTheDocument()
  expect(queryByText('test b')).toBeInTheDocument()
  expect(queryByText('ignore c')).not.toBeInTheDocument()

  expect(container.firstChild).toMatchSnapshot()
})

test('should only index specified fields', async () => {
  const { queryByText } = render(
    <ReactSearchLunr
      id="id"
      documents={documents}
      fields={['name']}
      filter="result">
      {mapResults}
    </ReactSearchLunr>
  )

  expect(queryByText('test a')).not.toBeInTheDocument()
  expect(queryByText('ignore c')).not.toBeInTheDocument()
})

test('updating filter will rerender with new results', async () => {
  const { queryByText, rerender } = render(
    <ReactSearchLunr
      id="id"
      documents={documents}
      fields={['name', 'body']}
      filter="test">
      {mapResults}
    </ReactSearchLunr>
  )

  expect(queryByText('test a')).toBeInTheDocument()
  expect(queryByText('ignore c')).not.toBeInTheDocument()

  // change the filter to ignore, rerender
  rerender(
    <ReactSearchLunr
      id="id"
      documents={documents}
      fields={['name', 'body']}
      filter="ignore">
      {mapResults}
    </ReactSearchLunr>
  )

  expect(queryByText('test a')).not.toBeInTheDocument()
  expect(queryByText('ignore c')).toBeInTheDocument()
})

test('should render results using a selected field as ID', async () => {
  const { container, queryByText } = render(
    <ReactSearchLunr
      id="name"
      documents={documents}
      fields={['body']}
      filter="test">
      {mapResults}
    </ReactSearchLunr>
  )

  expect(queryByText('test a')).toBeInTheDocument()
  expect(queryByText('test b')).toBeInTheDocument()
  expect(queryByText('ignore c')).not.toBeInTheDocument()

  expect(container.firstChild).toMatchSnapshot()
})
