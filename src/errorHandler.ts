import { Request, Response, NextFunction } from 'express';

export function notFoundCatcher (req : Request, res : Response, next : NextFunction) {
    res.status(404).json({error: "Not Found.", message: "There is no such page as " + req.path});
}