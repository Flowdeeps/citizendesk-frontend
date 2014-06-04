"use strict";angular.module("gettext").run(["gettextCatalog",function(a){a.setStrings("it_IT",{Autoreply:"Risposta automatica",Configure:"Configura","Twitter ingestion":"Ingestion da Twitter"})}]),angular.module("citizendeskFrontendApp",["ngRoute","ngResource","ngMessages","ngSanitize","gettext","eveApi","ui.bootstrap","luegg.directives","matchMedia","duScroll"]).constant("config",{server:{url:"https://cd2.sourcefabric.net/citizendesk-interface/"}}).config(["$routeProvider","$httpProvider","apiProvider",function(a,b,c){["steps","reports","users","citizen_aliases","coverages","twt_oauths","twt_streams","twt_filters","core_config","citizen_lists","report_statuses"].forEach(function(a){c.api(a,{type:"http",backend:{rel:a}})}),c.api("twt_searches",{type:"http",backend:{rel:"twt-searches"}}),b.interceptors.push("errorHttpInterceptor"),b.interceptors.push("AuthInterceptor"),b.interceptors.push("cacheBuster"),a.when("/new-report",{templateUrl:"views/new-report.html",controller:"NewReportCtrl"}).when("/verified-reports",{templateUrl:"views/verified-reports.html",controller:"VerifiedReportsCtrl"}).when("/report-sms/:id",{templateUrl:"views/report-sms.html",controller:"ReportSmsCtrl"}).when("/report-web_link/:id",{templateUrl:"views/report-web-link.html",controller:"ReportWebLinkCtrl"}).when("/report-tweet/:id",{templateUrl:"views/report-tweet.html",controller:"ReportTweetCtrl"}).when("/monitor/:id?",{templateUrl:"views/monitor.html",controller:"MonitorCtrl"}).when("/twitter-search/:id?",{templateUrl:"views/twitter-search.html",controller:"TwitterSearchCtrl"}).when("/citizen-card/:authority/:name",{templateUrl:"views/citizen-card.html",controller:"CitizenCardCtrl"}).when("/generic-report-list/:query",{templateUrl:"views/simple-report-list.html",controller:"GenericReportListCtrl"}).when("/assigned-to/:id/:name",{templateUrl:"views/simple-report-list.html",controller:"AssignedToCtrl"}).when("/select-media-to-publish/:type/:id",{templateUrl:"views/select-media-to-publish.html",controller:"SelectMediaToPublishCtrl"}).when("/list-from-the-web/",{templateUrl:"views/list-from-the-web.html",controller:"ListFromTheWebCtrl"}).when("/session/:session*",{templateUrl:"views/session.html",controller:"SessionCtrl"}).when("/mobile-queue/",{templateUrl:"views/mobile-queue.html",controller:"MobileQueueCtrl"}).when("/configure",{templateUrl:"views/configure.html",controller:"ConfigureCtrl"}).when("/configure-autoreply",{templateUrl:"views/configure-autoreply.html",controller:"ConfigureAutoreplyCtrl"}).when("/configure-steps",{templateUrl:"views/configure-steps.html",controller:"ConfigureStepsCtrl"}).when("/configure-status-presentation",{templateUrl:"views/configure-status-presentation.html",controller:"ConfigureStatusPresentationCtrl"}).when("/configure-coverages",{templateUrl:"views/configure-coverages.html",controller:"ConfigureCoveragesCtrl"}).when("/configure-twitter-ingestion",{templateUrl:"views/configure-twitter-ingestion.html",controller:"ConfigureTwitterIngestionCtrl"}).when("/configure-twitter-ingestion-filters",{templateUrl:"views/configure-twitter-ingestion-filters.html",controller:"ConfigureTwitterIngestionFiltersCtrl"}).when("/configure-twitter-ingestion-oauths",{templateUrl:"views/configure-twitter-ingestion-oauths.html",controller:"ConfigureTwitterIngestionOauthsCtrl"}).when("/configure-twitter-ingestion-streams",{templateUrl:"views/configure-twitter-ingestion-streams.html",controller:"ConfigureTwitterIngestionStreamsCtrl"}).when("/configure-lists",{templateUrl:"views/configure-lists.html",controller:"ConfigureListsCtrl"}).when("/configure-lists-specific",{templateUrl:"views/configure-lists-specific.html",controller:"ConfigureListsSpecificCtrl"}).when("/edit-user-lists",{templateUrl:"views/edit-user-lists.html",controller:"EditUserListsCtrl"}).when("/new-twitter-search",{templateUrl:"views/new-twitter-search.html",controller:"NewTwitterSearchCtrl"}).when("/web-queue",{templateUrl:"views/web-queue.html",controller:"WebQueueCtrl"}).when("/assigned-to-me",{templateUrl:"views/assigned-to-me.html",controller:"AssignedToMeCtrl"}).when("/assign/",{templateUrl:"views/assign.html",controller:"AssignCtrl"}).when("/assigned/",{templateUrl:"views/assigned.html",controller:"AssignedCtrl"}).when("/queues/",{templateUrl:"views/queues.html",controller:"QueuesCtrl"}).when("/my-monitor/",{templateUrl:"views/my-monitor.html",controller:"MyMonitorCtrl"}).when("/processed-queues",{templateUrl:"views/processed-queues.html",controller:"ProcessedQueuesCtrl"}).when("/ingest-from-location",{templateUrl:"views/ingest-from-location.html",controller:"IngestFromLocationCtrl"}).when("/error-no-monitors",{templateUrl:"views/error-no-monitors.html"}).when("/error-no-searches",{templateUrl:"views/error-no-searches.html"}).when("/help-tweet-queues",{templateUrl:"views/help-tweet-queues.html"}).otherwise({redirectTo:"/assigned-to-me"})}]).run(["gettextCatalog","Raven","initAuth",function(a,b,c){a.debug=!0,b.install(),c()}]),angular.module("citizendeskFrontendApp").controller("MainCtrl",function(){}),angular.module("citizendeskFrontendApp").controller("NewReportCtrl",["$scope",function(a){a.content="",a.submit=function(){}}]),angular.module("citizendeskFrontendApp").controller("QueuesCtrl",["$scope","TwitterSearches","Monitors","session",function(a,b,c,d){a.session=d,a.collapseSearches=!0,b.promise.then(function(b){a.searches=b}),c.promise.then(function(b){a.monitors=b})}]),angular.module("citizendeskFrontendApp").controller("VerifiedReportsCtrl",["$scope","api",function(a,b){b.reports.query({where:'{"verified":true}'}).then(function(b){a.reports=b._items})}]),angular.module("citizendeskFrontendApp").controller("ConfigureCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("citizendeskFrontendApp").controller("ConfigureTwitterIngestionCtrl",[function(){}]),angular.module("citizendeskFrontendApp").controller("ConfigureTwitterIngestionFiltersCtrl",["$scope","config","$resource","Raven",function(a,b,c,d){var e=c(b.server.url+"/twt_filters");a.alert="",a.disabled=!1,a.canAddFilter=!0,a.twtFilters=e.query(),a.addFilter=function(){a.twtFilters.push(new e({spec:{track:[],follow:[],locations:[],language:null}}))},a.addTrack=function(a){a.spec.track.push("")},a.saveFilter=function(b){a.disabled=!0,b.$save().$promise.then(function(){a.disabled=!1,a.alert=""},function(b){a.disabled=!1,a.status="warning",a.alert=d.parseSocketError(b)})}}]),angular.module("citizendeskFrontendApp").controller("ConfigureTwitterIngestionOauthsCtrl",["api","$scope","session",function(a,b,c){a.twt_oauths.query({where:JSON.stringify({user_id:c.identity._id})}).then(function(a){b.key=a._items.pop(),b.key||(b.noKey=!0)}),b.add=function(){b.key={user_id:c.identity._id,spec:{}},b.noKey=!1,b.editing=!0},b.edit=function(){b.copy=angular.copy(b.key),b.editing=!0,b.key.spec={}},b.cancelEdit=function(){b.editing=!1,b.key=b.copy},b.save=function(){b.disabled=!0,a.twt_oauths.save(b.key).then(function(){b.disabled=!1,b.editing=!1})}}]),angular.module("citizendeskFrontendApp").controller("ConfigureTwitterIngestionStreamsCtrl",["$scope","config","$http","Raven","resource",function(a,b,c,d,e){var f={filters:e(b.server.url+"/twt_filters/:id"),streams:e(b.server.url+"/twt_streams/:id")};a.disabled={},a.error={},a.restartDisabled={},a.restartError={},a.twtFilters=f.filters.query(),a.twtStreams=f.streams.query(),a.saveStream=function(b){a.disabled[b._id]=!0,b.$save().finally(function(){a.disabled[b._id]=!1})},a.restartDisabled={},a.restartError={},a.restart=function(e){var f=e._id,g=b.server.url+"/proxy";a.restartDisabled[f]=!0,c.get(g+"/stop-stream/"+f).success(function(){c.get(g+"/start-stream/"+f).success(function(){a.restartDisabled[f]=!1,a.restartError[f]=!1}).error(function(){d.raven.captureMessage("error starting stream"),a.restartDisabled[f]=!1,a.restartError[f]=!0})}).error(function(){d.raven.captureMessage("error stopping stream"),a.restartDisabled[f]=!1,a.restartError[f]=!0})}}]),angular.module("citizendeskFrontendApp").controller("ConfigureAutoreplyCtrl",["$scope","api",function(a,b){a.disabled=!0,b.core_config.query({where:'{"type":"sms"}'}).then(function(b){a.config=b._items.pop(),a.disabled=!1}),a.save=function(){a.disabled=!0,b.core_config.save(a.config).then(function(){a.disabled=!1})}}]),angular.module("citizendeskFrontendApp").service("Raven",["$location","session",function(a,b){var c=this;this.install=function(){Raven.config("http://b1901abf077d476ba253bce45dd5bf91@sentry.sourcefabric.org/8",{ignoreErrors:[],dataCallback:function(c){var d;return d=b.identity?b.identity.username:"username not available because of missing identity",c.tags={location:a.url(),username:d},c}}).install(),c.raven=Raven}}]),angular.module("citizendeskFrontendApp").controller("ConfigureStepsCtrl",["$scope","api","lodash",function(a,b,c){var d=c;b.steps.query().then(function(b){a.steps=b._items}),a.disabled=!1,a.add=function(){a.steps.push({description:""})},a.save=function(c){a.disabled=!0,b.steps.save(c).then(function(){a.disabled=!1}).catch(function(){a.disabled=!1})},a.remove=function(c){b.steps.remove(c).then(function(){d.remove(a.steps,c),a.disabled=!1}).catch(function(){a.disabled=!1})}}]),angular.module("citizendeskFrontendApp").controller("ReportSmsCtrl",["$scope","$routeParams","Raven","api","$location","Report","Coverages","$window","screenSize","superdeskDate",function(a,b,c,d,e,f,g,h,i,j){function k(){return d.reports.getById(l).then(function(b){a.report=b,f.addSteps(a.report),a.selectedCoverage=f.getSelectedCoverage(b,a.coverages),b.on_behalf_id&&d.users.getById(b.on_behalf_id).then(function(b){a.onBehalf=b})})}var l=b.id;k().then(function(){a.$watch("report.coverages",function(){a.isPublished=f.checkPublished(a.report)},!0),a.$watch("report.session",function(b){a.encodedSession=encodeURIComponent(b)}),a.$watch("report.status",f.getVerificationHandler(a)),a.$watch("report.steps",f.getStepsHandler(a)),a.$watch("report.status",function(b,c){b!==c&&(a.report.status_updated=j.render(new Date),a.save())}),a.$watch("report.texts",function(){a.hasTranscript=a.report.texts[0].transcript},!0)}),a.api=d,a.largeScreen=i.is("md,lg"),a.save=function(){a.status="info",a.alert="saving",a.disabled=!0,d.reports.save(a.report).then(function(){a.status="success",a.alert="saved",a.disabled=!1}).catch(function(){a.status="danger",a.alert="error"})},a.changeStep=function(b){b||alert("A validation step should never be unchecked, if you are unchecking now this means that the validation process was poor. Please be sure to avoid this in the future"),a.save()},a.startTranscript=function(){var b;b=a.hasTranscript?a.report.texts[0].transcript:angular.copy(a.report.texts[0].original),a.transcriptCandidate=b,a.editingTranscript=!0},a.cancelTranscriptEditing=function(){a.editingTranscript=!1},a.saveTranscript=function(){a.disableTranscript=!0;var b=angular.copy(a.report.texts);b[0].transcript=a.transcriptCandidate,d.reports.update(a.report,{texts:b}).then(function(b){a.disableTranscript=!1,a.editingTranscript=!1,a.report=b})},a.discardTranscript=function(){a.disableTranscript=!0;var b=angular.copy(a.report.texts);b[0].transcript=void 0,d.reports.update(a.report,{texts:b}).then(function(b){a.disableTranscript=!1,a.report=b})},g.promise.then(function(b){a.coverages=b}),a.publish=function(){a.disablePublish=!0,f.publish(a.report,a.selectedCoverage).then(function(){k(),a.disablePublish=!1})},a.unpublish=function(){a.disablePublish=!0,f.unpublish(a.report,a.selectedCoverage).then(function(){k(),a.disablePublish=!1})},a.deleteSummary=function(){a.deleteSummaryDisabled=!0,d.reports.remove(a.report).then(function(){h.history.back()})}}]),angular.module("citizendeskFrontendApp").controller("ReportTweetCtrl",["$scope","$routeParams","Raven","api","$location","Coverages","Report","linkTweetEntities","Bacon","$q","screenSize","superdeskDate",function(a,b,c,d,e,f,g,h,i,j,k,l){var m=b.id,n={coveragesData:i.constant(f.promise)},o={updateReport:new i.Bus};n.coveragesData.onValue(function(b){b.then(function(b){a.coverages=b})}),o.reportData=o.updateReport.map(function(){return d.reports.getById(m)}),o.reportData.onValue(function(b){return b.then(function(b){g.addSteps(b),a.isPublished=g.checkPublished(b),a.report=b,a.linkedText=h(b),b.on_behalf_id&&d.users.getById(b.on_behalf_id).then(function(b){a.onBehalf=b})})}),o.reportData.take(1).onValue(function(b){b.then(function(){a.$watch("report.status",g.getVerificationHandler(a)),a.$watch("report.steps",g.getStepsHandler(a)),a.$watch("report.status",function(b,c){b!==c&&(a.report.status_updated=l.render(new Date),a.save())})})}),i.combineAsArray(o.reportData,n.coveragesData).onValue(function(b){var c=b[0],d=b[1];j.all([c,d]).then(function(b){var c=b[0],d=b[1];a.selectedCoverage=g.getSelectedCoverage(c,d)})}),a.largeScreen=k.is("md,lg"),a.save=function(){a.status="info",a.alert="saving",a.disabled=!0,d.reports.save(a.report).then(function(){a.status="success",a.alert="saved",a.disabled=!1}).catch(function(){a.status="danger",a.alert="error"})},a.changeStep=function(b){b||alert("A validation step should never be unchecked, if you are unchecking now this means that the validation process was poor. Please be sure to avoid this in the future"),a.save()},a.publish=function(){a.disablePublish=!0,g.publish(a.report,a.selectedCoverage).then(function(){o.updateReport.push("start"),a.disablePublish=!1})},a.unpublish=function(){a.disablePublish=!0,g.unpublish(a.report,a.selectedCoverage).then(function(){o.updateReport.push("start"),a.disablePublish=!1})},o.updateReport.push("start")}]),angular.module("citizendeskFrontendApp").service("FilterGrouper",function(){this.getDescription=function(a){var b=angular.copy(a),c=[];if("track"in b&&(c=c.concat(b.track)),"follow"in b&&(c=c.concat(b.follow)),"location"in b){var d=[];angular.forEach(b.location,function(a,b){d.push(b)}),c=c.concat(d)}return c.join(", ")},this.getSlug=function(a){var b=angular.copy(a),c=[];if("track"in b&&(c=c.concat(b.track)),"follow"in b&&(c=c.concat(b.follow)),"location"in b){var d=[];angular.forEach(b.location,function(a,b){d.push(b)}),c=c.concat(d)}return c.join("-")}}),angular.module("citizendeskFrontendApp").controller("MonitorCtrl",["$scope","$routeParams","api","Monitors","QueueSelection","linkTweetEntities","AliasesInLists","Raven",function(a,b,c,d,e,f,g,h){a.reports=[],c.reports.query({where:JSON.stringify({"channels.value":b.id}),sort:'[("produced", -1)]'}).then(function(b){b._items.forEach(function(b){try{b.linkedText=f(b),g.embedAuthorAlias(b),a.reports.push(b)}catch(c){h.raven.captureException(c)}})}),d.getById(b.id).then(function(b){e.description=b.user_id.username+"'s monitor",a.monitor=b})}]),angular.module("citizendeskFrontendApp").service("Monitors",["api","$q","lodash",function(a,b,c){var d,e=c;this.update=function(){var c,f;d=b.defer(),a.twt_streams.query({embedded:'{"user_id":true}'}).then(function(b){return c=b._items,a.twt_filters.query()}).then(function(a){f=a._items,c.forEach(function(a){a.filter=e.find(f,function(b){return b._id===a.spec.filter_id})}),d.resolve(c)})},this.getByUserId=function(a){return d.promise.then(function(b){return e.find(b,function(b){return b.user_id._id===a})})},this.getById=function(a){return d.promise.then(function(b){return e.find(b,function(b){return b._id===a})})},this.update(),this.promise=d.promise}]),angular.module("citizendeskFrontendApp").controller("NewTwitterSearchCtrl",["TwitterSearches","$scope","$location",function(a,b,c){b.submit=function(){b.loading=!0,a.create(b.terms).then(function(a){c.url("/twitter-search/"+a)})}}]),angular.module("citizendeskFrontendApp").service("TwitterSearches",["$resource","$q","Raven","$http","api","lodash","addNewValues","AliasesInLists","Report","config","reportStatuses","session",function(a,b,c,d,e,f,g,h,i,j,k,l){var m=this,n=f;this.list=[],this.promise=e.twt_searches.query({where:JSON.stringify({creator:l.identity._id})}).then(function(a){return m.list=a._items,m.list}),this.start=function(a){return"reports"in a?b.when(a):(a.reports=[],a.limit=50,d.post(j.server.url+"proxy/start-twitter-search/",{user_id:"1",request_id:a._id,search_spec:{query:a.query}}).then(function(){return m.fetchResults(a)}))},this.create=function(a){return e.twt_searches.create({description:a,query:{contains:[a]},creator:l.identity._id}).then(function(a){return m.list.push(a),a._id})},this.fetchResults=function(a){function b(d){return e.reports.query({where:c,sort:'[("produced", -1)]',page:d}).then(function(c){return g(a.reports,c._items),a.reports.forEach(h.embedAuthorAlias),c._links.next&&b(d+1),a})}var c=JSON.stringify({$and:[{"channels.request":a._id},{status:k("")},{assignments:{$size:0}}]});return b(1)},this.byId=function(a){return m.promise.then(function(b){for(var d=!1,e=0;e<b.length;e++)("undefined"==typeof a||b[e]._id===a)&&(d=b[e]);return d?m.start(d):void c.raven.captureMessage("twitter search with id "+a+" not found")})},this.delete=function(a){var b=e.twt_searches.remove(a);return b.then(function(){n.remove(m.list,a)}),b},this.refreshReport=function(a,b){return m.byId(a).then(function(a){return e.reports.getById(b,{embedded:'{"assignments.user_id": true }'}).then(function(c){var d=n.findIndex(a.reports,function(a){return a._id===b});return i.linkTweetTexts(c),a.reports[d]=c,{index:d,fresh:c}})})}}]),angular.module("citizendeskFrontendApp").controller("TwitterSearchCtrl",["$scope","TwitterSearches","$routeParams","$location","QueueSelection","PageBroker","linkTweetEntities","AliasesInLists","ScrollTo",function(a,b,c,d,e,f,g,h,i){function j(){var a=f.getReturnedData();a&&a.updateId&&(i.targetStream.push(a.updateId),b.refreshReport(c.id,a.updateId))}function k(a){a.linkedText=g(a),h.embedAuthorAlias(a)}a.queue={},a.loading=!0,b.byId(c.id).then(function(b){b?(j(),e.description=b.description,b.reports.forEach(k),a.queue=b):d.url("/error-no-searches")}).then(function(){a.loading=!1}),a.delete=function(){a.status="deleting",b.delete(a.queue).then(function(){a.status="deleted"}).catch(function(){a.status="error"})},a.assign=function(a){f.load("/assign/",{report:a})}}]),angular.module("citizendeskFrontendApp").directive("reportSummary",function(){return{templateUrl:"views/directives/report-summary.html"}}),angular.module("citizendeskFrontendApp").service("Resources",["resource","config",function(a,b){var c=b.server.url;this.settings={bool:a(c+"/settings-bool/:id"),string:a(c+"/settings-string/:id"),"int":a(c+"/settings-int/:id")},this.steps=a(c+"/steps/:id"),this.reports=a(c+"/reports/:id")}]),angular.module("citizendeskFrontendApp").factory("$exceptionHandler",["$injector",function(a){return function(b,c){console.error(b.stack);var d=a.get("Raven");d.raven.captureException(b,{extra:{cause:c}})}}]),angular.module("citizendeskFrontendApp").factory("errorHttpInterceptor",["$injector","$q","Body","Raven",function(a,b,c,d){function e(a,e){c.connectionError=e;var f;return f=a.config.data?JSON.stringify(a.config.data).slice(0,50):"the corresponding request had no data",d.raven.captureException(new Error(e),{extra:{responseData:a.data,responseStatus:a.status,requestLocation:a.config.url,request50char:f,requestMethod:a.config.method}}),b.reject(e)}return{responseError:function(a){return e(a,"HTTP response error")},response:function(a){return a.data&&a.data._status&&"ERR"===a.data._status?e(a,"Server side application error"):a}}}]),angular.module("citizendeskFrontendApp").factory("resource",["$resource",function(a){return function(b,c,d,e){d=angular.extend(d||{},{create:{method:"POST"},update:{method:"PUT"}});var f=a(b,c,d,e);return f.prototype.$save=function(){return this._id?this.$update({id:this._id}):this.$create()},f}}]),angular.module("citizendeskFrontendApp").service("ReportPolling",["$timeout","$http","config",function(a,b,c){function d(a,b){var c=a._id;c in l||(l[c]=a,b())}function e(){var i=JSON.stringify({produced:{$gt:g.lastDate}}),l='[("produced", -1)]';b.get(c.server.url+"/reports",{params:{where:i,sort:l}}).then(function(a){var b=a.data;if(!angular.isArray(b))throw new Error("reports is "+JSON.stringify(b));b.length&&(g.lastDate=b[0].produced),b.forEach(function(a){d(a,function(){k.forEach(function(b){b(a)})})})}).finally(function(){j&&(f=a(e,1e3*h))})}var f,g=this,h=5,i=!1,j=!0,k=[],l={};this.lastDate=(new Date).toGMTString(),this.onCreate=function(a){k.push(a),i||e()}}]),angular.module("citizendeskFrontendApp").directive("queueSelection",function(){return{templateUrl:"views/directives/queue-selection.html"}}),angular.module("citizendeskFrontendApp").controller("QueueSelectionCtrl",["$scope","TwitterSearches","QueueSelection",function(a,b,c){a.monitors=[],a.service=c,b.promise.then(function(b){a.searches=b})}]),angular.module("citizendeskFrontendApp").service("QueueSelection",function(){}),angular.module("citizendeskFrontendApp").controller("WebQueueCtrl",["$scope","Resources","QueueSelection",function(a,b,c){c.description="Reports coming from the web interface",a.reports=b.reports.query({where:'{"channels.type":"web"}'})}]),angular.module("citizendeskFrontendApp").factory("lodash",function(){return _}),angular.module("citizendeskFrontendApp").controller("MobileQueueCtrl",["$scope","api","QueueSelection","PageBroker","AliasesInLists","reportStatuses","Report","lodash",function(a,b,c,d,e,f,g,h){function i(c){b.reports.query({where:JSON.stringify({$and:[{feed_type:"sms"},{automatic:{$ne:!0}},{status:f("")},{assignments:{$size:0}}]}),sort:'[("produced", -1)]',page:c}).then(function(b){b._items.forEach(function(a){e.embedAuthorAlias(a)}),a.reports=a.reports.concat(b._items),b._links.next&&i(c+1),a.loading=!1})}c.description="Reports coming from mobile phones",a.reports=[],a.loading=!0,a.disabled={},a.assign=function(a){d.load("/assign/",{report:a})},a.dismiss=g.getDismiss(a.disabled,function(b){h.remove(a.reports,function(a){return a._id===b._id})}),i(1)}]),angular.module("citizendeskFrontendApp").factory("AuthInterceptor",["session","$q","$injector",function(a,b,c){function d(b){return a.expire(),a.getIdentity().then(function(){var d=c.get("$http");return d.defaults.headers.common.Authorization=a.token,b.config.headers.Authorization=a.token,d(b.config)})}return{response:function(a){return 401===a.status?d(a):a},responseError:function(a){return 401===a.status?d(a):b.reject(a)}}}]),angular.module("citizendeskFrontendApp").service("session",["lodash","$q","$rootScope","storage",function(a,b,c,d){function e(a){a?localStorage.setItem(i,a):localStorage.removeItem(i)}function f(a){a?localStorage.setItem(j,a):localStorage.removeItem(j)}function g(){return localStorage.getItem(i)||null}var h,i="sess:id",j="sess:href",k="sess:user";this.token=null,this.identity=null,this.getIdentity=function(){return h=h?h:b.defer(),h.promise},this.updateIdentity=function(a){this.identity=this.identity||{},_.extend(this.identity,a),d.setItem(k,this.identity)},this.start=function(a,b){this.token=a.token,e(a.token),f(a._links.self.href),this.identity=null,this.updateIdentity(b),h&&(h.resolve(b),h=null)},this.expire=function(){this.token=null,e(null)},this.clear=function(){this.expire(),this.identity=null,f(null),d.removeItem(k)},this.getSessionHref=function(){return localStorage.getItem(j)},c.$watch(g,_.bind(function(a){this.token=a,this.identity=d.getItem(k)},this))}]),angular.module("citizendeskFrontendApp").service("storage",function(){this.getItem=function(a){return angular.fromJson(localStorage.getItem(a))},this.setItem=function(a,b){localStorage.setItem(a,angular.toJson(b))},this.removeItem=function(a){localStorage.removeItem(a)},this.clear=function(){localStorage.clear()}}),angular.module("citizendeskFrontendApp").factory("initAuth",["$rootScope","$route","$location","$http","$window","session",function(a,b,c,d,e,f){return function(){a.$watch(function(){return f.identity},function(){a.currentUser=f.identity}),a.$watch(function(){return f.token},function(a){a?d.defaults.headers.common.Authorization="Basic "+btoa(a+":"):delete d.defaults.headers.common.Authorization}),a.$on("$locationChangeStart",function(a){f.token||(f.getIdentity().then(function(){d.defaults.headers.common.Authorization="Basic "+btoa(f.token+":"),b.reload()}),a.preventDefault())})}}]),angular.module("citizendeskFrontendApp").service("auth",["$q","api","session","authAdapter",function(a,b,c,d){this.login=function(a,e){function f(a){return b.users.getById(a.user)}return d.authenticate(a,e).then(function(a){return f(a).then(function(b){return c.start(a,b),c.identity})})}}]),angular.module("citizendeskFrontendApp").service("authAdapter",["$http","$q","config",function(a,b,c){this.authenticate=function(b,d){return a.post(c.server.url+"auth",{username:b,password:d}).then(function(b){return a.defaults.headers.common.Authorization="Basic "+btoa(b.data.token+":"),b.data})}}]),angular.module("citizendeskFrontendApp").controller("LoginCtrl",["$scope","$modal","auth","$location","session","$window","$http",function(a,b,c,d,e,f,g){a.$watch(function(){return e.token},function(c){a.identity=e.identity,a.username=e.identity?e.identity.username:null,a.password=null,c||(a.modal=b.open({templateUrl:"views/modals/login.html",keyboard:!1,backdrop:"static"}))}),a.logout=function(){function a(){e.clear()}var b=e.getSessionHref();b?g["delete"](b).then(a,a):a()}}]),angular.module("citizendeskFrontendApp").controller("LoginModalCtrl",["$scope","auth",function(a,b){a.username="",a.password="",a.errors={service:!1},a.submit=function(){b.login(a.username,a.password).then(function(){a.$close()}).catch(function(){a.errors.service=!0})}}]),angular.module("citizendeskFrontendApp").controller("CitizenCardCtrl",["$scope","$routeParams","api","config","$http","PageBroker",function(a,b,c,d,e,f){function g(){var f={where:JSON.stringify({"identifiers.user_name":b.name,authority:b.authority}),embedded:'{"tags": 1}'};c.citizen_aliases.query(f).then(function(g){a.response=g;var h=g._items;h.length>0?a.alias=h[0]:e({method:"POST",url:d.server.url+"proxy/fetch-citizen-alias/",data:b}).then(function(){c.citizen_aliases.query(f).then(function(b){var c=b._items;if(!(c.length>0))throw new Error("zero aliases after fetch request");if(a.alias=c[0],c.length>1)throw new Error("multiple aliases for the same user")})})})}g(),c.reports.query({where:JSON.stringify({"authors.identifiers.user_name":b.name,"authors.authority":b.authority})}).then(function(b){a.reports=b._items}),a.editTags=function(){f.load("/edit-user-lists",a.alias)}}]),angular.module("citizendeskFrontendApp").factory("addNewValues",["lodash",function(a){var b=a;return function(a,c){function d(c){var d=b.find(a,function(a){return c._id===a._id});return"undefined"==typeof d?!0:!1}var e=b.filter(c,d);e.forEach(function(b){a.push(b)})}}]),angular.module("citizendeskFrontendApp").filter("sortByDate",["lodash","parseDate",function(a,b){return function(a,c,d){if(a){var e=angular.copy(a);return e.sort(function(a,e){return d?b(e[c])-b(a[c]):b(a[c])-b(e[c])}),e}return[]}}]),angular.module("citizendeskFrontendApp").factory("parseDate",function(){return function(a){function b(a){return parseInt(a,10)}var c=a.split("T"),d=c[0],e=c[1],f=d.split("-"),g=e.split("+"),h=g[0],i=h.split(":");if("0000"!==g[1])throw new Error("Date "+a+" is probably not in UTC time, or not in the expected format");f=f.map(b),i=i.map(b);var j=f[0],k=f[1]-1,l=f[2],m=i[0],n=i[1],o=i[2];return new Date(Date.UTC(j,k,l,m,n,o))}}),angular.module("citizendeskFrontendApp").controller("SessionCtrl",["$scope","api","$routeParams","$http","config","session","addNewValues","PagePolling","Body","$filter","$location","Report",function(a,b,c,d,e,f,g,h,i,j,k,l){function m(a,c,d){var e=angular.copy(a);e.page=d||1,b.reports.query(e).then(function(a){c(a),a._links.next&&m(d+1,e,c)})}function n(){var b={where:JSON.stringify({$and:[{session:c.session},{summary:!0}]}),sort:'[("produced", 1)]'};m(b,function(b){g(a.summaries,b._items)})}function o(){var b={where:JSON.stringify({$and:[{session:c.session},{summary:!1}]}),sort:'[("produced", 1)]'};m(b,function(b){g(a.reports,b._items)})}function p(c){b.users.query({page:c}).then(function(b){b._items.map(function(b){a.users[b._id]=b}),b._links.next&&p(c+1)})}i.glue=!0,a.body=i,a.reports=[],a.summaries=[],a.replies={},a.users={},a.$watch("reports",function(){for(var b=a.reports.length-1;b>=0;b--)if(!a.reports[b].local)return void(a.replyReport=a.reports[b]);if(a.reports.length)throw new Error("no valid report found for replies in session "+c.session)},!0),a.reset=function(){a.reply=""},a.sendReply=function(b){b.user_id=f.identity._id,b.sensitive=!1,b.language="en",d.post(e.server.url+"proxy/mobile-reply/",b).then(function(){a.reset(),o()})},o(),n(),h.setInterval(function(){o()},1e4),p(1),a.submitSummary=function(){var d=l.create({session:c.session});d.texts=[{original:a.summaryContent}],d.summary=!0,b.reports.save(d).then(function(){n()})},a.goToSummary=function(){k.url("/report-sms/"+a.summaries[0]._id)}}]),angular.module("citizendeskFrontendApp").service("PagePolling",["$interval","$rootScope",function(a,b){var c=this;this.promises=[],this.setInterval=function(b,d){var e=a(b,d);return c.promises.push(e),e},b.$on("$routeChangeStart",function(){c.promises.forEach(function(b){a.cancel(b)}),c.promises=[]})}]),angular.module("citizendeskFrontendApp").factory("now",function(){return function(){var a=new Date;return a.getTime()}}),angular.module("citizendeskFrontendApp").factory("cacheBuster",["now","$templateCache",function(a,b){return{request:function(c){if(b.get(c.url))return c;var d;return d=-1!==c.url.search("\\?")?"&":"?",c.url+=d+"cachebuster="+a(),c}}}]),angular.module("citizendeskFrontendApp").service("Assign",["api","$q",function(a,b){var c=this,d=b.defer();this.users=[],this.totals={},this.updateUsers=function(b){a.users.query({page:b}).then(function(a){a._items.forEach(function(a){c.users.push(a)}),a._links.next?c.updateUsers(b+1):d.resolve()})},this.updateTotals=function(){d.promise.then(function(){c.users.forEach(function(b){a.reports.query({where:JSON.stringify({$and:[{"assignments.user_id":b._id},{$or:[{status:""},{status:{$exists:!1}},{"coverages.published":{$size:0}}]}]})}).then(function(a){"_meta"in a&&(c.totals[b._id]=a._meta.total)})})})},this.updateUsers(1)}]),angular.module("citizendeskFrontendApp").controller("AssignCtrl",["$scope","Assign","PageBroker","api","$http","session","reportStatuses","superdeskDate",function(a,b,c,d,e,f,g,h){a.users=b.users,a.totals=b.totals,a.identity=f.identity,a.disabled=!1,c.getData("/twitter-search/").then(function(b){a.report=b.report}),b.updateTotals(),a.assignTo=function(b){a.disabled=!0,d.reports.update(a.report,{assignments:[{user_id:b}],status:g(""),status_updated:h.render(new Date),proto:!1}).then(function(){c.back({updateId:a.report._id})})},a.back=function(){c.back({updateId:a.report._id})}}]),angular.module("citizendeskFrontendApp").service("PageBroker",["$location","$rootScope","$q","$window",function(a,b,c,d){function e(){f=null,g=null}var f,g,h;e(),b.$on("$locationChangeSuccess",function(){h?h=!1:e()}),this.load=function(b,c){f=c,g=b,h=!0,a.url(b)},this.getData=function(b){var d=c.defer();return null===f?(a.url(b),d.reject()):d.resolve(angular.copy(f)),d.promise},this.back=function(a){f=a,h=!0,d.history.back()},this.getReturnedData=function(){return f}}]);