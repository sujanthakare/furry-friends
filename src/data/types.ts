export interface IKitty {
  id: number;
  name: string;
  dateOfBirth: string;
  gender?: 'male' | 'female';
  bio?: string;
  image?: string;
}
