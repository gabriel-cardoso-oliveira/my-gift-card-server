import { Router } from 'express';
import AuthenticateServices from '../services/AuthenticateServices';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { giftcard_number, giftcard_password } = request.body;

    const authenticate = new AuthenticateServices();

    const { giftCard, token } = await authenticate.execute({
      giftcard_number,
      giftcard_password,
    });

    // @ts-expect-error
    delete giftCard.giftcard_password;

    return response.json({
      giftCard,
      token,
    });
  } catch (err) {
    return response.status(400).json({
      error: err.message
    });
  }
});

export default sessionsRouter;
