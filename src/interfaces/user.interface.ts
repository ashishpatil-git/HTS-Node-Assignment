export default interface IUser extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }