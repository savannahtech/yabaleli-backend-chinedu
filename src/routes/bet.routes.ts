import { Router } from 'express';
import { use } from '../shared/utils/errors';
import { createUserBet, getUserBets } from '../modules/bets/bet.controller';


const router = Router();

router.get('/', use(getUserBets));
router.post('/create', use(createUserBet));


export default router;
