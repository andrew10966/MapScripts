// The reason for "active: false, position: [-999, -999, -999]" was because some of the things were continuing to show even though not being active
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
