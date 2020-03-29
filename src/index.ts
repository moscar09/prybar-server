import express, { Response } from "express";
import shell, { ShellString } from "shelljs";

const app = express();
const port = 2000;

app.use(express.json());

app.post("/exec", (req, res: Response<{ output: string; error: boolean }>) => {
  const request_data = req.body;
  if (request_data.code === undefined) {
    res.statusCode = 404;
    res.send({ output: "Error! Please try again", error: true });
  } else {
    const code = request_data.code;

    let commandOutput: ShellString = shell.exec(
      `/app/prybar-nodejs -q -e '${code}'`
    );

    if (commandOutput.code !== 0) {
      res.send({ output: commandOutput.stderr, error: true });
    } else {
      res.send({ output: commandOutput.stdout, error: false });
    }
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
