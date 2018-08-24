# react-lunr

A Lunr powered client side search react component.

**disclaimer**: This is still a bit of a work in progress. It has some limitations, so use at your discretion

## Installation and Usage

    npm install react-lunr

Import `ReactLunr` where you would like to use it.


```js
import ReactLunr from 'react-lunr'
```

Supply some `documents`, specify the `id` (`ref` in Lunr), some `fields`, and a 
`filter` to search by. Then just supply a `children` render function which will 
receive `results`.


```jsx
<ReactLunr
  id="id"
  fields=["name", "body"]
  documents=[
    {name: 'aldrin', body:'followed neil armstrong to the moon'},
    {name: 'armstrong', body: 'first to land on the moon'}
  ]>
  {results => result.map(result => (
    <h1>{result.item.name}</h1>
    <p>{result.item.body}</p>
  ))}
</ReactLunr>
```

## Errors

`ReactLunr` does not catch errors that Lunr throws (e.g. `QueryParseError`), so 
you should wrap `ReactLunr` in an [error 
boundary](https://reactjs.org/docs/error-boundaries.html) component. This is 
particularly helpful if you are piping user input into the `filter` prop.

## Todo

This isn't quite finished. Some of the planned changes:

* passing a compiled Lunr index
* allow updating of `documents` after component construction
* probably some performance tweaks

