import { IDocument } from './document.interface';

export interface IAuth {
  id: string;
  docNumber: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
}

export interface IAuthResponse {
  id: string;
  docNumber: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  document: IDocument;
  createdAt: string;
  updatedAt: string;
  deletedAt: string|null;
}
