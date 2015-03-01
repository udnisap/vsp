'use strict';

/**
 * @ngdoc service
 * @name vspApp.flowplayer
 * @description
 * # flowplayer
 * Factory in the vspApp.
 */
angular.module('vspApp')
  .factory('flowplayer', function (localStorageService, $log, subtitle) {
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
    var player, subArray;

    return function(playerID){
      function initPlayer(ops) {
        options = _.extend(options, ops);
        localStorageService.set('player',options);
        $log.debug("Player initialized with ", options);
        player =  flowplayer(playerID, "/swf/flowplayer-3.2.15.swf", options)
      }

      api.updateVideo = function(source, url, suffix){
        var options = {
          clip: {
            url: url
          }
        };
        if (suffix)
          options.plugins = {
            stream: {
              queryString: escape('&' + suffix + '=${start}')
            }
          };
        initPlayer(options);
      };

      api.updateSubtitle = function(sub){
        subArray = subtitle(sub.text);
        var cuepoints = _.flatten(_.map(subArray, function(sub){
          return [sub.startTime, sub.endTime];
        }));

        var startTimeIndex = _.object(_.map(subArray, function(sub){
          return [sub.startTime, sub.text];
        }));

        var endTimeIndex = _.object(_.map(subArray, function(sub){
          return [sub.endTime, sub.text];
        }));

        var content = player.getPlugin("content");
        console.log(content);
        if (content){
          player.onCuepoint(cuepoints, function(clip, time) {
            console.log(time);
            var subtitle = startTimeIndex[time];
            if (subtitle){
              content.setHtml(subtitle);
            }else if(endTimeIndex[time]){
              content.setHtml("");
            }
          });
        }
      };


      initPlayer();
      return api;
    };
  });
