///<reference path="DataUtil.ts"/>
declare var GLOBAL_IS_ROYAL;

class SettingController {
    constructor($scope) {
        $scope.dlcPersona = dlcPersona;
        $scope.save = this.save;

        for (let i = 0; i < dlcPersona.length; i++) {
            dlcPersona[i][2] = (isDlcPersonaOwned(dlcPersona[i][0])? "y" : "n");
        }
    }

    save() {
        let config = {};
        let checkboxes = document.getElementsByClassName("dlcCheckbox");
        for (let i = 0; i < checkboxes.length; i++) {
            let checkbox = (<HTMLInputElement>checkboxes[i]);
            let name1 = checkbox.name.split(",")[0];
            let name2 = checkbox.name.split(",")[1];
            let value = checkbox.checked;
            config[name1] = value;
            config[name2] = value;
            localStorage["dlcPersona"] = JSON.stringify(config);
        }

        window.location.href = GLOBAL_IS_ROYAL? "indexRoyal.html" : "index.html";
    }
}