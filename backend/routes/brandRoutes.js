import express from 'express';
import { getBrands,createBrand } from '../controllers/brandController.js';

const router = express.Router();

router.get('/get', getBrands); // GET /brands
router.post('/create', createBrand); // POST /brands
export default router;
