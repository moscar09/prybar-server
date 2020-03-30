import express, { Response } from "express";
import shell, { ShellString } from "shelljs";

const app = express();
const PORT = process.env.PORT || 2000;
const PRYBAR_BINARY = process.env.PRYBAR_BINARY || `/app/prybar-nodejs`;

app.use(express.json());

app.post("/exec", (req, res: Response<{ output: string; error: boolean }>) => {
  const request_data = req.body;
  if (request_data.code === undefined) {
    res.statusCode = 404;
    res.send({ output: "Error! Please try again", error: true });
    return;
  }
  const code = new Buffer(request_data.code).toString("base64");

  console.dir(code);
  let commandOutput: ShellString = shell.exec(
    `echo '${code}' | base64 --decode | xargs -0 ${PRYBAR_BINARY} -q -e`
  );

  if (commandOutput.code !== 0) {
    res.send({ output: commandOutput.stderr, error: true });
  } else {
    res.send({ output: commandOutput.stdout, error: false });
  }
});

app.listen(PORT, () =>
  console.log(
    `Prybar server listening on port ${PORT}. Prybar binary is ${PRYBAR_BINARY}!`
  )
);
