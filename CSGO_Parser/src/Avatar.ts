import { Vector } from "demofile";

//These are all the attributes saved for a player
class Avatar{

    userID: number;
    teamNumber: number; // 0: Unassigned, 1: Spectator, 2: Terrorist, 3: Counter-Terrorist
    armor: number;
    // Descripton for eyeAngeles: https://guidedhacking.com/threads/aimbot-math-explained.13544/
    eyeAngeles: {pitch: number; yaw: number}; 
    health: number;
    placeName: string;
    hasC4: boolean;
    currentEquipmentValue: number;
    flashDuration: number;
    hasDefuser: boolean;
    isScoped: boolean;
    isSpotted: boolean;
    name: string;
    weapon: string | null;
    hasSpotted: boolean;
    POVPlayer: boolean;

    constructor(nUserID: number, nTeamNumber: number, nArmor: number, nEyeAngles: {pitch: number; yaw: number}, 
        nHealth: number, nPlaceName: string, nHasC4: boolean, nCurrentEquipmentValue: number, 
        nFlashDuration: number, nHasDefuser: boolean, nIsScoped: boolean, nIsSpotted: boolean, nName: string, 
        nWeapon: string | null, nHasSpotted: boolean, nPOVPlayer: boolean){
        
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
}

export {Avatar};