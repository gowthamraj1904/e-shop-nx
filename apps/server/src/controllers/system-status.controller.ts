import { NextFunction, Request, Response } from 'express';
import * as os from 'os';
import * as process from 'process';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import ApiError from '../middleware/api-error';
import BaseApiController from './base-api.controller';
import {
    IServerTimeResponse,
    IResourceUsageResponse,
    IProcessInfoResponse,
    ISystemInfoResponse
} from '../types/system-status.types';

export default class SystemStatusController extends BaseApiController {
    constructor() {
        super();
    }

    public getSystemInfo(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        try {
            const response: ISystemInfoResponse = {
                cpus: os.cpus(),
                network: os.networkInterfaces(),
                os: {
                    platform: process.platform,
                    version: os.release(),
                    totalMemory: os.totalmem(),
                    uptime: os.uptime()
                },
                currentUser: os.userInfo()
            };

            res.locals.data = response;
            // call base class method
            super.send(res);
        } catch (err) {
            next(err);
        }
    }

    public getError(req: Request, res: Response, next: NextFunction): void {
        try {
            throw new ApiError(
                ReasonPhrases.BAD_REQUEST,
                StatusCodes.BAD_REQUEST
            );
        } catch (error) {
            // from here error handler will get call
            next(error);
        }
    }

    public getServerTime(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        try {
            const now: Date = new Date();
            const utc: Date = new Date(
                now.getTime() + now.getTimezoneOffset() * 60000
            );
            const time: IServerTimeResponse = {
                utc,
                date: now
            };

            res.locals.data = time;
            super.send(res);
        } catch (error) {
            next(error);
        }
    }

    public getResourceUsage(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        try {
            const totalMem: number = os.totalmem();
            const memProc: NodeJS.MemoryUsage = process.memoryUsage();
            const freemMem: number = os.freemem();

            const response: IResourceUsageResponse = {
                processMemory: memProc,
                systemMemory: {
                    free: freemMem,
                    total: totalMem,
                    percentFree: Math.round((freemMem / totalMem) * 100)
                },
                processCpu: process.cpuUsage(),
                systemCpu: os.cpus()
            };

            res.locals.data = response;
            super.send(res);
        } catch (err) {
            next(err);
        }
    }

    public getProcessInfo(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        try {
            const response: IProcessInfoResponse = {
                procCpu: process.cpuUsage(),
                memUsage: process.memoryUsage(),
                env: process.env,
                pid: process.pid,
                uptime: process.uptime(),
                applicationVersion: process.version,
                nodeDependencyVersions: process.versions
            };

            res.locals.data = response;
            super.send(res);
        } catch (err) {
            next(err);
        }
    }
}
