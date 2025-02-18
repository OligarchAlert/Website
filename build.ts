import { watch } from 'fs';
import { createHash } from 'crypto';

const isWatch = process.argv.includes('--watch');

async function build() {
  try {
    // First build with a temporary name
    const buildResult = await Bun.build({
      entrypoints: ['./src/Layout/App.tsx'],
      outdir: './dist',
      naming: {
        entry: 'client.temp.js'
      },
      minify: true,
      target: 'browser',
      splitting: true,
      define: {
        'process.env.NODE_ENV': '"production"'
      }
    });

    // Read the output file and generate hash
    const outputContent = await Bun.file('./dist/client.temp.js').text();
    const hash = createHash('sha256')
      .update(outputContent)
      .digest('hex')
      .slice(0, 10);
    
    const filename = `client.${hash}.js`;

    // Rename the file with the hash
    await Bun.write(`./dist/${filename}`, outputContent);
    await Bun.write('./dist/build-meta.json', JSON.stringify({ 
      'client.js': filename 
    }));

    // Clean up temp file
    await Bun.write('./dist/client.temp.js', '');

    console.log(`Built ${filename}`);
  } catch (error) {
    console.error('Build failed:', error);
  }
}

if (isWatch) {
  // Initial build
  await build();

  // Watch the current directory recursively
  const watcher = watch('.', { recursive: true }, async (eventType, filename) => {
    if (!filename) return;
    
    // Skip build.ts itself, server files, and the public directory
    if (
      filename === 'build.ts' ||
      filename.startsWith('src/Backend/') ||
      filename.startsWith('dist/') ||
      !filename.match(/\.(tsx|ts|jsx|js)$/)
    ) return;
    
    console.log(`File changed: ${filename}`);
    await build();
  });

  process.on('SIGINT', () => {
    watcher.close();
    process.exit(0);
  });
  
  console.log('Watching for changes...');
} else {
  await build();
  process.exit(0);
}
