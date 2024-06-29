import jwt from "jsonwebtoken";

interface ValidateToken {
  validateToken(jwtToValidate: string): boolean;
}

export class ValidateTokenJwt implements ValidateToken {
  validateToken(jwtToValidate: string): boolean {
    if (!jwtToValidate) {
      throw new Error("Token not found");
    }
    try {
      jwt.verify(jwtToValidate, "SECRET_KEY");
      return true;
    } catch {
      throw new Error("Invalid token");
    }
  }
}
