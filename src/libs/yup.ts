/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'Campo inválido',
    required: 'Campo obrigatório',
    oneOf: 'Campo deve ser um dos seguintes valores: ${values}',
    notOneOf: 'Campo não pode ser um dos seguintes valores: ${values}',
  },
  string: {
    length: 'Campo deve ter exatamente ${length} caracteres',
    min: 'Campo deve ter pelo menos ${min} caracteres',
    max: 'Campo deve ter no máximo ${max} caracteres',
    email: 'Campo tem o formato de e-mail inválido',
    url: 'Campo deve ter um formato de URL válida',
    trim: 'Campo não deve conter espaços no início ou no fim.',
    lowercase: 'Campo deve estar em maiúsculo',
    uppercase: 'Campo deve estar em minúsculo',
  },
  number: {
    min: 'Campo deve ser no mínimo ${min}',
    max: 'Campo deve ser no máximo ${max}',
    lessThan: 'Campo deve ser menor que ${less}',
    moreThan: 'Campo deve ser maior que ${more}',
    positive: 'Campo deve ser um número posítivo',
    negative: 'Campo deve ser um número negativo',
    integer: 'Campo deve ser um número inteiro',
  },
  date: {
    min: 'Data deve ser maior que ${min}',
    max: 'Data deve ser menor que ${max}',
  },
  array: {
    min: 'Campo deve ter no mínimo ${min} itens',
    max: 'Campo deve ter no máximo ${max} itens',
  }
});

export default yup;
