// App.js

import React from 'react'
import Search from './Components/Search'

export default class App extends React.Component {
  render() {
    return (
      <Search/>// affiche le componnent
    )
  }
}

// global.BASE_URL = 'toto' permet d'apeller exemple l'url partout dans nimporte quel fichier exemple global.BASE_URL dans search