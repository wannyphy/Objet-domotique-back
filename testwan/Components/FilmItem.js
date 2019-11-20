// Components/FilmItem.js

import React from 'react'//importe la bibliothéque
import { StyleSheet, View, Text, Image } from 'react-native'//permet d'importer les parametre
import {getImageFromApi} from '../API/TMDBapi'//importe le fichier api pour les image avec sa fonction

class FilmItem extends React.Component {//class pour définr le composant et de quel parent il est étendu et ainsi peut être applé dans search pour afficher les données mise en forme
  render() {
    const film =  this.props.film//permet d'appeler les doner du film avec la propiété parents de search qui récupére les données et de le placer dans une variable
    return (
      <View style={styles.main_container}>
        {/* // mise en forme d'affichage */}
        <Image
          style={styles.image}//img
          source={{ uri: getImageFromApi(film.poster_path)}}//permet de prendre l'image dans l'api
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{film.title}</Text>
            {/* //permet de prendre le titre et ainsi de suite dans l'api */}
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                                                  {/* //limite le nombre de ligne affiche */}
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,//prend tou l'écran
    flexWrap: 'wrap',//renvoi à la ligne si trop long
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7//prend 1/7 de l'écran
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})

export default FilmItem