//Source: https://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js [29.04.2021]
//Source: https://github.com/saul/demofile/discussions/292 [29.04.2021]
/*
* This programm parses a pov demo file of CS:GO and saves the user input as well as some
* player data for every frame in a JSON file.
*/

import * as assert from 'assert';
import { DemoFile, Weapon} from 'demofile';
import * as fs from 'fs';
import { Avatar } from './Avatar';
import Config from './Config';
import { InputFrame } from './InputFrame';
import { PlayerFrame } from './PlayerFrame';

const demoFile = new DemoFile();

var tickDifference = 38200;
var mouseDeltaX = 0;
var mouseDeltaY = 0;

//Saves the input data
var dataInput: InputFrame[];
dataInput = [];
//Saves the player data
var dataPlayer: PlayerFrame[];
dataPlayer = [];

//Controlling of the Parsing
//Saves the recording start and end points
var dataGame: String[];
dataGame = [];
//Saves the recorded ticks of the input data
var ticksInput: Number[];
ticksInput = [];
//Saves the recorded ticks of the game data
var ticksPlayer: Number[];
ticksPlayer = [];

var record: boolean;
record = false;

//Set the listeners and parse throught the demo
function parseDemoFile(path: string) {
  fs.readFile(path, (err, buffer) => {
    assert.ifError(err);

    //Sets the recording to false at the end of the round 
    //also used to correct the tick differences after every round if needed
    demoFile.gameEvents.on('round_end', e => {
      record = false;
      dataGame.push('round_end: ' + demoFile.currentTick);
      if(demoFile.currentTick == 58622) tickDifference --;
      if(demoFile.currentTick == 99396) tickDifference ++;
      if(demoFile.currentTick == 147444) tickDifference --;
      if(demoFile.currentTick == 227330) tickDifference --;
    })

    //Pauses the recording after the POV player died
    demoFile.gameEvents.on('player_death', e => {
      //console.log(e)
      if(e.userid !== Config.POV_PLAYER_ID) return;
      record = false;
      dataGame.push('player_death: ' + demoFile.currentTick);
    })

    //Starts recording at the beginning of a round
    demoFile.gameEvents.on('cs_round_final_beep', e => {
      //Starts recording in the first round
      if(demoFile.currentTick <= 10940) return;
      // Stops recording before victory screen
      if(demoFile.currentTick >= 248367) return;
      record = true;
      dataGame.push('cs_round_final_beep: ' + demoFile.currentTick);
    })

    //records the user input during a round
    demoFile.on('usercmd', usercmd => {

      if(!record) return;
      
      let inputFrame: InputFrame;

      //tick recording for 128fps demos
      if((usercmd.tickCount - tickDifference) % 2 == 0){
        //even ticks saving the data
        mouseDeltaX += usercmd.mouseDeltaX;
        mouseDeltaY += usercmd.mouseDeltaY;

        inputFrame = new InputFrame(usercmd.tickCount - tickDifference, usercmd.buttons, mouseDeltaX, mouseDeltaY);

        dataInput.push(inputFrame);
        ticksInput.push(usercmd.tickCount - tickDifference);

        mouseDeltaX = 0;
        mouseDeltaY = 0;
      } else {
        //odd ticks saving the mouse input
        mouseDeltaX = usercmd.mouseDeltaX;
        mouseDeltaY = usercmd.mouseDeltaY;
      }

      //tick recording for 64fps demos
      /*
      mouseDeltaX = usercmd.mouseDeltaX;
      mouseDeltaY = usercmd.mouseDeltaY;
      inputFrame = new InputFrame(usercmd.tickCount - tickDifference, usercmd.buttons, mouseDeltaX, mouseDeltaY);
      dataInput.push(inputFrame);
      ticksInput.push(usercmd.tickCount - tickDifference);
      */
    });

    //Saving the game data
    demoFile.on('tickend', e =>{

      if(!record) return;
      //for 128fps demos to record the even tick; comment out for 64fps demos
      if(demoFile.currentTick % 2 == 1) return;

      let avatar: Avatar;
      let playerFrame: PlayerFrame;
      let weapon: string | null;
      let hasSpotted: boolean;
      let POVPlayer: boolean;

      playerFrame = new PlayerFrame(e);
      
      demoFile.players.forEach(element => {
        if(element.name != 'GOTV'){

          weapon = getWeapon(element.weapon);
          hasSpotted = getHasSpotted(element.allSpotted.length);
          POVPlayer = getPOVPlayer(element.userId);

          avatar = new Avatar(element.userId, element.teamNumber, element.armor, element.eyeAngles, element.health, 
            element.placeName, element.hasC4, element.currentEquipmentValue, element.flashDuration, 
            element.hasDefuser, element.isScoped, element.isSpotted, element.name, weapon, hasSpotted, POVPlayer);

          playerFrame.addPlayerData(avatar);
        }
      });
      dataPlayer.push(playerFrame);
      ticksPlayer.push(e);
    });

    //manages the end of the dem file
    //starts writing the JSON
    demoFile.on('end', e => {
      if (e.error) {
        console.error('Error during parsing:', e.error);
        process.exitCode = 1;
      }

      writeJSON();
      console.log('Finished.');
    });

    //Start parsing the buffer now that we've added our event listeners
    demoFile.parse(buffer);
  });
}

//gets the name of the weapon from the weapon class
function getWeapon(nWeapon: Weapon | null){
  if(nWeapon != null){
    return nWeapon.className;
  } 
  return null;
}

//tests if the pov player has spotted an opponent
function getHasSpotted(nSpotted: number){
  return nSpotted !== 0;
}

//tests if the player is the POV player
function getPOVPlayer(nID: number){
  return nID == Config.POV_PLAYER_ID;
}

//Writes the JSON out of the saved data
function writeJSON(){
  fs.writeFile(Config.INPUT_DATA_NAME, JSON.stringify(dataInput, null, ' '), function(err){
    if (err) throw err;
    console.log('complete frame');
    }
  );
  fs.writeFile(Config.PLAYER_DATA_NAME, JSON.stringify(dataPlayer, null, ' '), function(err){
    if (err) throw err;
    console.log('complete player');
    }
  );
  fs.writeFile(Config.GAME_DATA_NAME, JSON.stringify(dataGame, null, ' '), function(err){
    if (err) throw err;
    console.log('complete game');
    }
  );
  fs.writeFile(Config.INPUT_TICKS_NAME, JSON.stringify(ticksInput, null, ' '), function(err){
    if (err) throw err;
    console.log('complete ticks input')
    }
  );
  fs.writeFile(Config.PLAYER_TICKS_NAME, JSON.stringify(ticksPlayer, null, ' '), function(err){
    if (err) throw err;
    console.log('complete ticks player')
    }
  );
}

parseDemoFile('src\\cs11.dem');
