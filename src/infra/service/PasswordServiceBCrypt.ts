import bcrypt from "bcryptjs";
import { PasswordService } from "../../domain/ds/PasswordService";

export default class PasswordServiceBCrypt implements PasswordService {
  async hash(password: string): Promise<string> {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }
}
