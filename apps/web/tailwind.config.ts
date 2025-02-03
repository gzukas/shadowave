import type { Config } from 'tailwindcss';
import baseConfig from '@workspace/ui/tailwind.config';

export default {
  content: [...baseConfig.content, '../../packages/ui/src/**/*.{ts,tsx}'],
  presets: [baseConfig]
} satisfies Config;
