// Components/Search.js

import React from 'react'//permet d'importer la bibliothèque
import { StyleSheet, View, TextInput, Button, FlatList, text, ActivityIndicator } from 'react-native'//permet d'importer les parametre
// import films from '../Helpers/flimsData'
import FilmItem from './FilmItem'//importe le fichier pour la mise en forme 
import { getFilmsFromApiWithSearchedText } from '../API/TMDBapi'//permet d'importer le fichier avec les fonctions pour accéder à la base de donner




class Search extends React.Component {//class pour définr le composant et de quel dossier parent il est étendu
  constructor(props) {//permet d'initialiser les variables
    super(props)//(props)sont des variable que l'on peut rappeler dans les enfant mais doit être initialiser dans les parent elle ne peut être modifier ailleurs si on veut mettre un fonction ds une props pour l'appeler dans un enfant c'est possible mais il ne faut pas la déclencher ds le parent on ne les met que dans l'enfant ou l'on souhaite qu'elle se déclenche. 
    this.page = 0//variable pour initialiser la page au nombre 0
    this.totalPages = 0//variable pour initialiser le total des pages au nombre 0
    this.searcehedText = ""//permet d'initialiser la variable avec une entrée texte vide

    this.state = {//variable qui ne peut être appeler que dans le fichier ou il est mis

      films: [],//initialise un tableau film vide
      isloading: false//initialise une variable en bolleén(variable qui peut posseder plusieurs états) en false
      
    }

  }

  _loadFilms() {//fonction pour charger les films

    if (this.searcehedText.length > 0) {//si la longueur de l'entré est strictement supérieur à 0
      this.setState({ isloading: true })//setstate(attention fonction asynchrone déclenche tout en même temps) permet de modifier l'etat du state en occurrence passé la variable bolléene isloading en true
      getFilmsFromApiWithSearchedText(this.searcehedText, this.page + 1).then(data => {//appel la fonction pour rechercher les film dans l'api avec en parametre l'entrée dans la page de recherche alors les pages s'incrémente pour créer un scroll infin en fonction des résultat, then=alors(permet ainsi de ne rappeler le render des que l'on tape une lettre=rechargement"peut safficher avec un console.log("render") seulement après voir suite =>
        this.page = data.page //nous remplissons la variable avec les donnée fourni par l'api pour la page
        this.totalPages = data.total_pages//nous remplissons la variable avec les donnée fourni par l'api pour le total des pages
        this.setState({//modification des variable initialiser
          films: [...this.state.films, ...data.results],//permet de créer une copie du tableau de film déja récupéré et une copie pour récupérer les nouveaux film et de le concatener le tous mis ds un tableau 
          isloading: false//repasser le bolléen en faux
        })
      }
      )
    }
  }
  _displayLoading() {//permet d'afficher icone de chargement fonction
    if (this.state.isloading) {//sile bolléen est à false
      return (<View style={styles.loading_container}>
        {/* //envoyer l'affichage du chargement */}
        <ActivityIndicator size='large' />
      </View>)
    }
  }

  _searchFilms() {// fonction pour rechercher les films
    this.page = 0 //variable page remis à 0
    this.totalPages = 0//variable total page remis à 0
    this.setState({ films: [] }, ()=>{//modifier l'état avec un paramètre   en remettant le tableau vide puis un second paramètre pour déclencher la deuxième fonction seulement après que les variable soit réinitialiser et ainsi avoir le nombre de page déclencher après l'action et non pas avant particularité du setstate qui est asynchrone
    console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
    //exemple pour analyser ds le terminal si les paramètres fonctionne comme désiré
    this._loadFilms()//alors seulement après réinitialisation appel de la fonction load film qui est au dessus pour prendre les films rechercher dans l'api
  })}

  _searchTextInputChanged(text) {//fonction entre de recherche change avec parametre texte
    this.searcehedText = text// appel la propriété props est = à text
  }

  render() {// permet de rendre un element graphique



    return (// retourne l'élément graphique

      <View style={styles.main_container}>
        {/* //pour le css nom definit ave un contenaire */}
        <TextInput
          onSubmitEditing={() => this._searchFilms()} onChangeText={(text) =>//props qui permet qu'a chaque soumission entrer la fonction se déclenche puis que la propriéte change text prenne en compte l'entré
            this._searchTextInputChanged(text)} style=
            {styles.textinput} placeholder='Titre du film' />
            {/* //déclenché la fonction recherche avec le paramétre du texte, syle css, renseignement indicatif */}
        <Button title="Rechercher" onPress={() => this._searchFilms()} />
        {/* //le button une fois presser declenche la fonction de recherche */}

    <FlatList
        //interface permettant de pendre en charge plusieurs tipes de liste avec leurs fonctions
          data={this.state.films}
          // appel les donnéee contenu dans l'objet film
          keyExtractor={(item) => item.id.toString()}//enfontction de la clef ici l'item en parametre appel chaque id d'item  avec une fonction renvoyant sa valeur étonanant mais tostring peut être emploté comme ceci avec un objet
          onEndReachedThreshold={0.5}//propriété permettant d'arréter la liste à la moitié
          onEndReached={() => {
            if (this.page < this.totalPages) {//si page inferieur à total page permet d'afficher en continue la liste(onEndReached= defini la fin de la liste) tous les résultat de toute les pages en scroll infini en appelant la fonctioons cidessous
              this._loadFilms()
            }
          }
          }
          renderItem={({ item }) => <FilmItem film={item} />}//props pour renvoyer les infos dans la liste par item dont nous avons défini les condition juste avant
        />
        {this._displayLoading()}
        {/* //appel la fonction qui effectue le chargement en dernier */}

      </View>

    )
  }
}

const styles = StyleSheet.create({//styles css externaliser
  main_container: {
    flex: 1,
    marginTop: 70,
    
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
  },


  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search