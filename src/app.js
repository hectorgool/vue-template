/*
ln -svf /home/hector/dev/vue /usr/share/nginx/html
85203
*/

var app = new Vue({
  el: '#app',
  data: {
    startingTerm: '',
    startingResult: ''
  },
  watch: {
    startingTerm: function () {
      this.startingResult = ''
      if (this.startingTerm.length === 5) {
        this.searchTerm()
      }
    }
  },
  methods: {
    searchTerm: _.debounce(function () {
      var self = this
      self.startingResult = 'Searching...'
      axios.get('http://ziptasticapi.com/' + self.startingTerm)
        .then(function (response) {
          self.startingResult = response.data.city + ', ' + response.data.state
        })
        .catch(function (error) {
          console.log(error)
          self.startingResult = 'Invalid Zipcode'
        })
    }, 500)
  }
})
