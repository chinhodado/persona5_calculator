var StickyTableDirective = function() {
    return {
        restrict: 'A',
        link: function($scope, $element) {
            $element.stickyTableHeaders();
            $scope.$on('$destroy', function() {
                $element.stickyTableHeaders('destroy');
            });
        }
    };
};
