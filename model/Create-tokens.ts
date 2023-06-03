import jwt from "jsonwebtoken";
import { Tokens } from "../types/token";

function generateToken(data: string, expiresIn: string): string {
    return jwt.sign({ data, expiresIn }, "secret");
}

function getTokens(userName: string): Tokens {
    let newRefreshToken = generateToken(userName, "30d");
    let newAccessToken = generateToken(userName, "1d");
    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };
}

export default getTokens;
