import { readFileSync } from "fs";
import { User } from "../types/user";
import jwt from "jsonwebtoken";
import path from "path";

export function checkToken(token: string) {
    const data: User = JSON.parse(
        readFileSync(path.join(__dirname, "/db/auth.json"), "utf8")
    );
    let decodedToken = jwt.verify(token, "secret", {
        complete: true,
    });
    let decodedData = (decodedToken.payload as any).data;
    if (data.login === decodedData) {
        return true;
    }
}
