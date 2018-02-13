const Raycaster = {
  getType: () => "simple",
  getRayOrigin: () => [0, 0, 0],
  getRayDirection: () => [0, 0, -1],
  drawsCursor: () => true
};

module.exports = Raycaster;