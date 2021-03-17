import Path from "./Path";
import _Region from "./_Region";

class Municipality extends _Region{
    constructor({
        id = null,
        title = '',
        identifier = '',
        population = 0,
        paths = [],
        fusions = [],
        results = null,

        country_id = null,
        safetyRegion_code = '',
        province_code = '',
    }) {
        super();
        this.regionType = 'municipality';
        this.id = id;
        this.title = title;
        this.identifier = identifier;
        this.population = population;
        this.paths = paths.map(path => new Path(path));
        this.fusions = fusions;
        this.results = results;
        this.country_id = country_id;
        this.safetyRegion_code = safetyRegion_code;
        this.province_code = province_code;
    }
}

export default Municipality;