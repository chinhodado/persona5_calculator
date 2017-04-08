///<reference path="../data/Data5.ts"/>
/**
 * Created by Chin on 08-Apr-17.
 */
var ListCtrl = (function () {
    function ListCtrl() {
        this.personae = personae;
        this.sortBy = this.params.sort_by || 'level';
    }
    return ListCtrl;
}());
