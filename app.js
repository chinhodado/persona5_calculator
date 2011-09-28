// http://polishinggems.blogspot.com/2011/09/building-angularjs-directive-for-jquery_01.html
angular.directive('my:autocomplete', function(expression, element) {
  var compiler = this;
  return function(element) {
    var currentScope = this;
    element.autocomplete({'source': window[expression], 'select': function(a,b,c) {
      //console.log('comp select', currentScope, currentScope.$root);
      //console.log(a, b, c);
      //currentScope.$eval('produce_persona="'+b.value+'"');
      // ARGH HOW??
    }});
  }
});

function CalcCtrl() {
}
CalcCtrl.$inject = [];

CalcCtrl.prototype.getRecipes = function() {
  if ('undefined' == typeof personaeByName[this.produce_persona]) {
    return [];
  }

  return ['a'];
};
