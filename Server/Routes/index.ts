import express from 'express';
const router = express.Router();

//import controller module
import {DisplayHomePage, DisplayMySurveyList} from "../Controllers/index";

/* Display home page. */
router.get('/', DisplayHomePage);

/* Display home page. */
router.get('/home', DisplayHomePage);

router.get('/mysurvey', DisplayMySurveyList);
router.post('/mysurvey', DisplayMySurveyList);

export default router;