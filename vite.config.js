import { defineConfig } from 'vite';

export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                // Styles still use Sass @import; silence its deprecation warnings.
                silenceDeprecations: ['import'],
            },
        },
    },
});
