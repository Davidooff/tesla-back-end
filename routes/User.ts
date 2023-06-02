import { Router, Response } from "express";
import { TypedRequestBody } from "../types/express";
import { login } from "../model/User-model";
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

module.exports = router;
