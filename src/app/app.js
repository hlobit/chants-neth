import angular from 'angular';
import plyr from 'plyr';
import 'materialize-css';

import '../style/app.scss';

let app = ['$timeout', ($timeout) => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app',
    link: (scope, elm, attrs) => {
      $timeout(() => {
        plyr.setup({
          controls: ["restart", "play", "current-time", "duration"],
          tooltips: { "controls": false, "seek": false },
          volume: "10"
        });
      });
    }
  }
}];

let song = () => {
  return {
    template: require('./song.html'),
    restrict: 'A',
    controller: ['$scope', ($scope) => {
      $scope.song.scoreUrl = 'https://docs.google.com/viewerng/viewer?url=http://noemi-et-hubert.eu/scores/' + $scope.song.id + '.pdf';
      $scope.song.musicUrl = 'music/' + $scope.song.id + '.mp3';
      $scope.song.musicDownloadUrl = 'music/' + $scope.song.id + '.m4a';
    }]
  }
}

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/hlobit/neth';
    this.songs = [
      {
        type: 'Chant d\'entrée',
        id: 'frappez_dans_vos_mains',
        title: 'Frappez dans vos mains (Pat Berning)',
      },
      {
        type: 'Gloria',
        id: 'gloria_slzm',
        title: 'Messe des saints Louis et Zélie Matin',
      },
      {
        type: 'Alleluia',
        id: 'alleluia_rio',
        title: 'JMJ de Rio (JMJ 2013)',
      },
      {
        type: '«Litanie» des saints',
        id: 'priere_a_tous_les_saints',
        title: 'Prière à tous les saints',
      },
      {
        type: 'Chant à l\'Esprit',
        id: 'viens_esprit_de_dieu',
        title: 'Viens Esprit de Dieu (Renouveau Polonais)',
      },
      {
        type: 'Action de grâce',
        id: 'les_noces_eternelles',
        title: 'Les noces éternelles',
      },
      {
        type: 'Prière universelle',
        id: 'entends_notre_voix',
        title: 'Entends notre voix',
      },
      {
        type: 'Offertoire',
        id: 'je_veux_n_etre_qu_a_toi',
        title: 'Je veux n\'être qu\'à toi (Exo)',
      },
      {
        type: 'Sanctus',
        id: 'sanctus_slzm',
        title: 'Messe des saints Louis et Zélie Matin',
      },
      {
        type: 'Anamnèse',
        id: 'anamnese_slzm',
        title: 'Messe des saints Louis et Zélie Matin',
      },
      {
        type: 'Agnus Dei',
        id: 'agnus_slzm',
        title: 'Messe des saints Louis et Zélie Matin',
      },
      {
        type: 'Chant pendant la communion',
        id: 'mon_ancre_et_ma_voile',
        title: 'Mon ancre et ma voile (David Durham)',
      },
      {
        type: 'Chant après la communion',
        id: 'au_monde',
        title: 'Au monde (Etincelo)',
      },
      {
        type: 'Chant à Marie',
        id: 'bienheureuse_marie',
        title: 'Bienheureuse Marie (Etincelo)',
      },
    ];
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .directive('song', song)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
