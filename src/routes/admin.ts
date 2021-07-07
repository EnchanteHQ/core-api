import { Router } from "express";

const router = Router();

// ADD PROTECTED ADMIN INDEX ROUTES HERE

router.get("/", async (req, res) => {
  res.send("hello");
});

export default router;
