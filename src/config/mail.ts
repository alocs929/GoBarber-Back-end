interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: '<<email com o meu dominio bruno@titico.com>>',
      name: 'Titico do GoBarber',
    },
  },
} as IMailConfig;
