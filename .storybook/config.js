import { configure } from '@storybook/react'

function loadStories() {
  require('../react-search-lunr.story.js')
}

configure(loadStories, module)
