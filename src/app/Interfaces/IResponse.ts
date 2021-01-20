export interface IResponse {
  success: boolean;
  errors?: any[]; // to erwtimatiko simainei oti einai proeraitika ta pedia
  message?: string;

  [key: string]: any;
}
