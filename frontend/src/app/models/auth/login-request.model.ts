export interface LoginRequest {
  email: string;
  nome: string;
  /* password: string; ESTÁ INUTILIZADA PORQUE NÃO IMPLEMENTAMOS A LÓGICA NO BACK AINDA */
  cpf: string;
}
