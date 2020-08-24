res = {
  flap_png: "res/Flap.png",
  grass_png: "res/Grass.png",
  start_png: "res/Start.png",
  startSelected_png: "res/StartSelected.png",
  upColumn_png: "res/UpColumn.png",
  downColumn_png: "res/DownColumn.png",
  death_png: "res/Death.png",
  fall_png: "res/Fall.png",
  sky_png: "res/Sky.png",
//  downFlap_png: "res/downflap.png",
//  midFlap_png: "res/midflap.png",
//  upFlap_png: "res/upflap.png"
//  sound_die: "res/die.wav",
//  sound_hit: "res/hit.wav",
//  sound_point: "res/point.wav",
//  sound_swoosh: "res/swoosh.wav",
//  sound_wing: "res/wing.wav"

};

g_resources = [];

for (var i in res) {
  g_resources.push(res[i]);
}