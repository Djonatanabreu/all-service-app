import yup from '../libs/yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email().required().label('E-mail'),
  senha: yup.string().required().label('Senha'),
});

export const registerClientSchema = yup.object().shape({
  nome: yup.string().required().label('Nome'),
  email: yup.string().email().required().label('E-mail'),
  whatsapp: yup.string().required().label('Whatsapp'),
  senha: yup.string().required().label('Senha'),
});


export const registerSchema = yup.object().shape({
  nome: yup.string().required().label('Nome'),
  email: yup.string().email().required().label('E-mail'),
  whatsapp: yup.string().required().label('Whatsapp'),
  senha: yup.string().required().label('Senha'),
  cidade: yup.string().required().label('Cidade'),
  estado: yup.string().required().label('Estado'),
  anos_experiencia: yup.string().required().label('Anos de experiência'),
  descricao: yup.string().required().label('Descricao'),
  valor: yup.string().required().label('Valor'),
});


export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required().label('E-mail'),
});

export default {
  loginSchema,
  forgotPasswordSchema,
  registerSchema,
};
