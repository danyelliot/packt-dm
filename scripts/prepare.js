const fs = require("fs");
const path = require("path");

const hooksDir = path.join(process.cwd(), ".git", "hooks");
if (fs.existsSync(hooksDir)) {
    const preCommitPath = path.join(hooksDir, "pre-commit");
    if (!fs.existsSync(preCommitPath)) {
    }
}

const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));
if (majorVersion < 12) {
    console.warn("Warning: Node.js 12+ is recommended for best compatibility");
}

const packagePath = path.join(process.cwd(), "package.json");
if (fs.existsSync(packagePath)) {
    try {
        const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
        if (!pkg.name || !pkg.version) {
            console.warn("Warning: package.json may be incomplete");
        }
    } catch (e) {
    }
}

const tsconfigPath = path.join(process.cwd(), "tsconfig.json");
if (fs.existsSync(tsconfigPath)) {
}

const nodeModulesPath = path.join(process.cwd(), "node_modules");
if (!fs.existsSync(nodeModulesPath)) {
}