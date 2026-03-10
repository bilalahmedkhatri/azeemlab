const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '..');
const buildDir = path.join(rootDir, 'cpanel-build');
const nextDir = path.join(rootDir, '.next');
const standaloneDir = path.join(nextDir, 'standalone');
const publicDir = path.join(rootDir, 'public');

function copyDir(src, dest) {
    if (!fs.existsSync(src)) return;
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

console.log('Building Next.js app...');
try {
    execSync('npm run build', { stdio: 'inherit', cwd: rootDir });
} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}

console.log('Preparing cPanel build...');

// Clean previous build
if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true, force: true });
}
fs.mkdirSync(buildDir);

// 1. Copy standalone files
console.log('Copying standalone files...');
if (fs.existsSync(standaloneDir)) {
    copyDir(standaloneDir, buildDir);
} else {
    console.error('Error: .next/standalone not found. Make sure "output: standalone" is in next.config.ts');
    process.exit(1);
}

// 2. Copy static files
console.log('Copying static files...');
const destStaticDir = path.join(buildDir, '.next', 'static');
copyDir(path.join(nextDir, 'static'), destStaticDir);

// 3. Copy public files
console.log('Copying public files...');
copyDir(publicDir, path.join(buildDir, 'public'));

console.log('-------------------------------------------------------');
console.log('SUCCESS! cPanel build prepared in "cpanel-build" folder.');
console.log('-------------------------------------------------------');