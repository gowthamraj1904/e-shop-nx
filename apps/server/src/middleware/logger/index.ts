import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { existsSync, appendFile } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import * as path from 'path';

const getProcessingTimeInMS = (time: [number, number]): string => {
    return `${(time[0] * 1000 + time[1] / 1e6).toFixed(2)}ms`;
};

function getTimestamp(): string {
    // get timestamp
    const now: Date = new Date();
    const timestamp: string = [
        now.getMonth() + 1,
        '-',
        now.getDate(),
        '-',
        now.getFullYear(),
        ' ',
        now.getHours(),
        ':',
        now.getMinutes(),
        ':',
        now.getSeconds()
    ].join('');

    return timestamp;
}

async function appendLogToFile(logText: string): Promise<void> {
    const currentDate: string = new Date().toJSON().slice(0, 10);
    const logsDirectory: string = path.join(__dirname, 'logs');
    const logFile: string = path.join(__dirname, 'logs', `${currentDate}.txt`);

    if (!existsSync(logsDirectory)) {
        await mkdir(logsDirectory);
    }

    appendFile(logFile, logText, (error: NodeJS.ErrnoException): void => {
        if (error) throw error;
    });
}

function logger(req: Request, res: Response, next: NextFunction): void {
    // generate unique identifier
    const id: string = uuidv4();
    // get api endpoint
    const { method, url }: { method: string; url: string } = req;
    // log start of the execution process
    const start: [number, number] = process.hrtime();
    const startText: string = `START:${getProcessingTimeInMS(start)}`;
    const idText: string = `[${id}]`;
    const timeStampText: string = `[${getTimestamp()}]`;

    // trigger once a response is sent to the client
    res.once('finish', async (): Promise<void> => {
        // log end of the execution process
        const end: [number, number] = process.hrtime(start);
        const endText: string = `END:${getProcessingTimeInMS(end)}`;
        const logText: string = `${idText}${timeStampText} ${method}:${url} ${res.statusCode} ${startText} ${endText}\n`;

        await appendLogToFile(logText);
    });

    // execute next middleware/event handler
    next();
}

export { logger };
