import presetWeapp from 'unocss-preset-weapp'
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
import { defineConfig } from 'unocss'

const { presetWeappAttributify, transformerAttributify } = extractorAttributify()
const pos = { t: '-top', r: '-right', b: '-bottom', l: '-left' }
export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
    presetWeappAttributify() as any,
  ],
  theme: {
    colors: {
      default: '#3A69F5',
    },
  },
  shortcuts: [
    ['flex-row', 'flex flex-row'],
    ['flex-col', 'flex flex-col'],
    ['center', 'flex items-center justify-center'],
    ['bg', 'bg-contain bg-no-repeat bg-center'],
  ],
  rules: [
    [/^gap-(\d+)-(\d+)$/, ([, d1, d2]) => ({ gap: `${d1}px ${d2}px` })],
    [/^flex-(\d)$/, ([, d1]) => ({ flex: d1 })],
    [/^pre-wrap$/, () => ({ 'white-space': 'pre-wrap' })],
    [/^bgs-(\d+[px|%|vw])$/, ([, w1]) => ({ 'background-size': w1 })],
    [/^btn-(\S+)$/, ([, s1]) => ({ 'background-color': s1, 'box-shadow': `0px 7px 10px 0px ${s1}80` })],
    [/^nowrap(-e)?$/, ([, w1]) => ({ 'white-space': 'nowrap', 'text-overflow': w1 === '-e' ? 'ellipsis' : 'unset', 'overflow': 'hidden' })],
    [/^bd([t|r|b|l])?-(\d)-(\S+)$/, ([, w1, d1, s1]) => ({ [`border${w1 ? pos[w1] : ''}`]: `${d1}px solid ${s1}` })],
    [/shadow-(-?\d+)-(-?\d+)-(-?\d+)-(-?\d+)-(\S+)$/, ([, d1, d2, d3, d4, s1]) => ({ 'box-shadow': `${d1}px ${d2}px ${d3}px ${d4}px ${s1}` })],
    [/^grid-(\d)-(\d)-(\d+)$/, ([, d1, d2, d3]) => ({ 'display': 'grid', 'grid-template-rows': `repeat(${d1}, 1fr)`, 'grid-template-columns': `repeat(${d2}, 1fr)`, 'gap': `${d3}px` })],
  ],
  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass() as any,
  ],
})
