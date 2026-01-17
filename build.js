import { readdir, stat, readFile, writeFile, mkdir, copyFile } from 'fs/promises'
import path from 'path'
import esbuild from 'esbuild'
import { minify as minifyHTML } from 'html-minifier-terser'

const SRC = 'src'
const DIST = 'dist'

const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico']

async function walk(dir) {
  const entries = await readdir(dir)
  for (const entry of entries) {
    const fullPath = path.join(dir, entry)
    const info = await stat(fullPath)

    if (info.isDirectory()) {
      await walk(fullPath)
    } else {
      await processFile(fullPath)
    }
  }
}

async function processFile(file) {
  const out = path.join(DIST, file.replace(SRC, ''))
  await mkdir(path.dirname(out), { recursive: true })

  const ext = path.extname(file).toLowerCase()

  if (imageExtensions.includes(ext)) {
    await copyFile(file, out)
    return
  }

  if (ext === '.js') {
    await esbuild.build({
      entryPoints: [file],
      outfile: out,
      minify: true,
      bundle: false,
      platform: 'browser'
    })
    return
  }

  const content = await readFile(file, 'utf8')

  if (ext === '.css') {
    await writeFile(out, content.replace(/\s+/g, ' '))
    return
  }

  if (ext === '.html') {
    const minified = await minifyHTML(content, {
      collapseWhitespace: true,
      removeComments: true
    })
    await writeFile(out, minified)
    return
  }

  await writeFile(out, content)
}

await walk(SRC)
console.warn("Compilé !")
