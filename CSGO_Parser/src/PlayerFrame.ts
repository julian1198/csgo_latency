import { Avatar } from "./Avatar";

//these are all the data saved in the game data
class PlayerFrame{
    tickCount: number;
    player: Avatar[];

    constructor(nTickCount: number){
        this.tickCount = nTickCount;
        this.player = [];
    }

    addPlayerData(avatar: Avatar){
        this.player.push(avatar);
    }

} 


export {PlayerFrame};