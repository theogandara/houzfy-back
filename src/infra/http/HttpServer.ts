import express from "express";
import { ValidateTokenJwt } from "../../application/middleware/ValidateToken";
import multer from "multer";
import cors from "cors";

export default interface HttpServer {
  register(
    type: "PROTECTED" | "PUBLIC",
    method: string,
    url: string,
    callback: Function
  ): void;
  registerUpload(method: string, url: string, callback: Function): void;
  listen(port: number): void;
}

const allowlist = ["http://localhost:3003"];

export class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors({ origin: allowlist }));
  }

  register(
    type: "PROTECTED" | "PUBLIC" = "PROTECTED",
    method: string,
    url: string,
    callback: Function
  ): void {
    this.app[method](url, async function (req: any, res: any) {
      try {
        if (type === "PROTECTED") {
          const token = req.headers.authorization;
          const tokenWithoutBearer = token?.replace("Bearer ", "");
          const validateToken = new ValidateTokenJwt();
          validateToken.validateToken(tokenWithoutBearer);
        }

        const output = await callback(req.params, req.body, req.query);
        res.json(output);
      } catch (e: any) {
        return res.status(422).json({
          message: e.message,
        });
      }
    });
  }

  registerUpload(method: string, url: string, callback: Function): void {
    this.app[method](
      url,
      multer({ storage: multer.memoryStorage() }).single("file"),
      async function (req: any, res: any) {
        try {
          const output = await callback(req);
          res.json(output);
        } catch (e: any) {
          return res.status(422).json({
            message: e.message,
          });
        }
      }
    );
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}
