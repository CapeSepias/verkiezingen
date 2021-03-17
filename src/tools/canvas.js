const draw = function(ctx, regions, settings, parties) {
    ctx.lineWidth = settings.border ? settings.border : 0.5;
    ctx.strokeStyle = '#aaa';
    for (let region of regions) {
        drawRegion(ctx, region, settings, parties);
    }
};

const drawRegion = function(ctx, region, settings, parties) {
    let alpha, factor;
    factor = 1;
    alpha = factor * region.getPercentageForParties(parties);
    if (alpha > (1 / 150)) {
        for (let path of region.paths) {
            ctx.fillStyle = '#fff';
            ctx.globalAlpha = 1;
            drawPath(ctx, path, settings);
            ctx.fillStyle = 'red';
            ctx.globalAlpha = alpha;
            drawPath(ctx, path, settings);
        }
    }
};

const drawPath = function(ctx, path, settings) {
    ctx.fill(path.storedPaths[settings.key]);
    ctx.stroke(path.storedPaths[settings.key]);
};

const addBackground = function(ctx, width, height) {
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = '#F7E9D0';
    ctx.fill();
};

export default {
    addBackground,
    draw
}