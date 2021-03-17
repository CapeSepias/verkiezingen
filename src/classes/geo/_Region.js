import store from '@/store/store';

class _Region {
    constructor(_region) {

    }

    createResults(year) {
        let results = {};
        results[year] = {
            votes: [],
            voters: 0,
            attendance: 0,
            invalidVotes: 0,
            validVotes: 0,
            blankVotes: 0
        };
        results[year].votes = [];
        for (let region of this.regions) {
            let rr = region.results[year];

            for (let v of rr.votes) {
                let party_id, entry;
                party_id = v.party_id;
                entry = results[year].votes.find(d => d.party_id === party_id);
                if (!entry) {
                    results[year].votes.push({
                        party_id,
                        votes: v.votes
                    })
                } else {
                    entry.votes += v.votes;
                }
            }
            results[year].voters += rr.voters;
            results[year].attendance += rr.attendance;
            results[year].invalidVotes += rr.invalidVotes;
            results[year].validVotes += rr.validVotes;
            results[year].blankVotes += rr.blankVotes;
        }
        this.results = results;
    }

    get regions() {
        switch(this.regionType) {
            case 'municipality':
                return [this];
            case 'safety-region':
                return store.state.municipalities.all.filter(municipality => {
                    return municipality.safetyRegion_code === this.safetyRegion_code;
                });
            case 'province':
                return store.state.municipalities.all.filter(municipality => {
                    return municipality.province_code === this.province_code;
                });
            case 'country':
                return store.state.municipalities.all.filter(municipality => {
                    return municipality.country_id === this.id;
                });
        }
    }

    getPercentageForParties(parties) {
        let votes, results, percentage;
        votes = 0;

        if (!this.results) {
            this.createResults(2017);
        }
        results = this.results[2017].votes;
        for (let party of parties) {
            let votesForParty = results.find(v => v.party_id === party.id);
            if (votesForParty) {
                votes += votesForParty.votes;
            }
        }
        return votes / this.results[2017].validVotes;
    }

    isVisible(parties) {
        let pct = this.getPercentageForParties(parties);
        return pct > (1 / 150);
    }
}

export default _Region;