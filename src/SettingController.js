///<reference path="DataUtil.ts"/>
var SettingController = /** @class */ (function () {
    function SettingController($scope) {
        $scope.dlcPersona = dlcPersona;
        $scope.save = this.save;
        for (var i = 0; i < dlcPersona.length; i++) {
            dlcPersona[i][2] = (isDlcPersonaOwned(dlcPersona[i][0]) ? "y" : "n");
        }
    }
    SettingController.prototype.save = function () {
        var config = {};
        var checkboxes = document.getElementsByClassName("dlcCheckbox");
        for (var i = 0; i < checkboxes.length; i++) {
            var checkbox = checkboxes[i];
            var name1 = checkbox.name.split(",")[0];
            var name2 = checkbox.name.split(",")[1];
            var value = checkbox.checked;
            config[name1] = value;
            config[name2] = value;
            localStorage["dlcPersona"] = JSON.stringify(config);
        }
        window.location.href = GLOBAL_IS_ROYAL ? "indexRoyal.html" : "index.html";
    };
    return SettingController;
}());
