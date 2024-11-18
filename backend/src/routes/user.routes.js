import { Router } from 'express';
import * as userCtrl from '../controllers/user.controller';
import { verifyToken } from '../middleware/authJwt';
import { isProfesor } from '../middleware/verificarRoles';

const router = Router();

router.post('/', [verifyToken, isProfesor], userCtrl.crearUsuario);

export default router;
