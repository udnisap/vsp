'use strict';

describe('Service: sync', function () {

  // load the service's module
  beforeEach(module('vspApp'));

  // instantiate service
  var sync;
  beforeEach(inject(function (_sync_) {
    sync = _sync_;
  }));

  it('should do something', function () {
    expect(!!sync).toBe(true);
  });

});
