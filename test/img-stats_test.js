const path = require('path')
const tap = require('tap')
const imgStats = require('../lib/img-stats.js')

tap.test('img-stats', t => {
  t.test('cat.png', async t => {
    const data = await imgStats.stats(path.join(__dirname, 'files/cat.png'))
    t.equal(data.width, 100, 'Width should be 100')
    t.equal(data.height, 100, 'Height should be 100')
    t.equal(data.type, 'PNG', 'Cat should be a png')
    t.end()
  })

  t.test('bear.svg', async t => {
    const data = await imgStats.stats(path.join(__dirname, 'files/bear.svg'))
    t.equal(data.width, '100', 'Bear width should be 100')
    t.equal(data.height, '62.905', 'Bear height should be 100')
    t.equal(data.type, 'SVG', 'Bear should be an SVG')
    t.end()
  })

  t.test('bear-2.svg', async t => {
    const data = await imgStats.stats(path.join(__dirname, 'files/bear-2.svg'))
    t.equal(data.width, '100', 'Bear width should be 100')
    t.equal(data.height, '62.905', 'Bear height should be 100')
    t.equal(data.type, 'SVG', 'Bear should be an SVG')
    t.end()
  })
  t.end()
})
