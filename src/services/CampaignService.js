'use strict';
const { Service } = require('../../system/services/Service');
const autoBind = require('auto-bind');
const { HttpResponse } = require( '../../system/helpers/HttpResponse' );



class CampaignService extends Service {
    constructor(model) {
        super(model);
        this.model = model;
        autoBind(this);
    }

    async getAll(query) {
        let { skip, limit, sortBy, department } = query;

        skip = skip ? Number(skip) : 0;
        limit = limit ? Number(limit) : 10;
        sortBy = sortBy ? sortBy : { 'createdAt': -1 };

        delete query.skip;
        delete query.limit;
        delete query.sortBy;

        // must call redis first
        console.log(query)

        try {
            const res = await this.model
                .find(query)
                .sort(sortBy)
                .skip(skip)
                .limit(limit).populate('createdBy'),
                total = await this.model.countDocuments(query);
            return new HttpResponse(res, { 'totalCount': total });
        } catch (errors) {
            console.log(errors)
            throw new Error('Có lỗi, bạn có thể thử lại sau');
        }
    }


}

module.exports = { CampaignService };
