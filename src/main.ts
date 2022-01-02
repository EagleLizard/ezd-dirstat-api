
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import { initServer } from './lib/server';

(async () => {
  try {
    await main();
  } catch(e) {
    console.error(e);
    throw e;
  }
})();

async function main() {
  await initServer();
}
