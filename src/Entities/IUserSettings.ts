import IUser from './IUser';
import ICurrency from './ICurrency';

interface IUserSettings {
  id: string;
  user_id: string;
  user: IUser;
  currency_id: string;
  currency: ICurrency;
}

export default IUserSettings;
