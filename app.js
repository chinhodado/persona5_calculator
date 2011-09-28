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
}
CalcCtrl.$inject = [];

CalcCtrl.prototype.formatPersona = function(persona) {
  return persona.name + ' (' + persona.level + ' / ' + persona.arcana + ')';
};

CalcCtrl.prototype.getRecipes = function() {
  if ('undefined' == typeof personaeByName[this.produce_persona]) {
    return [];
  }
  var personaName = this.produce_persona;
  var arcana = personaeByName[personaName].arcana;

  // Find the arcana combos (and thieir sources) that can make this persona.
  var sources = {};
  var combos = [];
  for (var i = 0, combo = null; combo = arcana2Combos[i]; i++) {
    if (arcana == combo.result) {
      combos.push(combo);
      sources[combo.source[0]] = 1;
      sources[combo.source[1]] = 1;
    }
  }

  // Brute force over every combination!
  var recipes = [];
  for (var i = 0, combo = null; combo = combos[i]; i++) {
    var personae1 = personaeByArcana[combo.source[0]];
    for (var j = 0, persona1 = null; persona1 = personae1[j]; j++) {
      if (persona1.name == personaName) continue;
      var personae2 = personaeByArcana[combo.source[1]];
      for (var k = 0, persona2 = null; persona2 = personae2[k]; k++) {
        if (persona1.arcana == persona2.arcana && k <=j) continue;
        if (persona2.name == personaName) continue;
        if (persona1 == persona2) continue;
        var result = fuse(persona1, persona2, combo);
        if (result && result.name == personaName) {
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
