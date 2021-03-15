class Party {
    constructor({
        id = null,
        title = '',
        colname = '',
        color = '#000'
    }) {
        this.id = id;
        this.title = title;
        this.colname = colname;
        this.color = color;
    }
}

export default Party;