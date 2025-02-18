import { watch } from 'fs';

const bundleData = {
    clientBundle: 'client.js',
    stylesBundle: 'styles.css'
}

export function getBundleData() {
    return bundleData;
}

export function StartBundler() {
    // Initial load
    updateBundles();

    // Watch for changes to build-meta.json
    watch('./dist/build-meta.json', async (eventType, filename) => {
        if (eventType === 'change') {
            console.log('Build meta changed, updating bundles...');
            await updateBundles();
        }
    });
}

async function updateBundles() {
    try {
        const meta = JSON.parse(await Bun.file('./dist/build-meta.json').text());
        bundleData.clientBundle = meta['client.js'];
        bundleData.stylesBundle = meta['styles.css'];
    } catch (e) {
        console.warn('No build-meta.json found, using default bundles');
    }
}