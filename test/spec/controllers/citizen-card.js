'use strict';
/* jshint camelcase: false */

describe('Controller: CitizenCardCtrl', function () {

  // load the controller's module
  beforeEach(module('citizendeskFrontendApp'));

  var scope,
      $httpBackend,
      api,
      PageBroker = {},
      $controller,
      $rootScope,
      $location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_, _api_, _$location_) {
    $httpBackend = _$httpBackend_;
    api = _api_;
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $location = _$location_;
    spyOn($location, 'url');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('creates missing local aliases instead of asking the core', function() {
    scope = $rootScope.$new();
    $controller('CitizenCardCtrl', {
      $scope: scope,
      $routeParams: {
        id: 'abcdef',
        authority: 'citizen_desk'
      },
      PageBroker: PageBroker
    });
    api.citizen_aliases.def.query
      .resolve(mocks.citizen_aliases.empty_query_result);

    spyOn(api.citizen_aliases, 'save').and.callThrough();
    spyOn(api.users, 'getById').and.callThrough();

    scope.$digest();
    expect(api.users.getById).toHaveBeenCalled();

    api.citizen_aliases.reset.query();
    spyOn(api.citizen_aliases, 'query').and.callThrough();

    api.users.def.getById.resolve(angular.copy(mocks.auth.success));
    scope.$digest();
    expect(api.citizen_aliases.save).toHaveBeenCalled();
    api.citizen_aliases.def.save.resolve();
    scope.$digest();
    expect(api.citizen_aliases.query).toHaveBeenCalled();
    api.citizen_aliases.def.query
      .resolve(mocks.citizen_aliases.query_result);
    expect(scope.alias).not.toBeDefined();
    scope.$digest();
    expect(scope.alias).toBeDefined();
  });
  describe('with a not local alias', function() {
    beforeEach(function() {

      spyOn(api.citizen_aliases, 'query').and.callThrough();
      scope = $rootScope.$new();
      $controller('CitizenCardCtrl', {
        $scope: scope,
        $routeParams: {
          id: 'BBCBreaking',
          authority: 'twitter'
        },
        PageBroker: PageBroker,
        $location: $location
      });
    });
    describe('when an alias is available', function() {
      beforeEach(inject(function() {
        api.citizen_aliases.def.query
          .resolve(mocks.citizen_aliases.query_result);
        scope.$digest();
      }));
      it('gets items in the response', function() {
        expect(scope.response._items).toBeDefined();
      });
      it('gets links in the response', function() {
        expect(scope.response._links).toBeDefined();
      });
      it('gets meta in the response', function() {
        expect(scope.response._meta).toBeDefined();
      });
      it('adds the alias to the scope', function() {
        expect(scope.alias.locations).toEqual(['London, UK']);
      });
      it('brings the user to the lists editing page', function(){
        PageBroker.load = jasmine.createSpy('page broker load');
        scope.editTags();
        expect(PageBroker.load).toHaveBeenCalled();
        expect(PageBroker.load.calls.mostRecent().args[0])
          .toBe('/edit-user-lists');
        expect(PageBroker.load.calls.mostRecent().args[1])
          .toEqual(scope.alias);
      });
      it('can lead the user to the association page', function() {
        scope.associate();
        expect($location.url)
          .toHaveBeenCalledWith('/list-identity-records/53b3daf69c61674623000056');
      });
    });

    describe('when an alias is not available', function() {
      beforeEach(function() {
        api.citizen_aliases.def.query
          .resolve(mocks.citizen_aliases.empty_query_result);
        $httpBackend
          .expectPOST(globals.root + 'proxy/fetch-citizen-alias/', {
            name: 'BBCBreaking',
            authority: 'twitter'
          })
          .respond(200);
        scope.$digest(); // resolve the first promise
        api.citizen_aliases.reset.query(); // prepare a fresh promise
        $httpBackend.flush(); // respond to the HTTP request
      });
      it('adds the alias to the scope', function() {
        api.citizen_aliases.def.query
          .resolve(mocks.citizen_aliases.query_result);
        scope.$digest();
        expect(scope.alias.locations).toEqual(['London, UK']);
      });
      it('throws an error if we have multiple aliases', function() {
        var response = angular.copy(mocks.citizen_aliases.query_result);
        response._items.push(angular.copy(response._items[0]));
        expect(function() {
          scope.aliasesHandler(response);
        }).toThrow();
      });
    });
    it('gets reports', function() {
      api.reports.def.query.resolve({
        _items: [{
          feed_type: 'tweet',
          original: {
            entities: {
              user_mentions: [],
              hashtags: [],
              urls: []
            }
          }
        }, {
          feed_type: 'other'
        }]
      });
      scope.$digest();
      expect(scope.reports.length).toBe(2);
    });
  });
});
