angular.module('editor')
    .factory('getIcons', function($http, $q) {
        let services = {};
        let defer = $q.defer();
        services.getData = function() {
            $http.get('./icons.json')
                .then(function(responseData) {
                    defer.resolve(responseData.data);
                }, function(error) {
                    defer.reject(error.statusText)
                })
            return defer.promise;
        };
        return services;
    })
    .factory('getSynonyms', function($http, $q) {
        let services = {};
        let defer = $q.defer();
        services.getSynonyms = function(selectedSynonyms, inputString, maxNumber) {
            let totalMaxNumber = maxNumber ? '&max=' + maxNumber : '';
            if (selectedSynonyms && inputString) {
                let request = 'http://localhost:3000/rajendra?synonyms=' + selectedSynonyms + '&text=' + inputString + totalMaxNumber
                $http.get(request)
                    .then(function(Synonyms) {
                        defer.resolve(Synonyms);
                    }, function(error) {
                        defer.reject(error.statusText)
                    })
                return defer.promise;
            }
        };
        return services;
    })