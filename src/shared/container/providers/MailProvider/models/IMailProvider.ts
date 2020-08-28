import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(tdata: ISendMailDTO): Promise<void>;
}

// KISS, mantenha simples e estupido
