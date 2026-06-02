import { Router } from 'express';
import { MainController } from '../controller/mainController';

const router = Router();
const mainController = new MainController();

router.post('/process', (req, res) => mainController.handleProcess(req, res));

export default router;