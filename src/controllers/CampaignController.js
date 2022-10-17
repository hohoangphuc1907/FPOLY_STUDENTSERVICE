const { Controller } = require('../../system/controllers/Controller');
const autoBind = require('auto-bind');
const { CampaignService } = require('../services/CampaignService');
const { Campaign } = require('../models/Campaign');
const campaignService = new CampaignService(new Campaign().getInstance());
const config = require('../../config/config').getConfig();
const { ChangeCoursePaperService } = require('../services/ChangeCoursePaperService');
const { ChangeCoursePaper } = require('../models/ChangeCoursePaper');
const changeCoursePaperService = new ChangeCoursePaperService(new ChangeCoursePaper().getInstance());



class CampaignController extends Controller {

    constructor(service) {
        super(service);
        autoBind(this);
    }

    async insert(req, res, next) {
        try {
            const { _id } = req.user;
            const { name, time, type, department } = req.body;
            const response = await campaignService.insert({ name, time, type, department, createdBy: _id });

            return res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    }


    async delete(req, res, next) {
        const { id } = req.params;

        try {
            const papers = await changeCoursePaperService.getPaperByCampaign(id);
            if (papers.length > 0) {
                throw new Error('Không thể xóa');
            }
            const response = await this.service.delete(id);

            return res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    }



}

module.exports = new CampaignController(campaignService);
