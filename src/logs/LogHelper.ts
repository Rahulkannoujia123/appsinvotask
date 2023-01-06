import { LOG_EXEC_STATUS } from "./LogTypeConstant"
import LogModel from "./LogModel"
import { ResInterface } from "../interfaces/ReqInterface";

/**
     *  create success log
     * @param res response object
     * @param execTime Api execution Time
     * @returns nothing.
     */


export const logSuccess = async (
    execTime: number,
    status: number,
    res: ResInterface,
): Promise<boolean> => {
    try {
        await LogModel.create({
            method: res.method,
            execStatus: LOG_EXEC_STATUS.success,
            execTime,
            api: res.api,
            status,
            message: res.logMsg
        });

        return true;
    } catch (error) {
        return false;
    }


}

/**
     * create Error log
     * @param req request object
     * @param error error Object
     * @param status http response status code
     * @returns nothing.
     */
export const logError = async (
    req: any,
    error: any,
    status: number
): Promise<boolean> => {
    try {
        const execTime = new Date().getTime() - req.startTime;
        let data: { [key: string]: any } = {
            reqBody: req.body,
            reqParams: req.params,
            reqQuery: req.query,
            error
        };
        await LogModel.create({
            method: req.method,
            execStatus: LOG_EXEC_STATUS.error,
            api: req.originalUrl,
            status,
            execTime,
            message: 'Internal server error',
            data: JSON.stringify(data)
        });

        return true;

    } catch (error) {
        return false;
    }
}

/**
     * create Failed log
     * @param req request object
     * @param error error Object
     * @param status http response status code
     * @returns nothing.
     */
export const logFailed = async (
    req: any,
    error: any,
    status: number
) => {
    try {
        const execTime = new Date().getTime() - req.startTime;
        let data: { [key: string]: any } = {
            reqBody: req.body,
            reqParams: req.params,
            reqQuery: req.query,
            error
        };
        await LogModel.create({
            method: req.method,
            execStatus: LOG_EXEC_STATUS.failed,
            api: req.originalUrl,
            status,
            execTime,
            message: error.message,
            data: JSON.stringify(data)
        });

        return true;
    } catch (error) {
        return true;
    }
}


