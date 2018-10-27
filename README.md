# react-search-lunr

A Lunr powered client side search react component.

**disclaimer**: This is still a bit of a work in progress. It has some limitations, so use at your discretion

[![Build 
Status](https://semaphoreci.com/api/v1/twostoryrobot/react-search-lunr/branches/master/shields_badge.svg)](https://semaphoreci.com/twostoryrobot/react-search-lunr) [![npm version](https://img.shields.io/npm/v/react-search-lunr.svg)](https://www.npmjs.com/package/react-search-lunr)

## Installation and Usage

    npm install react-search-lunr

Import `ReactSearchLunr` where you would like to use it.

```js
import ReactSearchLunr from 'react-search-lunr'
```

Supply some `documents`, specify the `id` (`ref` in Lunr), some `fields`, and a
`filter` to search by. Then just supply a `children` render function which will
receive `results`.

```jsx
<ReactSearchLunr
  id="id"
  fields={['name', 'body']}
  documents={[
    { name: 'aldrin', body: 'followed neil armstrong to the moon' },
    { name: 'armstrong', body: 'first to land on the moon' }
  ]}>
  {results =>
    result.map(result => (
      <div key={result.ref}>
        <h1>{result.item.name}</h1>
        <p>{result.item.body}</p>
      </div>
    ))
  }
</ReactSearchLunr>
```

## Errors

`ReactSearchLunr` does not catch errors that Lunr throws (e.g. `QueryParseError`), so
you should wrap `ReactSearchLunr` in an [error
boundary](https://reactjs.org/docs/error-boundaries.html) component. This is
particularly helpful if you are piping user input into the `filter` prop.

## Todo

This isn't quite finished. Some of the planned changes:

- passing a compiled Lunr index
- allow updating of `documents` after component construction
- probably some performance tweaks
