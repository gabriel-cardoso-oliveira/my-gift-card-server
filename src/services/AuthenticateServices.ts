import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import GiftCard from '../models/GiftCard';

interface Request {
  giftcard_number: Number;
  giftcard_password: string;
}

interface Response {
  giftCard: GiftCard;
  token: string;
}

class AuthenticateServices {
  public async execute({
    giftcard_number,
    giftcard_password,
  }: Request): Promise<Response> {
    const giftCardRepository = getRepository(GiftCard);

    const giftCard = await giftCardRepository.findOne({
      giftcard_number,
    });

    if (!giftCard) {
      throw new Error('Incorrect number/password combination.');
    }

    const passwordMatched = await compare(
      giftcard_password, giftCard.giftcard_password
    );

    if (!passwordMatched) {
      throw new Error('Incorrect number/password combination.');
    }

    const token = sign({}, '7507ff7c4f46c027e4ef68b44ffd46ba', {
      subject: giftCard.id,
      expiresIn: '1d',
    });

    return {
      giftCard,
      token,
    };
  }
}

export default AuthenticateServices;
