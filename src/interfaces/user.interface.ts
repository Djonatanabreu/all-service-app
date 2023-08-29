export type User = {
  id?: string;
  email: string;
  senha?: string;
  nome: string;
  type?: string;
  whatsapp: string;
  estado_id?: string;
  cidade_id?: string;
  anos_experiencia?: string;
  descricao?: string;
  valor?: string;
  categoria_id?: string;
  imagem?: string
};

export type UserChangePassword = {
  password: string
  confirm_password: string
}

export type UserUpdate = {
  id?: string;
  email: string;
  nome: string;
  whatsapp: string;
  senha?: string;
  confirm_password?: string;
  estado?: string;
  cidade?: string;
  anos_experiencia?: string;
  descricao?: string;
  valor?: string;
  categoria_id?: string;
  image: []
};