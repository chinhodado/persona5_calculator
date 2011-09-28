// Derive data:
const personaeByName = (function() {
  var personaeByName_ = {};
  for (var i = 0, persona = null; persona = personae[i]; i++) {
    personaeByName_[persona.name] = persona;
  }
  return personaeByName_;
})();

const personaeByArcana = (function() {
  var personaeByArcana_ = {};
  for (var i = 0, persona = null; persona = personae[i]; i++) {
    if (!personaeByArcana_[persona.arcana]) {
      personaeByArcana_[persona.arcana] = [];
    }
    personaeByArcana_[persona.arcana].push(persona);
  }
  return personaeByArcana_;
})();

// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ //

angular.service('myAngularApp', function($route, $location, $window) {
  $route.when(
      '/list',
      {template: 'list.html', controller: ListCtrl});
  $route.when(
      '/list/:sort_by',
      {template: 'list.html', controller: ListCtrl});
  $route.when(
      '/persona/:persona_name',
      {template: 'calc.html', controller: CalcCtrl});

  var self = this;
  $route.onChange(function() {
    if (!$route.current) {
      $location.updateHash('/list/name');
      self.$eval();
    } else {
      $route.current.scope.params = $route.current.params;
      $window.scrollTo(0, 0);
    }
  });
}, {$inject:['$route', '$location', '$window'], $eager: true});

// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ //

function CalcCtrl() {
  this.persona = personaeByName[this.params.persona_name];
  if (!this.persona) return;
  this.recipes = this.getRecipes();
}
CalcCtrl.$inject = [];

CalcCtrl.prototype.fuse = function(combo, persona1, persona2) {
  var level = 1 + Math.floor((persona1.level + persona2.level) / 2);
  var personae = personaeByArcana[combo.result];

  for (var i = 0, persona = null; persona = personae[i]; i++) {
    if (persona.level >= level) {
      break;
    }
  }

  if (persona1.arcana == persona2.arcana) {
    i--;
  }
  if (personae[i] == persona1 || personae[i] == persona2) {
    i--;
  }

  return personae[i];
}

CalcCtrl.prototype.getRecipes = function(personaName) {
  // Find the arcana combos that can make this persona.
  var arcana = this.persona.arcana;  // for closure across broken this reference
  var combos = angular.Array.filter(
    arcana2Combos, function(x) { return x.result == arcana; });

  // Brute force over every combination!
  var recipes = [];
  for (var i = 0, combo = null; combo = combos[i]; i++) {
    var personae1 = personaeByArcana[combo.source[0]];
    for (var j = 0, persona1 = null; persona1 = personae1[j]; j++) {
      if (persona1.name == this.persona.name) continue;
      var personae2 = personaeByArcana[combo.source[1]];
      for (var k = 0, persona2 = null; persona2 = personae2[k]; k++) {
        if (persona1.arcana == persona2.arcana && k <=j) continue;
        if (persona2.name == this.persona.name) continue;
        if (persona1 == persona2) continue;
        var result = this.fuse(combo, persona1, persona2);
        if (result && result.name == this.persona.name) {
          var recipe = {
              'sources': [persona1, persona2],
              'result': result,
              };
          recipe.cost = angular.Array.sum(recipe.sources, 'level');
          recipes.push(recipe);
        } else {
          // TODO: 3-way fusion.
        }
      }
    }
  }

  return recipes;
};

// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ //

function ListCtrl() {
  this.personae = personae;
  this.sortBy = this.params.sort_by || 'name';
}
ListCtrl.$inject = [];
