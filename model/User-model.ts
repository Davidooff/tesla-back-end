import { readFileSync, writeFileSync } from "fs";
import { compareSync, hashSync } from "bcrypt";
import { User } from "../types/user";
import jwt from "jsonwebtoken";
import path from "path";

let data: User = JSON.parse(
    readFileSync(path.join(__dirname, "/db/auth.json"), "utf8")
);

if (!(data.login && data.password)) {
    data = {
        login: "admin",
        password: hashSync("admin", 8),
    };
    writeFileSync(
        path.join(__dirname, "/db/auth.json"),
        JSON.stringify(data, null, 4)
    );
}

export const login = (login: string, password: string): string | boolean => {
    if (login == data.login && compareSync(password, data.password)) {
        data.refreshToken = jwt.sign(
            {
                data: login,
            },
            "secret",
            { expiresIn: "30d" }
        );
        writeFileSync(
            path.join(__dirname, "/db/auth.json"),
            JSON.stringify(data, null, 4)
        );
        return data.refreshToken;
    } else return false;
};
