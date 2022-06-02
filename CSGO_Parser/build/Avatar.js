"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avatar = void 0;
//These are all the attributes saved for a player
var Avatar = /** @class */ (function () {
    function Avatar(nUserID, nTeamNumber, nArmor, nEyeAngles, nHealth, nPlaceName, nHasC4, nCurrentEquipmentValue, nFlashDuration, nHasDefuser, nIsScoped, nIsSpotted, nName, nWeapon, nHasSpotted, nPOVPlayer) {
        this.userID = nUserID;
        this.teamNumber = nTeamNumber;
        this.armor = nArmor;
        this.eyeAngeles = nEyeAngles;
        this.health = nHealth;
        this.placeName = nPlaceName;
        this.hasC4 = nHasC4;
        this.currentEquipmentValue = nCurrentEquipmentValue;
        this.flashDuration = nFlashDuration;
        this.hasDefuser = nHasDefuser;
        this.isScoped = nIsScoped;
        this.isSpotted = nIsSpotted;
        this.name = nName;
        this.weapon = nWeapon;
        this.hasSpotted = nHasSpotted;
        this.POVPlayer = nPOVPlayer;
    }
    return Avatar;
}());
exports.Avatar = Avatar;
