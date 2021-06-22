import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import GiftCard from '../models/GiftCard';

interface Request {
  giftcard_number: Number;
  giftcard_password: string;
  giftcard_validated: Date;
  giftcard_message: string;
}

class CreateGiftCardService {
  public async execute({
    giftcard_number,
    giftcard_password,
    giftcard_validated,
    giftcard_message,
  }: Request): Promise<GiftCard> {
    const giftCardRepository = getRepository(GiftCard);

    const checkDigitAmountsNumberCard = String(giftcard_number).length === 16;
    const checkDigitAmountsPasswordCard = giftcard_password.length === 6;

    if (!checkDigitAmountsNumberCard || !checkDigitAmountsPasswordCard) {
      throw new Error(
        'The card number must be 16 numeric digits and the password must be 6 alphanumeric digits.'
      );
    }

    const checkNumberCardExists = await giftCardRepository.findOne({
      where: { giftcard_number },
    });

    if (checkNumberCardExists) {
      throw new Error('Already used gift card number.');
    }

    const hashedPassword = await hash(giftcard_password, 8);

    const giftCard = giftCardRepository.create({
      giftcard_number,
      giftcard_password: hashedPassword,
      giftcard_validated,
      giftcard_message,
    });

    await giftCardRepository.save(giftCard);

    return giftCard;
  }
}

export default CreateGiftCardService;
