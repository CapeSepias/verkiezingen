const draw = function(ctx, municipalities, settings, parties) {
    ctx.lineWidth = settings.border ? settings.border : 0.5;
    ctx.strokeStyle = '#aaa';
    for (let municipality of municipalities) {
        drawMunicipality(ctx, municipality, settings, parties);
    }
};

const drawMunicipality = function(ctx, municipality, settings, parties) {
    // todo add color
    let color, results, alpha, votes, percentage;
    votes = 0;


    if (municipality.results) {
        results = municipality.results[2017].votes;
        for (let party of parties) {
            let votesForParty = results.find(v => v.party_id === party.id);
            if (votesForParty) {
                votes += votesForParty.votes;
            }
        }
        percentage = votes / municipality.results[2017].validVotes;
        color = 'red';
        alpha = 1 * percentage;
    } else {
        color = '#555';
        alpha = 1;
    }



    if (alpha > (1 / 150)) {
        for (let path of municipality.paths) {
            ctx.fillStyle = '#fff';
            ctx.globalAlpha = 1;
            drawPath(ctx, path, settings);
            ctx.fillStyle = color;
            ctx.globalAlpha = alpha;
            drawPath(ctx, path, settings);
        }
    }

};

const drawPath = function(ctx, path, settings) {
    if (!path.storedPaths[settings.key]) {
        path.create(settings);
    }
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