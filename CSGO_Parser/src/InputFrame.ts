import { InputButton } from "demofile";

//These are all the attributes saved in the input JSON
class InputFrame{
    tickCount: number;
    buttons: readonly InputButton[];
    mouseDeltaX: number;
    mouseDeltaY: number;

    constructor(nTickCount: number, nButtons: readonly InputButton[], nMouseDeltaX: number, nMouseDeltaY: number){
        this.tickCount = nTickCount;
        this.buttons = nButtons;
        this.mouseDeltaX = nMouseDeltaX;
        this.mouseDeltaY = nMouseDeltaY;
    }

} 


export {InputFrame};