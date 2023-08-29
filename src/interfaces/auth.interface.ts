export type UserLogin = {
  email: string;
  senha: string;
};

export type UserForgotPassword = {
  email: string;
};

export type UserRegister = {
  email: string;
  nome: string;
  senha: string;
  whatsapp: string;
  estado?: string;
  cidade?: string;
  anos_experiencia?: string;
  descricao?: string;
  valor?: string;
  images: []
  categoria_id?: string;
};
