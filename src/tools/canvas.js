const draw = function(ctx, municipalities, settings, party) {
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#aaa';
    for (let municipality of municipalities) {
        drawMunicipality(ctx, municipality, settings, party);
    }
};

const drawMunicipality = function(ctx, municipality, settings, party) {
    // todo add color
    let color, results, alpha;

    results = (party && municipality.results) ? municipality.results[2017].votes.find(v => v.party_id === party.id) : null;
    if (results) {
        //color = party.color;
        color = 'red';
        alpha = 2 * results.votes / municipality.results[2017].validVotes;
    } else {
        color = '#fff';
        alpha = 1;
    }


    for (let path of municipality.paths) {
        ctx.fillStyle = '#fff';
        ctx.globalAlpha = 1;
        drawPath(ctx, path, settings);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
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