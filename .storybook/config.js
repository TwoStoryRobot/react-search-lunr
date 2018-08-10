import { configure } from '@storybook/react'

function loadStories() {
  require('../react-lunr.story.js')
}

configure(loadStories, module)
