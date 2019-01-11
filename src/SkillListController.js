///<reference path="DataUtil.ts"/>
/**
 * Created by Chin on 11-Apr-17.
 */
var SkillListController = /** @class */ (function () {
    function SkillListController($scope, $sce) {
        $scope.skillList = skillList;
        if (!SkillListController.sceDone) {
            for (var i = 0; i < skillList.length; i++) {
                skillList[i].personaDisplay = $sce.trustAsHtml(skillList[i].personaDisplay);
                skillList[i].talkDisplay = $sce.trustAsHtml(skillList[i].talkDisplay);
                skillList[i].fuseDisplay = $sce.trustAsHtml(skillList[i].fuseDisplay);
            }
            SkillListController.sceDone = true;
        }
        // set the default sort param
        $scope.sortBy = 'name';
        $scope.reverse = false;
    }
    SkillListController.sceDone = false;
    return SkillListController;
}());
