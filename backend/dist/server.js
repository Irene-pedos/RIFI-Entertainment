import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc/root.js";
import { createContext } from "./trpc/trpc.js";
import { env } from "./env.js";
import multer from "multer";
import { uploadToStorage } from "./lib/supabase.js";
import { db } from "./db.js";
import jwt from "jsonwebtoken";
import { MediaCategory } from "@prisma/client";
const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
// Helper to verify admin for REST endpoints
const authenticateAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        const user = await db.adminUser.findUnique({ where: { id: decoded.id } });
        if (!user || !user.isActive)
            throw new Error();
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
// File Upload Endpoint
app.post("/upload", authenticateAdmin, upload.single("file"), async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ error: "No file uploaded" });
        const category = req.body.category || MediaCategory.OTHER;
        const fileName = `${Date.now()}-${req.file.originalname}`;
        const storagePath = `media/${fileName}`;
        const { publicUrl } = await uploadToStorage("rifi-media", // Ensure this bucket exists in Supabase
        storagePath, req.file.buffer, req.file.mimetype);
        const asset = await db.mediaAsset.create({
            data: {
                fileName,
                originalName: req.file.originalname,
                mimeType: req.file.mimetype,
                fileSize: req.file.size,
                publicUrl,
                storagePath,
                category,
                uploadedById: req.user.id,
            },
        });
        res.json(asset);
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: error.message || "Upload failed" });
    }
});
app.use("/trpc", trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
}));
app.get("/", (req, res) => {
    res.send("RIFI-Entertainment API is running");
});
app.listen(env.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${env.PORT}`);
});
