"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputFrame = void 0;
//These are all the attributes saved in the input JSON
var InputFrame = /** @class */ (function () {
    function InputFrame(nTickCount, nButtons, nMouseDeltaX, nMouseDeltaY) {
        this.tickCount = nTickCount;
        this.buttons = nButtons;
        this.mouseDeltaX = nMouseDeltaX;
        this.mouseDeltaY = nMouseDeltaY;
    }
    return InputFrame;
}());
exports.InputFrame = InputFrame;
