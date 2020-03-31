import express, { Response } from "express";
import { codeRunner } from "./runner/codeRunner";
import { SuccessResponse, ErrorResponse } from "runner/types";

const app = express();
const PORT = process.env.PORT || 2000;
const PRYBAR_NODEJS = process.env.PRYBAR_NODEJS || `./prybar-nodejs`;

app.use(express.json());

app.post("/exec", (req, res: Response<SuccessResponse | ErrorResponse>) => {
  const request_data = req.body;

  if (request_data.code === undefined) {
    res.statusCode = 404;
    res.send({ output: "Error! Please try again", error: true });
    return;
  }

  const code = request_data.code;

  res.send(codeRunner(code, "js"));
});

app.listen(PORT, () =>
  console.log(
    `Prybar server listening on port ${PORT}. Prybar binary is ${PRYBAR_NODEJS}!`
  )
);
