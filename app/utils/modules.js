import app from '../models/app.js';
import task from '../models/task.js';
import example from '../models/example.js';
export function registerModels(appOp) {
    appOp.model(app);
    appOp.model(task);
    appOp.model(example);
}