import _Region from "./_Region";
import Path from "./Path";

class Country extends _Region {
    constructor({
        id = null,
        title = '',
        results = null,
        paths = []
    }) {
        super();
        this.module = 'countries';
        this.regionType = 'country';
        this.id = id;
        this.title = title;
        this.results = results;
        this.paths = paths.map(path => new Path(path));
    }
}

export default Country;