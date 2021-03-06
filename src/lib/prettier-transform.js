/**
 * Copyright 2013-2019 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// transforms a file via prettier as it's generated
// modified from https://github.com/jhipster/generator-jhipster/blob/6871b52b2336709fde83fb0dccf7165b1e227fd2/generators/generator-transforms.js
const prettier = require('prettier')
const fs = require('fs')
const defaultOptions = {
  printWidth: 140,
  singleQuote: true,
  useTabs: false,
  tabWidth: 2,
  // js and ts rules:
  arrowParens: 'avoid',
  // jsx and tsx rules:
  jsxBracketSameLine: false,
}
const prettierTransform = async file => {
  if (!file.target.endsWith('.js')) return
  /* resolve from the projects config */
  let options = await prettier.resolveConfig(file.target)
  if (!options || Object.keys(options).length === 0) {
    options = defaultOptions
  }
  const str = fs.readFileSync(file.target, 'utf8')
  // for better errors
  options.filepath = file.target
  const data = prettier.format(str, options)
  fs.writeFileSync(file.target, Buffer.from(data))
}

const prettierTransformBatch = async files => {
  await Promise.all(files.map(file => prettierTransform(file)))
}

module.exports = {
  prettierTransform,
  prettierTransformBatch,
}
