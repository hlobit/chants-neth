import angular from 'angular';
import plyr from 'plyr';
import 'materialize-css';

import '../style/app.scss';

let app = ['$timeout', ($timeout) => {
  return {
    template: require('./app.html'),
    controller: ['$scope', '$q', '$http', ($scope, $q, $http) => {
      $scope.url = 'https://github.com/hlobit/neth';
      let defer = $q.defer();
      $http
        .get('api/playlists/1', { cache: 'true'})
        .then(function(data) {
            defer.resolve(data);
        });

      defer.promise.then(function(data){
        let elements = data.elements;
        $scope.songs = [];
        for (let i = 0; i < elements.length; i++) {
          let element = elements[i];
          let title = element.song.title;
          if(element.song.artist) {
            title += ' (' + element.song.artist + ')';
          }
          let media = {};
          for (let j = 0; j < element.song.versions[0].media.length; j++) {
            media[element.song.versions[0].media[j].role] = element.song.versions[0].media[j].file.path;
          }
          $scope.songs.push({
            type: element.name,
            title: title,
            mp3: media['mp3'],
            m4a: media['m4a'],
            score: media['main']
          });
        }
      });
    }],
    link: (scope, elm, attrs) => {
      $timeout(() => {
        plyr.setup({
          controls: ["play", "progress", "current-time", "duration"],
          tooltips: { "controls": false, "seek": false },
          volume: "10"
        });
      }, 1000);
    }
  }
}];

let song = () => {
  return {
    template: require('./song.html'),
    restrict: 'A',
    controller: ['$scope', ($scope) => {
      $scope.song.scoreUrl = 'https://docs.google.com/viewerng/viewer?url=http://chants.noemi-et-hubert.eu/api' + $scope.song.score;
      $scope.song.musicUrl = 'api' + $scope.song.mp3;
      $scope.song.musicDownloadUrl = 'api' + $scope.song.m4a;
    }]
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .directive('song', song)
  .filter('trusted', ['$sce', function ($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  }]);

export default MODULE_NAME;
