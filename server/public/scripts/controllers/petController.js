app.controller('PetController', ['$scope', '$http', function($scope, $http) {
    console.log("PetController running");

    //API is prepared
    var key = 'db49de40649540fa0cb21e1b5f3977a9';
    var baseURL = 'http://api.petfinder.com/';

//Variables for the dropdown menu
    $scope.pets = [{
        id: 1,
        label: 'Birds',
        value: 'bird'
    }, {
        id: 2,
        label: 'Cats',
        value: 'cat'
    }, {
      id: 3,
      label: 'Dogs',
      value: 'dog'
    }, {
      id: 4,
      label: 'Pigs',
      value: 'pig'
    }, {
      id: 5,
      label: 'Reptile',
      value: 'reptile'
    }, {
      id: 6,
      label: 'Small and Furry',
      value: 'smallfurry'
    }
  ];

  //empty variables are initialized
    $scope.selected = '';
    $scope.favCount = 0;
    $scope.favorites = [];
    $scope.animal = {};
    $scope.animalName = '';
    $scope.favAnimal = {};
    getFav();

//Gets a random pet using the API.
    $scope.getRandomPet = function(pet) {
        console.log(pet);
        console.log(pet.label);
        var query = 'pet.getRandom';
        query += '?key=' + key;

        //Uses the currently selected pet from the dropdown
        query += '&animal=' + pet.value;
        query += '&output=basic';
        query += '&format=json';
        var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
        console.log(request);

        $http.jsonp(request).then(
            function(response) {
                console.log(response.data);
                $scope.animal = response.data.petfinder.pet;
                $scope.animalName = response.data.petfinder.pet.name.$t;
                $scope.breed = $scope.animal.animal.$t;
            }
        );
    };

//Adds a favorited pet when the favorite? button is clicked.
    $scope.addFav = function() {

      //Checks to make sure that the current pet isn't already a favorite, either in the database or from your previous click.
        for (var i = 0; i < $scope.favorites.length; i++) {
            if ($scope.animal.id.$t == $scope.favorites[i].id.$t || $scope.animal.id.$t == $scope.favorites[i].id) {
              alert("You have already favorited this animal!");
                return;
            }
        }

        //favCount is incremented and then the favorited animal is added to an array (for checking purposes above).
        $scope.favCount++;
        $scope.favorites.push($scope.animal);
        console.log($scope.favorites);

        //favAnimal is prepared to be sent to the server, only filled with relevant information.
        $scope.favAnimal.id = $scope.animal.id.$t;
        $scope.favAnimal.image = $scope.animal.media.photos.photo[3].$t;
        $scope.favAnimal.name = $scope.animal.name.$t;
        $scope.favAnimal.description = $scope.animal.description.$t;
        $scope.favAnimal.animal = $scope.animal.animal.$t;
        console.log($scope.favAnimal);
        $http.post('/favorites', $scope.favAnimal)
        .then(function (){
          console.log("Successfully posted");
        });
    };

    //All favorites are fetched from the database.
    function getFav () {
      $http.get('/favorites/db')
        .then(function (response) {
          $scope.favorites = response.data;
          console.log('GET /favorites ', response.data);
          $scope.favCount = $scope.favorites.length;

        });
    }

    //Na na na na na na na na katamari damacy
    $scope.playMusic = function () {
      var katamari = new Audio('../audio/savannah.mp3');
      katamari.play();
    };
}]);
