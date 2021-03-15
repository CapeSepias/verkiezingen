class Party {
    constructor({
        id = null,
        title = '',
        color = '#ddd'
    }) {
        this.id = id;
        this.title = title;
        this.color = color;
    }
}

export default Party;