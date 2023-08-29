import yup from '../libs/yup';


export const updateClienteSchema = yup.object().shape({
  nome: yup.string().required().label('Nome'),
  whatsapp: yup.string().required().label('Whatsapp'),
  senha: yup.string().label('Senha'),
});


export const updateSchema = yup.object().shape({
  nome: yup.string().required().label('Nome'),
  whatsapp: yup.string().required().label('Whatsapp'),
  senha: yup.string().label('Senha'),
  cidade: yup.string().required().label('Cidade'),
  estado: yup.string().required().label('Estado'),
  anos_experiencia: yup.string().required().label('Anos de experiência'),
  descricao: yup.string().required().label('Descricao'),
  valor: yup.string().required().label('Valor'),
});


export const changePasswordSchema = yup.object().shape({
  password: yup.string().required().label('Senha'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Senha tem que ser iguais')
    .required()
    .label('Confirmação'),
});

export default {
  updateSchema,
  changePasswordSchema
};
