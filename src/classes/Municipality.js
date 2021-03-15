import Path from "./geo/Path";

class Municipality {
    constructor({
        id = null,
        title = '',
        population = 0,
        paths = []
    }) {
        this.id = id;
        this.title = title;
        this.population = population;
        this.paths = paths.map(path => new Path(path));

    }
}

export default Municipality;