import { IErrorForm } from '@app/utility/error/errorGenerator';
import { HttpStatus, Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Injectable()
export class HttpService {
  static SuccessfulResponse<T>(
    res: FastifyReply,
    data: T,
    status: keyof typeof HttpStatus = 'OK',
  ) {
    res.status(HttpStatus[status]);
    return {
      success: true,
      data,
    };
  }

  static UnsuccessfulResponse(
    res: FastifyReply,
    errors: IErrorForm[] = [],
    status: keyof typeof HttpStatus = 'BAD_REQUEST',
  ) {
    const model: { success: boolean; errors: IErrorForm[]; data?: any } = {
      success: false,
      errors,
    };

    res.status(HttpStatus[status]);

    return res.send(model);
  }
}
