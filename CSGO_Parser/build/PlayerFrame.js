"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerFrame = void 0;
//these are all the data saved in the game data
var PlayerFrame = /** @class */ (function () {
    function PlayerFrame(nTickCount) {
        this.tickCount = nTickCount;
        this.player = [];
    }
    PlayerFrame.prototype.addPlayerData = function (avatar) {
        this.player.push(avatar);
    };
    return PlayerFrame;
}());
exports.PlayerFrame = PlayerFrame;
