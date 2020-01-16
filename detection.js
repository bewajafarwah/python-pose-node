const posenet = require('@tensorflow-models/posenet');
require('@tensorflow/tfjs-node');

async function estimatePoseOnImage(image) {
    const net = await posenet.load();
    const poses = await net.estimateMultiplePoses(image, {
        flipHorizontal: false
    });
    return poses;
}

module.exports = {estimatePoseOnImage : estimatePoseOnImage};