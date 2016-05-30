app.controller('PetController', ['$scope', '$http', function($scope, $http) {
    console.log("PetController running");

    //API is prepared
    var key = 'db49de40649540fa0cb21e1b5f3977a9';
    var baseURL = 'http://api.petfinder.com/';

//Variables for the dropdown menu
    $scope.pets = [{
        id: 1,
        label: 'Dogs',
        value: 'dog'
    }, {
        id: 2,
        label: 'Cats',
        value: 'cat'
    }, {
      id: 3,
      label: 'Pigs',
      value: 'pig'
    }, {
      id: 4,
      label: 'Small and Furry',
      value: 'smallfurry'
    }, {
      id: 5,
      label: 'Reptile',
      value: 'reptile'
    }, {
      id: 6,
      label: 'Bird',
      value: 'bird'
    }
  ];
    $scope.selected = '';
    $scope.favCount = 0;
    $scope.favorites = [];
    $scope.animal = {};
    $scope.animalName = '';
    $scope.favAnimal = {};
    $scope.favArray = [];
    getFav();

    $scope.getRandomPet = function(pet) {
        console.log(pet);
        console.log(pet.label);
        var query = 'pet.getRandom';
        query += '?key=' + key;
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
                $scope.getBreeds();
            }
        );
    };

    $scope.getBreeds = function() {
        var query = 'breed.list';
        query += '?key=' + key;
        query += '&animal=' + $scope.breed.toLowerCase();
        query += '&format=json';

        var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

        console.log(request);

        $http.jsonp(request).then(
            function(response) {
                console.log('breeds: ', response.data);
                $scope.breeds = response.data.petfinder.breeds.breed;
            }
        );
    };

    $scope.addFav = function() {
        for (var i = 0; i < $scope.favorites.length; i++) {
            if ($scope.animal.id.$t == $scope.favorites[i].id.$t) {
                return;
            }
        }
        $scope.favCount++;
        $scope.favorites.push($scope.animal);
        console.log($scope.favorites);
        $scope.favAnimal.id = $scope.animal.id.$t;
        $scope.favAnimal.image = $scope.animal.media.photos.photo[3].$t;
        $scope.favAnimal.name = $scope.animal.name.$t;
        $scope.favAnimal.description = $scope.animal.description.$t;
        $http.post('/favorites', $scope.favAnimal)
        .then(function (){
          console.log("Successfully posted");
        });
    };
    function getFav () {
      $http.get('/favorites/db')
        .then(function (response) {
          //response.data.forEach(function (pet) {
            //$scope.favArray.push(pet);
          //});

          $scope.favArray = response.data;
          console.log('GET /favorites ', response.data);
          $scope.favCount = $scope.favArray.length;

        });
    }
}]);
