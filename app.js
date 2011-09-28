// http://polishinggems.blogspot.com/2011/09/building-angularjs-directive-for-jquery_01.html
angular.directive('my:autocomplete', function(expression, element) {
  var compiler = this;
  return function(element) {
    var currentScope = this;
    element.autocomplete({'source': window[expression], 'select': function(a,b,c) {
      // Grr.  I can't make it work when clicking autocomplete.  Why?
      console.log('>>> autocomplete on select ...');
    }});
  }
});

function CalcCtrl() {
  this.$watch('produce_persona', 'recipes = getRecipes()', null, false);
  this.$watch('use_persona', 'recipes = getRecipes()', null, false);
  this.$watch('produce_arcana', 'recipes = getRecipes()', null, false);
  this.$watch('use_arcana', 'recipes = getRecipes()', null, false);
}
CalcCtrl.$inject = [];

CalcCtrl.prototype.formatPersona = function(persona) {
  return persona.name + ' (' + persona.level + ' / ' + persona.arcana + ')';
};

CalcCtrl.prototype.getRecipes = function() {
  try {
    var persona = personaeByName[this.produce_persona.toLowerCase()];
  } catch (e) {
    return [];
  }
  if (!persona) return [];

  // Find the arcana combos that can make this persona.
  var combos = angular.Array.filter(
    arcana2Combos, function(x) { return x.result == persona.arcana; });

  // Brute force over every combination!
  var recipes = [];
  for (var i = 0, combo = null; combo = combos[i]; i++) {
    var personae1 = personaeByArcana[combo.source[0]];
    for (var j = 0, persona1 = null; persona1 = personae1[j]; j++) {
      if (persona1.name == persona.name) continue;
      var personae2 = personaeByArcana[combo.source[1]];
      for (var k = 0, persona2 = null; persona2 = personae2[k]; k++) {
        if (persona1.arcana == persona2.arcana && k <=j) continue;
        if (persona2.name == persona.name) continue;
        if (persona1 == persona2) continue;
        var result = fuse(persona1, persona2, combo);
        if (result && result.name == persona.name) {
          recipes.push({
            'sources': [persona1, persona2],
            'result': result,
            });
        }
      }
    }
  }

  return recipes;
};

CalcCtrl.prototype.reset = function() {
  this.produce_persona = '';
  this.use_persona = '';
  this.produce_arcana = '';
  this.use_arcana = '';
}

CalcCtrl.prototype.setMakePersona = function(persona) {
  this.reset();
  this.produce_persona = persona.name;
}

function fuse(persona1, persona2, combo) {
  if (!combo) {
    throw new Error('For now, fusion must specify combo!');
  }

  var level = 1 + Math.floor(
    (persona1.level + persona2.level) / 2
    );
  var arcana = combo.result;

  var personae = personaeByArcana[arcana];
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
