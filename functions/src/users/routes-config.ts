import { Application } from "express";
import { create, all, get, patch, remove } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { hasRole } from "../auth/authorized";

export function routesConfig(app: Application) {
    app.post('/users',
        isAuthenticated,
        hasRole(['admin', 'manager']),
        create
    );
    app.get('/users', [
        isAuthenticated,
        hasRole(['admin', 'manager']),
        all
    ]);
    app.get('/users/:id', [
        isAuthenticated,
        get
    ]);
    app.patch('/users/:id', [
        isAuthenticated,
        patch
    ]);
    app.delete('/users/:id', [
        isAuthenticated,
        remove
    ]);
}