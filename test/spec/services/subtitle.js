'use strict';

describe('Factory: subtitle', function () {

  // load the service's module
  beforeEach(module('vspApp'));

  // instantiate service
  var subtitle;
  beforeEach(inject(function (_subtitle_) {
    subtitle = _subtitle_;
  }));

  it('should do something', function () {
    expect(!!subtitle).toBe(true);
  });

  var srt = '1\n' +
    '00:00:00,336 --> 00:01:00,290\n' +
    'Zapraszam  na  tnttorrent.info  oraz  seansik.tv "Z�o�nicaa"\n' +
    '\n' +
    '2\n' +
    '00:02:33,595 --> 00:02:33,595\n' +
    'Ana, we� m�j samoch�d.\n' +
    'Some other text\n' +
    '\n' +
    '\n' +
    '\n' +
    '3\n' +
    '00:02:36,808 --> 00:02:38,808\n' +
    'Wzi��a� dyktafon?\n' +
    '\n';


  it('should decode srt lines', function(){


    var parsed = subtitle(srt);
    expect(parsed[0].startTime).toBe(300);
    expect(parsed[0].endTime).toBe(60200);
    expect(parsed[0].text).toBe('Zapraszam  na  tnttorrent.info  oraz  seansik.tv "Z�o�nicaa"');
  });
  it('should decode multi line srt file', function() {
    var parsed = subtitle(srt);
    expect(parsed[1].text).toBe('Ana, we� m�j samoch�d.\nSome other text');
  });

  it('should remove tailing space', function() {
    var parsed = subtitle(srt);
    expect(parsed[1].text).toBe('Ana, we� m�j samoch�d.\nSome other text');
  });

});
