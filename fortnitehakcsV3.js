"use strict";

const fs = require("fs");

const INPUT = "ExpertStandard.dat";
const OUTPUT = "ExpertPlusStandard.dat";

let difficulty = JSON.parse(fs.readFileSync(INPUT));

if (!fs.existsSync("GovernmentFiles.txt")) {
  fs.writeFileSync("GovernmentFiles.txt", parseInt("0").toString());
}
let count = parseInt(fs.readFileSync("GovernmentFiles.txt"));
count++;
fs.writeFileSync("GovernmentFiles.txt", count.toString());
console.log("GIVE IT UP FOR RUN " + count);



difficulty.customData = { 
  materials: {}, 
  pointDefinitions: {}, 
  environment: [], 
  customEvents: [], 
  fakeColorNotes: [], 
  fakeBombNotes: [], 
  fakeObstacles: [], 
  fakeBurstSliders: [] 
};



const customData = difficulty.customData;
const obstacles = difficulty.obstacles;
const notes = difficulty.colorNotes; 
const burstSliders = difficulty.burstSliders; 
const sliders = difficulty.sliders; 
const bombs = difficulty.bombNotes; 
const events = difficulty.basicBeatmapEvents;
const customEvents = customData.customEvents;
const pointDefinitions = customData.pointDefinitions;
const environment = customData.environment;
const geometry = customData.environment.geometry;
const materials = customData.materials;
const fakeNotes = customData.fakeColorNotes;
const fakeBombs = customData.fakeBombNotes;
const fakeObstacles  = customData.fakeObstacles;
const fakeBurstSliders = customData.fakeBurstSliders;

let filterednotes;
let filteredSliders;
let filteredburstSliders;
let filteredevents;
let filteredobstacles;
let filteredbombs;

obstacles.forEach(wall => {
  if (!wall.customData) {
    wall.customData = {};
  }
});

notes.forEach(note => {
  if (!note.customData) {
    note.customData = {};
  }
});

bombs.forEach(bomb => {
  if (!bomb.customData) {
    bomb.customData = {};
  }
});

sliders.forEach(slider => {
  if (!slider.customData) {
    slider.customData = {};
  }
});

burstSliders.forEach(burstSlider => {
  if (!burstSlider.customData) {
    burstSlider.customData = {};
  }
});

if (!environment.geometry) {
  environment.geometry = {};
}


const Shader = {
  Standard: "Standard",
  OpaqueLight: "OpaqueLight",
  TransparentLight: "TransparentLight",
  InterscopeCar: "InterscopeCar",
  InterscopeConcrete: "InterscopeConcrete"
}

const Shape = {
  Sphere : "Sphere",
  Cube : "Cube",
  Cylinder : "Cylinder",
  Capsule : "Capsule",
  Plane : "Plane",
  Quad : "Quad",
  Triangle : "Triangle",
}

const IEnvironment = {
  id : "",
  lookupMethod : "",
  components : "",
  duplicate : "",
  active : "",
  scale : "",
  position : "",
  localPosition : "",
  rotation : "",
  localRotation : "",
  track : "",
};

const IMaterial = {
  name : "",
  color : [0, 0, 0],
  shader : Shader.Standard | Shader.OpaqueLight | Shader.TransparentLight | Shader.InterscopeCar | Shader.InterscopeConcrete,
  shaderKeywords : ""
}

class Material {
  /**
   * Makes a new material and pushes it to the map.
   * ```ts	
   * new Material({
   *     name: string,
   *     color: [number, number, number],
   *     shader: Shader.[Standard | OpaqueLight | TransparentLight],
   *     shaderKeywords: string[]
   * });
   * ```
   */
  constructor(material = IMaterial) {
      this.name = material.name;
      this.color = material.color;
      this.shader = material.shader;
      this.shaderKeywords = material.shaderKeywords;

      this.#push();
  }

  #push() {
      const mat = {
          [this.name]: {
              color: this.color,
              shader: this.shader,
              track: this.track,
              shaderKeywords: this.shaderKeywords,
          }
      }
      if (this.shaderKeywords === "") {
          delete this.shaderKeywords;
      }
      Object.assign(materials, mat);
  }
}

class Environment {
  /**
   * Creates a new Environment object.
   * ```ts
   * new Geometry({
   *     id: string,
   *     lookupMethod: string,
   *     components: string,
   *     duplicate: string,
   *     active: string,
   *     scale: [number, number, number],
   *     position: [number, number, number],
   *     localPosition: [number, number, number],
   *     rotation: [number, number, number],
   *     localRotation: [number, number, number],
   *     track: string,
   * });
   * ```
   */
  constructor(environment = IEnvironment) {
      this.id = environment.id;
      this.lookupMethod = environment.lookupMethod;
      this.components = environment.components;
      this.duplicate = environment.duplicate;
      this.active = environment.active;
      this.scale = environment.scale;
      this.position = environment.position;
      this.localPosition = environment.localPosition;
      this.rotation = environment.rotation;
      this.localRotation = environment.localRotation;
      this.track = environment.track;

      this.#push();
  }

  #push() {
      for (let i of Object.keys(this)) {
          if (this[i] === "") {
              delete this[i]
          }
      }
      if (typeof this.id !== 'undefined' && this.id !== null && typeof this.id !== 'string') {
          this.id = this.id.toString();
          this.id = this.id.replace(/\/(.+)\//g, "$1");
      }
      environment.push({
          id: this.id,
          lookupMethod: this.lookupMethod,
          components: this.components,
          duplicate: this.duplicate,
          active: this.active,
          scale: this.scale,
          position: this.position,
          localPosition: this.localPosition,
          rotation: this.rotation,
          localRotation: this.localRotation,
          track: this.track
      });
  }
}

class Geometry {
  /**
   * Creates a new Geometry object.
   * ```ts
   * new Geometry({
   *     type: string,
   *     material: Shader.[Standard | OpaqueLight | TransparentLight]
   * }, {
   *     id: string,
   *     lookupMethod: string,
   *     components: string,
   *     duplicate: string,
   *     active: string,
   *     scale: [number, number, number],
   *     position: [number, number, number],
   *     localPosition: [number, number, number],
   *     rotation: [number, number, number],
   *     localRotation: [number, number, number],
   *     track: string,
   * });
   * ```
   */
  constructor(geometry = {
      type : "",
      material : "",
      collision : ""
  }, environment = IEnvironment) {
      this.id = environment.id;
      this.lookupMethod = environment.lookupMethod;
      this.components = environment.components;
      this.duplicate = environment.duplicate;
      this.active = environment.active;
      this.scale = environment.scale;
      this.position = environment.position;
      this.localPosition = environment.localPosition;
      this.rotation = environment.rotation;
      this.localRotation = environment.localRotation;
      this.track = environment.track;
      this.geometry = {
          type: geometry.type,
          material: geometry.material,
          collision: geometry.collision
      }
      this.#push();
  }

  #push() {
      for (let i of Object.keys(this)) {
          if (this[i] === "") {
              delete this[i]
          }
      }
      if (typeof this.id !== 'undefined' && this.id !== null && typeof this.id !== 'string') {
          this.id = this.id.toString();
          this.id = this.id.replace(/\/(.+)\//g, "$1");
      }
      environment.push({
          id: this.id,
          lookupMethod: this.lookupMethod,
          components: this.components,
          duplicate: this.duplicate,
          active: this.active,
          scale: this.scale,
          position: this.position,
          localPosition: this.localPosition,
          rotation: this.rotation,
          localRotation: this.localRotation,
          track: this.track,
          geometry: this.geometry
      });
  }
}

class AnimateTrack {
  constructor(time, data) {
      this.b = time;
      this.t = "AnimateTrack";
      this.d = data;
      customEvents.push(this);
  }
}
class AssignPlayerToTrack {
  constructor(time, track, object) {
      this.b = time;
      this.t = "AssignPlayerToTrack";
      this.d = {
          track: track,
          target: object
      }
      customEvents.push(this);
  }
}
class AssignTrackParent {
  constructor(time, childrenTracks, parentTrack) {
      this.b = time;
      this.t = "AssignTrackParent";
      this.d = {
          childrenTracks: childrenTracks,
          parentTrack: parentTrack
      }
      customEvents.push(this);
  }
}
class Wall {
  constructor(time, duration, data) {
      this.b = time;
      this.t = 1;
      this.w = 1;
      this.x = 0;
      this.d = duration;
      this.customData = data;
      obstacles.push(this);
  }
}
class Note {
  constructor(time, x, y, type, direction, data) {
      this.b = time;
      this.x = x;
      this.y = y;
      this.c = type;
      this.d = direction;
      this.customData = data;
      notes.push(this);
  }
}


const ease = {
  InSine: "easeInSine",
  OutSine: "easeOutSine",
  InOutSine: "easeInOutSine",
  InQuad: "easeInQuad",
  OutQuad: "easeOutQuad",
  InOutQuad: "easeInOutQuad",
  InCubic: "easeInCubic",
  OutCubic: "easeOutCubic",
  InOutCubic: "easeInOutCubic",
  InQuart: "easeInQuart",
  OutQuart: "easeOutQuart",
  InOutQuart: "easeInOutQuart",
  InQuint: "easeInQuint",
  OutQuint: "easeOutQuint",
  InOutQuint: "easeInOutQuint",
  InExpo: "easeInExpo",
  OutExpo: "easeOutExpo",
  InOutExpo: "easeInOutExpo",
  InCirc: "easeInCirc",
  OutCirc: "easeOutCirc",
  InOutCirc: "easeInOutCirc",
  InBack: "easeInBack",
  OutBack: "easeOutBack",
  InOutBack: "easeInOutBack",
  InElastic: "easeInElastic",
  OutElastic: "easeOutElastic",
  InOutElastic: "easeInOutElastic",
  InBounce: "easeInBounce",
  OutBounce: "easeOutBounce",
  InOutBounce: "easeInOutBounce",
  splineCatmullRom: "splineCatmullRom",
}
const easingNames = Object.values(ease)

function filterNotes(start, end, type) {
  filterednotes = notes.filter(n => n.b >= start && n.b <= end);
  if (typeof type !== 'undefined' && type !== null)
      filterednotes = filterednotes.filter(n1 => n1.c == type);
  return filterednotes;
}
function filterChains(start, end, type) {
  filteredburstSliders = burstSliders.filter(n => n.b >= start && n.b <= end);
  if (typeof type !== 'undefined' && type !== null)
      filteredburstSliders = filteredburstSliders.filter(n1 => n1.c == type);
  return filteredburstSliders;
}

function random(min, max, precision = 1) {
  if (precision === 1) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  } else {
    const factor = 1 / precision;
    const adjustedMin = min * factor;
    const adjustedMax = max * factor;

    const randomNum = Math.floor(Math.random() * (adjustedMax + 1 - adjustedMin)) + adjustedMin;
    return randomNum / factor;
  }
}

function awnfiuoabgtpa(leng) {
  data.track = this
  data.noteJumpStartBeatOffset = this
  data.noteJumpMovementSpeed = this
  data.flip = this
  data.spawnEffect = this
  data.disableNoteGravity = this
  data.disableNoteLook = this
  data.uninteractable = this
  data.coordinates = this
  data.worldRotation = this
  data.localRotation = this
  data.color = this
  anim.offsetPosition = this
  anim.offsetWorldRotation = this
  anim.scale = this
  anim.dissolveArrow = this
  anim.interactable = this
}



//#endregion




//#region                       -  -  -  -  -  -  -  -  -  -  -  -  -  DO YOUR DIRTY WORK HERE  -  -  -  -  -  -  -  -  -  -  -  -  -


const infoFilePath = "info.dat";
const infoData = JSON.parse(fs.readFileSync(infoFilePath));
infoData._difficultyBeatmapSets.forEach(difficultyBeatmapSet => {
    if (difficultyBeatmapSet._difficultyBeatmaps) {
        difficultyBeatmapSet._difficultyBeatmaps.forEach(beatmap => {
            if (beatmap._customData) {
              delete beatmap._customData._requirements;
              delete beatmap._customData._suggestions;
              beatmap._customData._requirements = ["Chroma"];
              beatmap._customData._settings = {
                "_playerOptions": {
                  "_hideNoteSpawnEffect": true,
                  "_environmentEffectsFilterDefaultPreset": "AllEffects",
                  "_environmentEffectsFilterExpertPlusPreset": "AllEffects",
                },
                "_environments": {
                  "_overrideEnvironments": false
                },
                "_graphics": {
                  "_mirrorGraphicsSettings": 3,
                  "_mainEffectGraphicsSettings": 1,
                  "_smokeGraphicsSettings": 1,
                  "_screenDisplacementEffectsEnabled": true,
                  "_maxShockwaveParticles": 0,
                },
                "_chroma": {
                  "_disableChromaEvents": false,
                  "_disableEnvironmentEnhancements": false,
                  "_disableNoteColoring": false,
                  "_forceZenModeWalls": false
                },

              };
            }
        });
    }
});
fs.writeFileSync(infoFilePath, JSON.stringify(infoData, null, 2));


//                                     -  -  -  -  -  -  -  -  -  -  -  -  -  VIVIFY SHIT  -  -  -  -  -  -  -  -  -  -  -  -  -









//                                     -  -  -  -  -  -  -  -  -  -  -  -  -  STOP VIVIFY SHIT  -  -  -  -  -  -  -  -  -  -  -  -  -



// #region                        -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ENVIRONMENT  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

environment.push(
  {id: ".[0]Environment", lookupMethod: "EndsWith", components: {BloomFogEnvironment: {attenuation: 0.0001, height: 7.5, startY: -30}}},
  {id: "Spectrograms", lookupMethod: "Contains", active: false},
  {id: "DoubleColorLaser", lookupMethod: "Contains", active: false},
  {id: "Construction", lookupMethod: "Contains", active: false},
  {id: "NearBuilding", lookupMethod: "Contains", active: false},
  {id: "Lasers", lookupMethod: "Contains", active: false},
  {id: "Directional", lookupMethod: "Contains", active: false},
  {id: "Dust", lookupMethod: "Contains", active: false},
  {id: "GameCore\\.\\[\\d*\\]BigTrackLaneRing\\(Clone\\)", lookupMethod: "Regex", active: false, position: [-999, -999, -999]},
  {id: "FrontLights", lookupMethod: "Contains", active: false},
  {id: "BackColumns", lookupMethod: "Contains", active: true, track: "Columns", localRotation: [0, 180, 0], position: [0, 0, 20]},
  {id: "BackColumnNeon", lookupMethod: "Contains", active: false, position: [-999, -999, -999]},
  {id: "Floor", lookupMethod: "Contains", active: true, scale: [0.2, 1, 1], position: [0, 0.01, 8]}
)
new AnimateTrack(194, {track: "Columns", duration: 14, position: [[0, 0, 20,0],[0,-100,-100,1]]})

new Material({name: "ST", color: [0,0,0], shader: Shader.Standard})
new Material({name: "OL", shader: Shader.OpaqueLight})
new Material({name: "TL", shader: Shader.TransparentLight})

//Chevron/FrontLights
new Geometry({type: Shape.Cube, material: "TL"}, {track: "FLL", position: [-0.57,4,20], scale: [1.5,0.15,0.2], localRotation: [0,0,35], components: {ILightWithId: {lightID: 58,type: 4}}})
new Geometry({type: Shape.Cube, material: "TL"}, {track: "FLR", position: [0.57,4,20], scale: [1.5,0.15,0.2], localRotation: [0,0,-35], components: {ILightWithId: {lightID: 59,type: 4}}})
new AnimateTrack(187, {track: "FLR", duration: 6, localRotation: [[0,0,-35,0],[0,0,35,1]]})
new AnimateTrack(187, {track: "FLL", duration: 6, localRotation: [[0,0,35,0],[0,0,-35,1]]})

new AnimateTrack(289, {track: "FLR", duration: 17, localRotation: [[0,0,35,0],[0,0,random(0,359),0.1],[0,0,random(0,359),0.2],[0,0,random(0,359),0.3],[0,0,random(0,359),0.4],[0,0,random(0,359),0.5],[0,0,random(0,359),0.6],[0,0,random(0,359),0.7],[0,0,random(0,359),0.8],[0,0,random(0,359),0.9],[0,0,random(0,359),1]]})
new AnimateTrack(289, {track: "FLL", duration: 17, localRotation: [[0,0,-35,0],[0,0,random(0,359),0.1],[0,0,random(0,359),0.2],[0,0,random(0,359),0.3],[0,0,random(0,359),0.4],[0,0,random(0,359),0.5],[0,0,random(0,359),0.6],[0,0,random(0,359),0.7],[0,0,random(0,359),0.8],[0,0,random(0,359),0.9],[0,0,random(0,359),1]]})

//Path/track
new Geometry({type: Shape.Cube, material: "ST"}, {track: "path", position: [0,-50,258], scale: [3,100,500]})
new Geometry({type: Shape.Cube, material: "OL"}, {track: "pathLightLeft", position: [-1.5,0,258], scale: [0.25,0.25,500], components: {ILightWithId: {lightID: 20,type: 0}}})
new Geometry({type: Shape.Cube, material: "OL"}, {track: "pathLightRight", position: [1.5,0,258], scale: [0.25,0.25,500], components: {ILightWithId: {lightID: 21,type: 0}}})
new Geometry({type: Shape.Cube, material: "OL"}, {track: "pathLightFront", position: [0,0,8], scale: [3.25,0.25,0.25], components: {ILightWithId: {lightID: 22,type: 0}}})

//Lasers
for (var i = 0; i < 5; i++) {new Geometry({type: Shape.Cylinder, material: "TL"}, {track: "rightLaser" +i, position: [10,0,i*10 +20], scale: [0.15,500,0.15], localRotation: [i*-10 +60,90,20], components: {ILightWithId: {lightID: 110 +i,type: 3}}})}
for (var i = 0; i < 5; i++) {new Geometry({type: Shape.Cylinder, material: "TL"}, {track: "leftLaser" +i, position: [-10,0,i*10 +20], scale: [0.15,500,0.15], localRotation: [i*+10 -60,90,20], components: {ILightWithId: {lightID: 110 +i,type: 2}}})}

//Rings
for (var i = 0; i < 20; i++) {new Geometry({type: Shape.Cube, material: "TL"}, {track: "ringBottom" +i, position: [0,i*+0.5 -10,i*3 +5], scale: [i*-1 +20.15,0.15,0.15], components: {ILightWithId: {lightID: 40 +i,type: 0}}})}
for (var i = 0; i < 20; i++) {new Geometry({type: Shape.Cube, material: "TL"}, {track: "ringTop" +i, position: [0,i*-0.5 +10,i*3 +5], scale: [i*-1 +20.15,0.15,0.15], components: {ILightWithId: {lightID: 70 +i,type: 0}}})}
for (var i = 0; i < 20; i++) {new Geometry({type: Shape.Cube, material: "TL"}, {track: "ringRight" +i, position: [i*-0.5 +10,0,i*3 +5], scale: [0.15,i*-1 +20,0.15], components: {ILightWithId: {lightID: 100 +i,type: 0}}})}
for (var i = 0; i < 20; i++) {new Geometry({type: Shape.Cube, material: "TL"}, {track: "ringLeft" +i, position: [i*0.5 -10,0,i*3 +5], scale: [0.15,i*-1 +20,0.15], components: {ILightWithId: {lightID: 130 +i,type: 0}}})}

//Side lasers
for (var i = 0; i < 4; i++) {new Geometry({type: Shape.Cylinder, material: "TL"}, {track: "pathLightSideLeft" +i, position: [-3,i*1 -1.5,0], scale: [0.15,500,0.15], localRotation: [90,0,0], components: {ILightWithId: {lightID: 60 +i,type: 4}}})}
for (var i = 0; i < 4; i++) {new Geometry({type: Shape.Cylinder, material: "TL"}, {track: "pathLightSideRight" +i, position: [3,i*1 -1.5,0], scale: [0.15,500,0.15], localRotation: [90,0,0], components: {ILightWithId: {lightID: 63 +i,type: 4}}})}


// #endregion                     -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  STOP  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
//#region write file
const precision = 6; //decimals to round to  --- use this for better wall precision or to try and decrease JSON file size
const jsonP = Math.pow(10, precision);
const sortP = Math.pow(10, 2);

function deeperDaddy(obj) {
  if (obj)
    for (const key in obj) {
      if (obj[key] == null) {
        delete obj[key];
      } else if (typeof obj[key] === "object" || Array.isArray(obj[key])) {
        deeperDaddy(obj[key]);
      } else if (typeof obj[key] == "number") {
        obj[key] = parseFloat(
          Math.round((obj[key] + Number.EPSILON) * jsonP) / jsonP
        );
      }
    }
}
deeperDaddy(difficulty);

difficulty.colorNotes.sort(
  (a, b) =>
    parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.x + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.x + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.y + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.y + Number.EPSILON) * sortP) / sortP)
);
difficulty.customData.fakeColorNotes.sort(
  (a, b) =>
    parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.x + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.x + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.y + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.y + Number.EPSILON) * sortP) / sortP)
);

difficulty.bombNotes.sort(
  (a, b) =>
    parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.x + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.x + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.y + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.y + Number.EPSILON) * sortP) / sortP)
);
difficulty.customData.fakeBombNotes.sort(
  (a, b) =>
    parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.x + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.x + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.y + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.y + Number.EPSILON) * sortP) / sortP)
);

difficulty.sliders.sort(
  (a, b) =>
    parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.x + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.x + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.y + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.y + Number.EPSILON) * sortP) / sortP)
);

difficulty.burstSliders.sort(
  (a, b) =>
    parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.x + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.x + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.y + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.y + Number.EPSILON) * sortP) / sortP)
);
difficulty.customData.fakeBurstSliders.sort(
  (a, b) =>
    parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.x + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.x + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.y + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.y + Number.EPSILON) * sortP) / sortP)
);

difficulty.customData.customEvents.sort(
  (a, b) =>
    parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.x + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.x + Number.EPSILON) * sortP) / sortP) ||
    parseFloat(Math.round((a.y + Number.EPSILON) * sortP) / sortP) -
      parseFloat(Math.round((b.y + Number.EPSILON) * sortP) / sortP)
);

difficulty.obstacles.sort((a, b) => a.b- b.b);
difficulty.basicBeatmapEvents.sort((a, b) => a.b - b.b);

fs.writeFileSync(OUTPUT, JSON.stringify(difficulty, null, 0));

//#endregion