import { watch } from 'fs';

const isWatch = process.argv.includes('--watch');

async function build() {
  const timestamp = Date.now();
  const filename = `client.${timestamp}.js`;

  try {
    await Bun.build({
      entrypoints: ['./src/Frontend/App.tsx'],
      outdir: './dist',
      naming: {
        entry: filename
      },
      minify: true,
      target: 'browser',
      splitting: true,
      define: {
        'process.env.NODE_ENV': '"production"'
      }
    });

    await Bun.write('./dist/build-meta.json', JSON.stringify({ 
      client: filename 
    }));

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
