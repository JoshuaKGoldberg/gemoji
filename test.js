import fs from 'node:fs'
import assert from 'node:assert'
import test from 'tape'
import {gemoji} from './index.js'

/**
 * @typedef {Object} Gemoji
 * @property {string} emoji
 * @property {string} description
 * @property {string} category
 * @property {string[]} names
 * @property {string[]} tags
 */

/**
 * @typedef {Object} Emoji
 * @property {string} emoji
 * @property {string} description
 * @property {string} category
 * @property {string[]} aliases
 * @property {string[]} tags
 */

/** @type {Emoji[]} */
const emoji = JSON.parse(String(fs.readFileSync('emoji.json')))

test('gemoji', function (t) {
  let index = -1
  /** @type {Gemoji} */
  let info

  t.plan(emoji.length)

  while (++index < gemoji.length) {
    info = gemoji[index]

    t.doesNotThrow(function () {
      assert.strictEqual(info.emoji, emoji[index].emoji, 'emoji')
      assert.strictEqual(info.category, emoji[index].category, 'category')
      assert.strictEqual(
        info.description,
        emoji[index].description,
        'description'
      )
      assert.deepStrictEqual(info.names, emoji[index].aliases, 'names')
      assert.deepStrictEqual(info.tags, emoji[index].tags, 'tags')
    }, emoji[index].emoji + '   ' + emoji[index].description)
  }

  t.end()
})
