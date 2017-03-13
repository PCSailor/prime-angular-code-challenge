app.controller('HeroListController', ['$http', function($http){
    console.log('Hero List Controller loaded');
      var self = this; // NOTE: self here = hlc in index.html
      var heroList = { list: [] };
      // var heroList = [];
      self.newhero = {};  // NOTE: object connected to html form // user entry fields
      self.heroList = heroList // NOTE: replaced by array AND this is the required code to bring in the full array

      getHero();
      function getHero() {
        $http({
          method: 'GET',
          url: '/heroes'
        }).then(function(response) {
          console.log('response.data from factory: ', response.data);
          self.herolist = response.data;  // NOTE: angJS adds alot with response alone so data pulls just result from server
        });
      }

      self.newHero = function() {
        console.log('client-post exit = ', self.newHero);
        $http ({
          method: 'POST',
          url: '/heroes',
          data: self.newHero
        }).then(function(response){
          getHero();
          self.newHero = {};
          console.log('response POST = ', response);
        });
      }

      self.deleteHero = function(heroToDelete){
        $http({
          method: 'DELETE',
          // url: '/heroes/delete/' + heroToDelete
          url: '/heroes' + heroToDelete
        }).then(function(response){
          console.log('heroToDelete = ', heroToDelete);
          getHero();
        });
      }
// NOTE: if it's tied to DOM, start with self.
}]);
