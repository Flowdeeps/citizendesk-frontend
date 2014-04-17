'use strict';

describe('Controller: ConfigureAutoreplyCtrl', function () {

  // load the controller's module
  beforeEach(module('citizenfrontApp'));

  var ConfigureAutoreplyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfigureAutoreplyCtrl = $controller('ConfigureAutoreplyCtrl', {
      $scope: scope,
      $sails: $sails
    });
  }));

  xit('should initialise the settings values', function () {
    expect(scope.enabled.value).toBe(true);
    expect(scope.text.value).toBe('thanks');
    expect(scope.timeout.value).toBe(5);
  });
});