angular.module('editor', ['ui.bootstrap'])
    .controller('editorController', ['$scope', '$uibModal', 'getIcons', 'getSynonyms', function($scope, $uibModal, getIcons, getSynonyms) {

        let isInEditMode = false;
        let showingSourceCode = false;
        $scope.isSynonymsSelected = true;
        $scope.selectedHead = 'H1';
        $scope.selectedFont = 'Arial';
        $scope.maxNumber;
        $scope.selectedSynonyms;

        let getListOfIcons = function() {
            getIcons.getData().then(function(responseData) {
                $scope.allIcons = responseData.iconList;
                $scope.headings = responseData.heading;
                $scope.fontNames = responseData.fontNames;
                $scope.seachQuery = responseData.seachQuery;
            })
        }
        getListOfIcons();

        $scope.searchSynonyms = function(selectedSynonyms, maxNumber) {
            $scope.isSynonymsSelected = selectedSynonyms ? true : false;
            let inputString = textField.document.getElementsByTagName('body')[0].textContent;

            if (inputString && selectedSynonyms) {
                $uibModal.open({
                    controller: 'popupController',
                    templateUrl: './pop-template.html',
                    size: 'lg',
                    resolve: {
                        searchedList: function() {
                            return getSynonyms.getSynonyms(selectedSynonyms, inputString, maxNumber)
                                .then(function(data) {
                                    return data;
                                }, function(error) {
                                    return error;
                                })
                        }
                    }
                })
            }

            $scope.$on('replceString', function(args, data) {
                textField.document.getElementsByTagName('body')[0].innerHTML = data;
            });
        }

        $scope.getChange = function(changeTo, arg) {
            arg = arg ? arg : null;
            textField.document.execCommand(changeTo, false, arg);
        }

        $scope.toggleEdit = function() {
            if (isInEditMode) {
                textField.document.designMode = 'Off';
                isInEditMode = false;
            } else {
                textField.document.designMode = 'On';
                isInEditMode = true;
            }
        }
        $scope.toggleEdit();

        $scope.toggleSource = function() {
            if (showingSourceCode) {
                textField.document.getElementsByTagName('body')[0].innerHTML = textField.document.getElementsByTagName('body')[0].textContent;
                showingSourceCode = false;
            } else {
                textField.document.getElementsByTagName('body')[0].textContent = textField.document.getElementsByTagName('body')[0].innerHTML;
                showingSourceCode = true;
            }
        }


    }])
    .controller('popupController', function($scope, $rootScope, $uibModalInstance, searchedList) {
        $scope.close = function() {
            $uibModalInstance.close('cancel');
        };
        $scope.searchCatValue = '';
        if (searchedList.data.length > 1) {
            $scope.synonymsList = searchedList.data;

            $scope.replceWord = function(word) {
                $rootScope.$broadcast('replceString', word);
                $uibModalInstance.dismiss('cancel');
            };
        } else {
            $scope.synonymsList = '';
            $scope.errorMessage = "No Data Found";
        }
    })