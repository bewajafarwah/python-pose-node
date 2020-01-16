const detection = require('./detection');
const fs = require('fs');
const jpeg = require('jpeg-js');
const tf = require('@tensorflow/tfjs-node');

const NUMBER_OF_CHANNELS = 3;

function readImage(path) {
    const buf = fs.readFileSync(path);
    const pixels = jpeg.decode(buf, jpeg);
    return pixels;
}

function imageByteArray(image, numChannels) {
    const pixels = image.data;
    const numPixels = image.width * image.height;
    const values = new Int32Array(numPixels * numChannels);

    for(let i = 0; i < numPixels; i++) {
        for(let channel = 0; channel < numChannels; ++channel) {
            values[i * numChannels + channel] = pixels[i * 4 + channel];
        }
    }
    return values;
}

function imageToInput(image, numChannels) {
    const values = imageByteArray(image, numChannels);
    const outShape = [image.height, image.width, numChannels];
    const input = tf.tensor3d(values, outShape, 'int32');
    return input;
}

async function startProcess(path, name) {
    const image = readImage(path);
    const input = imageToInput(image, NUMBER_OF_CHANNELS);
    const poses = await detection.estimatePoseOnImage(input);
    fs.writeFileSync(name + '.json', JSON.stringify(poses));
    console.log(JSON.stringify(poses));
}

var pose = startProcess(process.argv[2], process.argv[3]);


//module.exports = {startProcess: startProcess};
