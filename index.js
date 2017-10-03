/**
 *
 * input:
 *
 * {% multicodeblock %}
 * ---js esnext
 * const greeting = `hello ${name}`;
 * ---js es5
 * var greeting = 'hello ' + name;
 * ---php php
 * $greeting = 'hello ' . $name;
 * {% endmulticodeblock %}
 *
 * pseudo-output:
 *
 * {% raw %}
 * <div class="hexo-multi-codeblock">
 * {% endraw %}
 *   <!-- this will be <figure slot="esnext" ...>...</figure> -->
 * ```js
 * const greeting = `hello ${name}`;
 * ```
 *   <!-- <figure slot="es5" ...>...</figure> -->
 * ```js
 * var greeting = 'hello ' + name;
 * ```
 *   <!-- <figure slot="php" ...>...</figure> -->
 * ```php
 * $greeting = 'hello ' . $name;
 * {% raw %}
 * </div>
 * {% endraw %}
 *
 *
 * You can also use a default language:
 *
 * {% multicodeblock js %}
 * --- esnext
 * const greeting = `hello ${name}`;
 * --- es5
 * var greeting = 'hello ' + name;
 * {% endmulticodeblock %}
 *
 */

const { highlight } = require('hexo-util'); 

const parse = ([defaultLanguage], content) => {
  const [_, ...textParts] = content.split('---');

  const objectParts = textParts.map((textPart) => {
    const [configText, ...content] = textPart.split('\n');
    const [language, slot] = configText.split(' ');

    return {
      config: {
        language,
        slot
      },
      content: content.join('\n')
    };
  });

  const htmlParts = objectParts.map((objectPart) => {
    const codeblock = highlight(objectPart.content, { 
      lang: objectPart.config.language || defaultLanguage || 'js',
      wrap: false,
      gutter: false
    });

    const [codeblockTag, ...content] = codeblock.split('\n');
    const [codeblockTagName, ...codeblockTagParts] = codeblockTag.split('>');
    return`${codeblockTagName} slot=${objectPart.config.slot || defaultLanguage || 'js'}>${codeblockTagParts.join('>')}\n${content.join('\n')}`
  });

  return `
<div class="hexo-multi-codeblock">
\t${htmlParts.join('\n\t')}
</div>
`
}

hexo.extend.tag.register('multicodeblock', parse, {ends: true})
