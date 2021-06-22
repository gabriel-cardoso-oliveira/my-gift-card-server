import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import GiftCard from '../models/GiftCard';
import authConfig from '../config/auth';

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

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: giftCard.id,
      expiresIn
    });

    return {
      giftCard,
      token,
    };
  }
}

export default AuthenticateServices;
