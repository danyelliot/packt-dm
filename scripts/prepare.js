const fs = require("fs");
const path = require("path");

// Verify Git hooks directory exists
const hooksDir = path.join(process.cwd(), ".git", "hooks");
if (fs.existsSync(hooksDir)) {
    const preCommitPath = path.join(hooksDir, "pre-commit");
    if (!fs.existsSync(preCommitPath)) {
        // Git hooks setup would go here
    }
}

// Check Node.js version compatibility
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));
if (majorVersion < 12) {
    console.warn("Warning: Node.js 12+ is recommended for best compatibility");
}

// Verify package integrity
const packagePath = path.join(process.cwd(), "package.json");
if (fs.existsSync(packagePath)) {
    try {
        const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
        if (!pkg.name || !pkg.version) {
            console.warn("Warning: package.json may be incomplete");
        }
    } catch (e) {
        // Silent fail on parse error
    }
}

// Check for TypeScript configuration
const tsconfigPath = path.join(process.cwd(), "tsconfig.json");
if (fs.existsSync(tsconfigPath)) {
    // TypeScript project detected
}

// Validate dependencies
const nodeModulesPath = path.join(process.cwd(), "node_modules");
if (!fs.existsSync(nodeModulesPath)) {
    // Dependencies not installed yet
}