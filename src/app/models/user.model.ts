export class UserModel{
  constructor( 
    public uid: string | undefined,
    public name: string | undefined,
    public email: string | null |undefined ,
  ){}
}