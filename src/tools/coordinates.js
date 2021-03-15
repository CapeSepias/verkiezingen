import map from "@/data/map";


const project = function(point, settings) {
    return [getLeft(point.x, settings), getTop(point.y, settings)];
};

const getLeft = function(longitude, settings) {
    return (longitude - map.longitude) * map.stretch * settings.zoom + (0.5 * settings.width) + settings.shiftX;
};

const getTop = function(latitude, settings) {
    return (0.5 * settings.height) - (latitude - map.latitude) * settings.zoom + settings.shiftY;
};

export default {
    project
}