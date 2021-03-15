const draw = function(ctx, municipalities, settings) {
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    for (let municipality of municipalities) {
        drawMunicipality(ctx, municipality, settings);
    }
};

const drawMunicipality = function(ctx, municipality,settings ) {
    // todo add color
    ctx.fillStyle = '#ddd';
    ctx.globalAlpha = 1;

    for (let path of municipality.paths) {
        drawPath(ctx, path, settings);
    }
};

const drawPath = function(ctx, path, settings) {
    if (!path.storedPaths[settings.key]) {
        path.create(settings);
    }
    if (settings.fill) {
        ctx.fill(path.storedPaths[settings.key]);
    }
    if (!settings.hideStroke) {
        ctx.stroke(path.storedPaths[settings.key]);
    }
};

const addBackground = function(ctx, width, height) {
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = '#f5eedc';
    ctx.fill();
};

export default {
    addBackground,
    draw
}