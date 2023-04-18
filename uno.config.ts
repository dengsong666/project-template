import { defineConfig, presetAttributify, presetIcons, presetUno, presetMini } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetMini(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        width: '24px',
        height: '24px'
      },
      collections: {
        custom: {
          send: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 3l-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1L21 3"/></svg>'
        }
        // antd: () => import("@iconify-json/ant-design/icons.json").then((i) => i.default),
      },
      customizations: {
        transform(svg) {
          return svg.replace(/#ffffff/, 'currentColor')
        }
      }
    })
  ],
  safelist: ['setting', 'dashboard', 'notification', 'menu', 'apartment', 'key', 'usergroup-add', 'user', 'info-circle', 'like'].map((icon) => `i-ant-design-${icon}-outlined`),
  theme: {
    colors: {
      default: '#4700FF',
      success: '#67C23A',
      warning: '#E6A23C',
      danger: '#F56C6C',
      info: '#909399'
    }
  },
  shortcuts: [
    ['flex-row', 'flex flex-row'],
    ['flex-col', 'flex flex-col'],
    ['flex-center', 'flex justify-center items-center'],
    ['grid-center', 'grid place-items-center'],
    ['e-auto', 'pointer-events-auto'],
    ['operate', 'm8px c-default cursor-pointer'],
    ['add-btn', 'flex-center bg-#363b64 p8px rd-10px ml-auto']
  ],
  rules: [
    ['absolute-center', { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }],
    ['nowrap', { 'white-space': 'nowrap' }],
    ['pointer-events', { 'white-space': 'nowrap' }],
    [/^pointer-(\w+)$/, ([, w]) => ({ 'pointer-events': w })],
    [/^wh-(\d+)(\w+|%)$/, ([, d, w]) => ({ width: `${d + w}`, height: `${d + w}` })],
    [/^bd-(\d+)-(#\w+)$/, ([, d, w]) => ({ border: `${d}px solid ${w}` })],
    [/^grid-(\d)-(\d)-(\d+)$/, ([, d1, d2, d3]) => ({ display: 'grid', 'grid-template-rows': `repeat(${d1}, 1fr)`, 'grid-template-columns': `repeat(${d2}, 1fr)`, gap: `${d3}px` })]
  ]
})
