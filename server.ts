import { join, resolve, extname } from "path";
import { promises as fs } from "fs";
import { createServer } from "http";

const STATIC_PATH = resolve("dist");
const PORT = process.env.PORT || 8080;

createServer(async (req, res) => {
    const url = req.url === "/" ? "/index.html" : req.url;
    const filePath = join(STATIC_PATH, `${url}`);
    const fileType = extname(filePath);
    try {
        const data = await fs.readFile(filePath);
        if (fileType === ".js") { // Set content type for ES modules.
          res.setHeader("Content-Type", "application/javascript");
        }
        res.end(data);
    } catch (err) {
        res.statusCode = 404;
        res.end(`File "${url}" is not found`);
    }
}).listen(PORT, () => console.log(`Static on port ${PORT}`));
