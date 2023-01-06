import * as erxpress from 'express';
import { getList } from './LogController';

export const logRoutes = erxpress.Router();
logRoutes.get('/list', getList)
