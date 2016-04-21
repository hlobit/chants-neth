import angular from 'angular';

import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/materialize-css/dist/js/materialize.min.js';
import '../style/app.css';

let app = ($timeout) => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app',
    link: (scope, elm, attrs) => {
      $timeout(() => {
        plyr.setup({
          controls: ["restart", "play", "current-time", "duration"],
          tooltips: { controls: false, seek: false }
        });
      });
    }
  }
};

let song = () => {
  return {
    template: require('./song.html'),
    restrict: 'A',
    controller: ($scope) => {
      $scope.song.scoreUrl = 'https://docs.google.com/viewerng/viewer?url=http://noemi-et-hubert.eu/scores/' + $scope.song.id + '.pdf';
      $scope.song.musicUrl = 'music/' + $scope.song.id + '.mp3';
      $scope.song.musicDownloadUrl = 'music/' + $scope.song.id + '.m4a';
    }
  }
}

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/hlobit/neth';
    this.songs = [
      {
        type: 'Chant d\'entrée',
        id: 'frappez_dans_vos_mains',
        title: 'Frappez dans vos mains',
      },
      {
        type: 'Signature des registres',
        id: 'the_lord_s_my_shepherd',
        title: 'The Lord\'s My Shepherd',
      }
    ];
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .directive('song', song)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
