/*
ln -svf /home/hector/dev/vue /usr/share/nginx/html
85203
*/

var app = new Vue({
  el: '#app',
  data: {
    startingTerm: '',
    startingResults: []
  },
  watch: {
    startingTerm: function () {
      this.startingResults = ''
      if (this.startingTerm.length >= 3) {
        this.searchTerm()
      }
    }
  },
  methods: {
    searchTerm: _.debounce(function () {
      var self = this
      self.startingResults = 'Searching...'
      console.log('self.startingTerm: ' + self.startingTerm)
      axios.get('http://127.0.0.1:3000/search/' + self.startingTerm)
        .then(function (response) {
          self.startingResults = response.data.data
        })
        .catch(function (error) {
          console.log(error)
          self.startingResults = 'Invalid Term'
        })
    }, 500)
  }
})
