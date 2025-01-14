  import { Router } from "express";
  import { getDynamicToken } from "./tokenManager";

  const authRouter = Router();

  // Route to get the dynamic token
  authRouter.get("/token", (req, res) => {
    const token = getDynamicToken();
    res.json({ success: true, token });
  });

  export default authRouter;