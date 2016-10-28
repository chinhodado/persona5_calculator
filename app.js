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

const arcanaRank = (function() {
  var arcanaRank_ = {};
  var rank = 0;
  var lastArcana = null;
  for (var i = 0, persona = null; persona = personae[i]; i++) {
    if (persona.arcana == lastArcana) continue;
    lastArcana = persona.arcana;
    arcanaRank_[persona.arcana] = rank++;
  }
  return arcanaRank_;
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
      $location.updateHash('/list/level');
      self.$eval();
    } else {
      $route.current.scope.params = $route.current.params;
      $window.scrollTo(0, 0);
    }
  });
}, {$inject:['$route', '$location', '$window'], $eager: true});

// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ //

function CalcCtrl(persona_name) {
  window.calc=this;
  this.ceil = Math.ceil;

  this.persona = personaeByName[persona_name || this.params.persona_name];
  if (!this.persona) return;

  this.allRecipes = [];
  this.getRecipes();
  this.allRecipes = angular.Array.orderBy(this.allRecipes, 'cost');
  this.maxCost = 0;
  for (var i = 0, recipe = null; recipe = this.allRecipes[i]; i++) {
    recipe.num = i;
    this.maxCost = Math.max(this.maxCost, recipe.cost);
  }

  this.perPage = 100;
  this.lastPage = Math.floor(this.allRecipes.length / this.perPage);
  this.pageNum = 0;
  this.$watch('filter', this.paginateAndFilter);
  this.$watch('pageNum', this.paginateAndFilter, false);
}
CalcCtrl.$inject = [];

CalcCtrl.prototype.getRank = function(persona) {
  return arcanaRank[persona.arcana];
};

CalcCtrl.prototype.addRecipe = function(recipe) {
  recipe.cost = 0;
  for (var i = 0, source = null; source = recipe.sources[i]; i++) {
    var level = source.level;
    recipe.cost += (27 * level * level) + (126 * level) + 2147;
  }

  // Sort so that the "3rd persona" in triangle fusion (the one that needs
  // to have the highest current level) is always listed first.  In case
  // of a tie in level, the persona with the lowest arcana rank is used.
  recipe.sources = angular.Array.orderBy(recipe.sources, [ '-level', this.getRank ]);
  this.allRecipes.push(recipe);
};

CalcCtrl.prototype.fuseRare = function(rarePersona, mainPersona) {
  var modifier = rareCombos[mainPersona.arcana][rarePersonae.indexOf(rarePersona.name)];
  var personae = personaeByArcana[mainPersona.arcana];
  var mainPersonaIndex = personae.indexOf(mainPersona);
  var newPersona = personae[mainPersonaIndex + modifier];

  if (!newPersona) {
    return null;
  }

  if (newPersona.special) {
    if (modifier > 0) modifier++;
    else if (modifier < 0) modifier--;

    newPersona = personae[mainPersonaIndex + modifier];
  }
  return newPersona;
};

CalcCtrl.prototype.fuse2 = function(arcana, persona1, persona2) {
  var level = 1 + Math.floor((persona1.level + persona2.level) / 2);
  var personae = personaeByArcana[arcana];

  for (var i = 0, persona = null; persona = personae[i]; i++) {
    if (persona.level >= level) {
      if (persona.special) continue;
      break;
    }
  }

  if (persona1.arcana == persona2.arcana) {
    i--;
  }
  if (personae[i] == persona1 || personae[i] == persona2) {
    i--;
  }

  // these are 2-persona-special fusions, so remove them from normal fusion
  if (personae[i] && personae[i].name == "Moloch" &&
      ((persona1.name == "Barong" && persona2.name == "Rangda") ||
      (persona2.name == "Barong" && persona1.name == "Rangda"))) {
    return null;
  }

  if (personae[i] && personae[i].name == "Attis" &&
      ((persona1.name == "Shiva" && persona2.name == "Parvati") ||
      (persona2.name == "Shiva" && persona1.name == "Parvati"))) {
    return null;
  }

  if (personae[i] && personae[i].name == "Baphomet" &&
      ((persona1.name == "Nebiros" && persona2.name == "Belial") ||
      (persona2.name == "Nebiros" && persona1.name == "Belial"))) {
    return null;
  }


  return personae[i];
};

CalcCtrl.prototype.getRecipes = function(personaName) {
  var recipes = [];

  if (this.persona.rare) {
    var recipe = {'sources': []};
    this.addRecipe(recipe);
    return;
  }

  // Check special recipes.
  if (this.persona.special) {
    for (var i = 0, combo = null; combo = specialCombos[i]; i++) {
      if (this.persona.name == combo.result) {
        var recipe = {'sources': []};
        for (var j = 0, source = null; source = combo.sources[j]; j++) {
          recipe.sources.push(personaeByName[source]);
        }
        this.addRecipe(recipe);
        return;
      }
    }
  }

  // Consider straight fusion.
  function filter2Way(persona1, persona2, result) {
    if (persona1.name == this.persona.name) return true;
    if (persona2.name == this.persona.name) return true;
    if (result.name == this.persona.name) return false;
    return true;
  }
  var recipes = this.getArcanaRecipes(this.persona.arcana, filter2Way);
  for (var i = 0, recipe = null; recipe = recipes[i]; i++) {
    this.addRecipe(recipe);
  }
};

CalcCtrl.prototype.getArcanaRecipes = function(arcanaName, filterCallback) {
  var recipes = [];
  var combos = angular.Array.filter(
      arcana2Combos, function(x) { return x.result == arcanaName; });
  for (var i = 0, combo = null; combo = combos[i]; i++) {
    var personae1 = personaeByArcana[combo.source[0]];
    var personae2 = personaeByArcana[combo.source[1]];
    for (var j = 0, persona1 = null; persona1 = personae1[j]; j++) {
      for (var k = 0, persona2 = null; persona2 = personae2[k]; k++) {
        if (persona1.arcana == persona2.arcana && k <= j) continue;
        if (persona1.rare && !persona2.rare) continue;
        if (persona2.rare && !persona1.rare) continue;
        var result = this.fuse2(combo.result, persona1, persona2);
        if (!result) continue;
        if (filterCallback
            && filterCallback.call(this, persona1, persona2, result)) {
          continue;
        }

        recipes.push({'sources': [persona1, persona2]});
      }
    }
  }

  for (var i = 0; i < rarePersonae.length; i++) {
    var rarePersona = personaeByName[rarePersonae[i]];
    var personae = personaeByArcana[this.persona.arcana];
    for (var j = 0; j < personae.length; j++) {
      var mainPersona = personae[j];
      if (rarePersona == mainPersona) continue;
      var result = this.fuseRare(rarePersona, mainPersona);
      if (!result) continue;
      if (filterCallback
          && filterCallback.call(this, rarePersona, mainPersona, result)) {
        continue;
      }

      recipes.push({'sources': [rarePersona, mainPersona]});
    }
  }

  return recipes;
};

CalcCtrl.prototype.paginateAndFilter = function() {
  if (this.pageNum < 0) this.pageNum = 0;
  if (this.pageNum > this.lastPage) this.pageNum = this.lastPage;

  this.recipes = angular.Array.filter(this.allRecipes, this.filter);
  this.numRecipes = this.recipes.length;
  this.recipes = this.recipes.slice(
      this.pageNum * this.perPage,
      this.pageNum * this.perPage + this.perPage);
};

// \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ //

function ListCtrl() {
  this.personae = personae;
  this.sortBy = this.params.sort_by || 'level';
}
ListCtrl.$inject = [];