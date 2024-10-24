import { Request, Response, NextFunction } from 'express';
export function logError (err : Error) {
    console.error(err)
}

export function logErrorMiddleWare (err : Error, req : Request, res : Response, next : any) {
    logError(err);
    res.status(404).send("Error Message: " +err.message);
}   

export function notFoundCatcher (req : Request, res : Response, next : NextFunction) {
    res.status(404).json({error: "Not Found.", message: "There is no such page as " + req.path});
}