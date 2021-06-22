import { Router } from 'express';
import CreateGiftCardService from '../services/CreateGiftCardService';

const giftcardsRouter = Router();

giftcardsRouter.post('/', async (request, response) => {
  try {
    const {
      giftcard_number,
      giftcard_password,
      giftcard_validated,
      giftcard_message,
    } = request.body;

    const createGiftCard = new CreateGiftCardService();

    const giftCard = await createGiftCard.execute({
      giftcard_number,
      giftcard_password,
      giftcard_validated,
      giftcard_message,
    });

    // @ts-expect-error
    delete giftCard.giftcard_password;

    return response.json(giftCard);
  } catch (err) {
    return response.status(400).json({
      error: err.message
    });
  }
});

export default giftcardsRouter;
