/*
 * img-stats
 * https://github.com/jlembeck/img-stats
 *
 * Copyright (c) 2013 Jeffrey Lembeck
 * Licensed under the MIT license.
 */

'use strict'

module.exports = {
  stats
}

const fs = require('fs')
const DOMParser = require('xmldom').DOMParser

const isPng = function (data) {
  const d = data.slice(0, 16)
  return d === '89504e470d0a1a0a'
}

const isSVG = function (data) {
  for (let i = 0, l = data.length; i < l; i++) {
    let d = data.slice(i, i + 2).toString('hex')
    if (d === '73') {
      i = i + 2
      d = data.slice(i, i + 2).toString('hex')
      if (d === '76') {
        i = i + 2
        d = data.slice(i, i + 2).toString('hex')
        if (d === '67') {
          return true
        }
      }
    }
  }
  return false
}

async function stats (filename) {
  let ret = {}
  if (!filename) { throw new Error('Needs a filename') }

  const da = await getData(filename).catch(err => {
    throw err
  })


  const data = da.data
  const hexString = da.hexString

  if (isPng(hexString)) {
    ret = getPngWidthHeightType(hexString)
  } else if (isSVG(hexString)) {
    ret.type = 'SVG'
    const pxre = /(\d+)px/
    const doc = new DOMParser().parseFromString(data.toString('utf-8'))
    let width = doc.documentElement.getAttribute('width')
    let height = doc.documentElement.getAttribute('height')
    ret.width = width.replace(pxre, '$1')
    ret.height = height.replace(pxre, '$1')
  } else {
    throw new Error('Not a supported type')
  }
  return ret
}

function getPngWidthHeightType (hexString) {
  let width, height, type = 'PNG'
  let i = 16
  let l = hexString.length
  for (; i < l; i++) {
    const d = hexString.slice(i, i + 8)
    if (d === '49484452') {
      i += 8
      break
    }
  }

  width = parseInt(hexString.slice(i, i + 8).toString(16), 16)
  i += 8
  height = parseInt(hexString.slice(i, i + 8).toString(16), 16)
  return {
    width, height, type
  }
}

async function getData (filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        return reject(err)
      }
      let hexString = data.toString('hex')
      return resolve({
        data,
        hexString
      })
    })
  })
}
