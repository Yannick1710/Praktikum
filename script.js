// Initialize Firebase

var config = {
    apiKey: "AIzaSyDn0Yyl6uKpwZ7Zgpte9ErzdZAd3xwZCO0",
    authDomain: "hero-ced8d.firebaseapp.com",
    databaseURL: "https://hero-ced8d.firebaseio.com",
    projectId: "hero-ced8d",
    storageBucket: "hero-ced8d.appspot.com",
    messagingSenderId: "427555148936"
};
var firebaseApp = firebase.initializeApp(config);
var db = firebaseApp.database();


var vm = new Vue({
  el: '#app',
  firebase: {
    // simple syntax, bind as an array by default
    heroes: {
        source: db.ref('heroes'),
        readyCallback: function () {
        }

    }
  },
  data: {
    showModal: false
  },

  methods: {
    addHero () {
      this.$firebaseRefs.heroes.push({
        name: this.name,
        age: this.age,
        strength: this.strength,
        film: this.film

                                      })

              },
      deleteHero: function (hero) {
        console.log(hero);
        this.$firebaseRefs.heroes.child(hero['.key']).remove();
      },
  }

});

Vue.component('modal', {
  template: '#modal-template',
  props: ['hero'],
  heroes: {
      source: db.ref('heroes'),
      readyCallback: function () {
      }
  },

  methods: {
    addHero () {
      this.$firebaseRefs.heroes.push({
        name: this.hero.name,
        age: this.hero.age,
        strength: this.hero.strength,
        film: this.hero.film

      })
    },
    updateHeroText: function (hero, newText) {
        this.$firebaseRefs.child(hero['.key']).child('text').set(newText)
    },
  }
})
