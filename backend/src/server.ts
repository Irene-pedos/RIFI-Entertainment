import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc/root.js";
import { createContext } from "./trpc/trpc.js";
import { env } from "./env.js";
import { logger } from "./lib/logger.js";
import { z } from "zod";

import multer from "multer";
import { uploadToStorage } from "./lib/supabase.js";
import { db } from "./db.js";
import jwt from "jsonwebtoken";
import { MediaCategory } from "@prisma/client";

const app = express();

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

// Helper to verify admin for REST endpoints
const authenticateAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };
    const user = await db.adminUser.findUnique({ where: { id: decoded.id } });
    if (!user || !user.isActive) {
      throw new Error("User not found or inactive");
    }
    (req as any).user = user;
    next();
  } catch (err) {
    logger.warn("Auth failure for REST endpoint:", err);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const uploadSchema = z.object({
  category: z.nativeEnum(MediaCategory).optional().default(MediaCategory.OTHER),
});

// File Upload Endpoint
app.post("/upload", authenticateAdmin, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Validate request body
    const validation = uploadSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: "Invalid input data", details: validation.error.format() });
    }

    const { category } = validation.data;
    const fileName = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '-')}`;
    const storagePath = `media/${fileName}`;

    logger.info(`Uploading file: ${req.file.originalname} as ${storagePath}`);

    const { publicUrl } = await uploadToStorage(
      "rifi-media",
      storagePath,
      req.file.buffer,
      req.file.mimetype
    );

    const asset = await db.mediaAsset.create({
      data: {
        fileName,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        fileSize: req.file.size,
        publicUrl,
        storagePath,
        category,
        uploadedById: (req as any).user.id,
      },
    });

    logger.info(`File uploaded successfully: ${asset.id}`);
    res.json(asset);
  } catch (error: any) {
    logger.error("Upload error:", error);
    res.status(500).json({ error: "Internal server error during upload" });
  }
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get("/", (req, res) => {
  res.send("RIFI-Entertainment API is running");
});

app.listen(env.PORT, () => {
  logger.info(`🚀 Server ready at http://localhost:${env.PORT}`);
});
