'use strict';

/**
 * @ngdoc service
 * @name vspApp.flowplayer
 * @description
 * # flowplayer
 * Factory in the vspApp.
 */
angular.module('vspApp')
  .factory('flowplayer', function () {
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
    var player;
    return function(playerID){
      player = flowplayer(playerID, "swf/flowplayer-3.2.15.swf", defaults);
      return player;
    };
  });
