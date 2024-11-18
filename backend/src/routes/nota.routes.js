import { Router } from 'express';
import * as notaCtrl from '../controllers/nota.controller';
import { verifyToken } from '../middleware/authJwt';
import { isEstudiante, isProfesor, isDirector } from '../middleware/verificarRoles';

const router = Router();

// Ver notas: estudiantes ven solo las suyas, profesores ven todas
router.get('/', [verifyToken], notaCtrl.verNotas);

// Agregar nota: solo profesores
router.post('/', [verifyToken, isProfesor], notaCtrl.agregarNota);

// Editar nota: solo directores
router.put('/:id', [verifyToken, isDirector], notaCtrl.editarNota);

// Eliminar nota: solo directores
router.delete('/:id', [verifyToken, isDirector], notaCtrl.eliminarNota);

export default router;
