'use strict';

describe('Service: flowplayer', function () {

  // load the service's module
  beforeEach(module('vspApp'));

  // instantiate service
  var flowplayer;
  beforeEach(inject(function (_flowplayer_) {
    flowplayer = _flowplayer_;
  }));

  it('should do something', function () {
    expect(!!flowplayer).toBe(true);
  });

});
