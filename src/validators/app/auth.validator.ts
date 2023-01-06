import { NextFunction } from 'express';
import * as Joi from 'joi';
import { validate } from '../../helpers/ValidateHelper';
import { ReqInterface, ResInterface } from '../../interfaces/req.interface';

class AuthValidator {
    async signUp(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
           name:Joi.string().required(),
           phoneNumber:Joi.number().required()
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }
    async login(req: ReqInterface, res: ResInterface, next: NextFunction) {
        const schema = Joi.object().keys({
            name:Joi.string().required(),
            phoneNumber:Joi.number().required()
        });

        const isValid = await validate(req.body, res, schema);
        if (isValid) {
            next();
        }

    }


   
}

export default new AuthValidator();