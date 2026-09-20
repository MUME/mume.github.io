import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.resolve(__dirname, '../dist')

if (!fs.existsSync(distDir)) {
  console.error(`[TEST ERROR] dist directory does not exist at ${distDir}. Run 'npm run build' first.`)
  process.exit(1)
}

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList)
    } else if (file.endsWith('.html')) {
      fileList.push(filePath)
    }
  }
  return fileList
}

const htmlFiles = getAllHtmlFiles(distDir)
if (htmlFiles.length === 0) {
  console.error('[TEST ERROR] No HTML files found in dist directory.')
  process.exit(1)
}

let errors = []
let totalLinksChecked = 0
let totalAssetsChecked = 0

let baseEnv = process.env.VITE_BASE || '/'
if (!baseEnv.startsWith('/')) baseEnv = '/' + baseEnv
if (!baseEnv.endsWith('/')) baseEnv = baseEnv + '/'
const expectedBase = baseEnv

console.log(`[TEST] Verifying ${htmlFiles.length} HTML files in dist/ against expected base: "${expectedBase}"...`)

for (const htmlFile of htmlFiles) {
  const content = fs.readFileSync(htmlFile, 'utf8')
  const relPath = path.relative(distDir, htmlFile)

  // 1. Check for invalid prefix '/mume.github.io/' if expectedBase does not contain it
  if (!expectedBase.includes('/mume.github.io/') && content.includes('/mume.github.io/')) {
    errors.push(`${relPath}: Contains invalid hardcoded path prefix '/mume.github.io/'`)
  }

  // 2. Extract and check src/href attributes (<img src="...">, <script src="...">, <link href="...">)
  const matches = [...content.matchAll(/(?:src|href|srcset)=["']([^"']+)["']/g)]
  for (const match of matches) {
    const rawUrl = match[1]

    // Skip external links, data URIs, anchor hashes, mailto, etc.
    if (
      rawUrl.startsWith('http://') ||
      rawUrl.startsWith('https://') ||
      rawUrl.startsWith('//') ||
      rawUrl.startsWith('data:') ||
      rawUrl.startsWith('#') ||
      rawUrl.startsWith('mailto:')
    ) {
      continue
    }

    // Process srcset entries if space-separated
    const urlParts = rawUrl.split(',').map(s => s.trim().split(/\s+/)[0])
    for (const url of urlParts) {
      if (!url) continue

      if (!expectedBase.includes('/mume.github.io/') && url.includes('/mume.github.io/')) {
        errors.push(`${relPath}: URL "${url}" contains '/mume.github.io/'`)
      }

      // Is asset (js, css, images, fonts, ico)?
      if (/\.(js|css|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|eot)$/i.test(url)) {
        totalAssetsChecked++
        let distRelAssetPath = ''

        if (url.startsWith('/')) {
          if (expectedBase !== '/' && url.startsWith(expectedBase)) {
            distRelAssetPath = url.slice(expectedBase.length - 1)
          } else {
            distRelAssetPath = url
          }
          const resolvedAssetPath = path.join(distDir, distRelAssetPath)
          if (!fs.existsSync(resolvedAssetPath)) {
            errors.push(`${relPath}: Asset referenced by "${url}" not found at "${resolvedAssetPath}"`)
          }
        } else {
          const resolvedAssetPath = path.resolve(path.dirname(htmlFile), url)
          if (!fs.existsSync(resolvedAssetPath)) {
            errors.push(`${relPath}: Relative asset referenced by "${url}" not found at "${resolvedAssetPath}"`)
          }
        }
      } else if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
        // Internal page route link check
        totalLinksChecked++
        let targetRoute = url.split('?')[0].split('#')[0]

        if (expectedBase !== '/' && targetRoute.startsWith(expectedBase)) {
          targetRoute = '/' + targetRoute.slice(expectedBase.length)
        }

        let possibleDistPaths = []
        if (targetRoute.startsWith('/')) {
          const cleanRoute = targetRoute.replace(/^\//, '')
          if (!cleanRoute) {
            possibleDistPaths.push(path.join(distDir, 'index.html'))
          } else {
            possibleDistPaths.push(
              path.join(distDir, `${cleanRoute}.html`),
              path.join(distDir, cleanRoute, 'index.html'),
              path.join(distDir, cleanRoute)
            )
          }
        } else {
          const absoluteUrl = path.resolve(path.dirname(htmlFile), targetRoute)
          possibleDistPaths.push(
            `${absoluteUrl}.html`,
            path.join(absoluteUrl, 'index.html'),
            absoluteUrl
          )
        }

        const exists = possibleDistPaths.some(p => fs.existsSync(p))
        if (!exists) {
          errors.push(`${relPath}: Internal route "${url}" could not be resolved in dist (checked: ${possibleDistPaths.join(', ')})`)
        }
      }
    }
  }

  // 3. Verify __VP_SITE_DATA__ base if present
  const siteDataMatch = content.match(/window\.__VP_SITE_DATA__=JSON\.parse\((".*?")\)/)
  if (siteDataMatch) {
    try {
      const siteData = JSON.parse(JSON.parse(siteDataMatch[1]))
      if (siteData.base !== expectedBase) {
        errors.push(`${relPath}: __VP_SITE_DATA__.base is "${siteData.base}", expected "${expectedBase}"`)
      }
    } catch (e) {
      // Ignore parse errors
    }
  }
}

console.log(`[TEST SUMMARY] Checked ${htmlFiles.length} HTML files, ${totalLinksChecked} internal links, and ${totalAssetsChecked} asset references.`)

if (errors.length > 0) {
  console.error(`\n[TEST FAILURES] Found ${errors.length} link/asset path issues:\n`)
  for (const err of errors) {
    console.error(` - ${err}`)
  }
  process.exit(1)
} else {
  console.log('[TEST SUCCESS] All link and asset path checks passed successfully!')
  process.exit(0)
}
