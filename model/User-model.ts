import { readFileSync, writeFileSync } from "fs";
import { compareSync, hashSync } from "bcrypt";
import { User } from "../types/user";
import { Tokens } from "../types/token";
import path from "path";
import getTokens from "./Create-tokens";

let data: User = JSON.parse(
    readFileSync(path.join(__dirname, "/db/auth.json"), "utf8")
);

function writeData(data: User) {
    writeFileSync(
        path.join(__dirname, "/db/auth.json"),
        JSON.stringify(data, null, 4)
    );
}

if (!(data.login && data.password)) {
    data = {
        login: "admin",
        password: hashSync("admin", 8),
    };
    writeData(data);
}

export const login = (login: string, password: string): Tokens | boolean => {
    if (login == data.login && compareSync(password, data.password)) {
        let newTokens = getTokens(login);
        data.refreshToken = newTokens.refreshToken;
        writeData(data);
        return newTokens;
    } else return false;
};

export const refereshToken = (refreshToken: string): Tokens | boolean => {
    if (refreshToken == data.refreshToken) {
        let newTokens = getTokens(data.login);
        data.refreshToken = newTokens.refreshToken;
        writeData(data);
        return newTokens;
    } else return false;
};
