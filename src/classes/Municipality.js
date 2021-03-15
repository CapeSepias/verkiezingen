import Path from "./geo/Path";

class Municipality {
    constructor({
        id = null,
        title = '',
        identifier = '',
        population = 0,
        paths = [],
        results = null
    }) {
        this.id = id;
        this.title = title;
        this.identifier = identifier;
        this.population = population;
        this.paths = paths.map(path => new Path(path));
        this.results = results;
    }
}

export default Municipality;