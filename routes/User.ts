import { Router, Response } from "express";
import { TypedRequestBody } from "../types/express";
import { login, refereshToken } from "../model/User-model";
import { checkToken } from "../model/checkToken";

const router = Router();

router.post(
    "/login",
    (
        req: TypedRequestBody<{ login: string; password: string }>,
        res: Response
    ) => {
        let data = login(req.body.login, req.body.password);
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(401).send("Invalid login or password");
        }
    }
);

router.post(
    "/checkToken",
    (req: TypedRequestBody<{ accessToken: string }>, res: Response) => {
        res.send(checkToken(req.body.accessToken));
    }
);

router.post(
    "/updateToken",
    (
        req: TypedRequestBody<{ accessToken: string; refreshToken: string }>,
        res: Response
    ) => {
        res.send(refereshToken(req.body.refreshToken));
    }
);

module.exports = router;
