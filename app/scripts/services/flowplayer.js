'use strict';

/**
 * @ngdoc service
 * @name vspApp.flowplayer
 * @description
 * # flowplayer
 * Factory in the vspApp.
 */
angular.module('vspApp')
  .factory('flowplayer', function (localStorageService, $log) {
    var defaults = {
      clip:  {
        autoPlay: false,
        autoBuffering: true,
        scaling : "fit",
        provider: 'stream',
        url: "video.flv"
      },
      plugins: {
        content: {
          bottom: 25,
          height:90,
          backgroundColor: 'transparent',
          backgroundGradient: 'none',
          border: 0,
          textDecoration: 'outline',
          style: {
            body: {
              fontSize: 20,
              fontFamily: 'Arial',
              textAlign: 'center',
              color: '#ffffff'
            }
          },
          url: "swf/flowplayer.content-3.2.8.swf"
        },
        stream: {
          url: "swf/flowplayer.pseudostreaming-3.2.11.swf"
          //                queryString : escape('&start=${start}')
        }
      },
      source : ""
    };
    $log.debug("Default Configurations", defaults);

    var storedOptions = localStorageService.get('player');
    $log.debug("Stored Configurations", storedOptions);

    var options = _.extend({}, defaults, storedOptions);
    var api = {};
    var player;

    return function(playerID){
      function initPlayer(ops) {
        options = _.extend(options, ops);
        localStorageService.set('player',options);
        $log.debug("Player initialized with ", options);
        player =  flowplayer(playerID, "/vsp/swf/flowplayer-3.2.15.swf", options)
      }

      api.updateVideo = function(source, url, suffix){
        initPlayer({
          clip : {
            url : url
          },
          plugins: {
            stream : {
              queryString: escape('&'+suffix+'=${start}')
            }
          }
        });
      };

      api.updateSubtitles = function(file, text){

      };


      initPlayer();
      return api;
    };
  });
