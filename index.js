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
 *   <!-- this will be <pre slot="esnext" ...>...</pre> -->
 * ```js
 * const greeting = `hello ${name}`;
 * ```
 *   <!-- <pre slot="es5" ...>...</pre> -->
 * ```js
 * var greeting = 'hello ' + name;
 * ```
 *   <!-- <pre slot="php" ...>...</pre> -->
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


const parse = ([defaultLanguage], content) => {
  const [_, textParts] = content.split('---');

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
    const pre = markdown(
      `\`\`\`${objectPart.config.language}\n${objectPart.content}`
    );

    const [preTag, ...content] = pre.split('\n');
    const [preTagName, ...preTagParts] = preTag.split(' ');
    const slottedPre = `${preTagName} slot=${objectPart.config.slot || defaultLanguage || 'js'} ${preTagParts.join(' ')}\n${content.join('\n')}`
  })

  return `
<div class="hexo-multi-codeblock">
  ${htmlParts.join('\n')}
</div>
`
}

hexo.extend.tag.register('multicodeblock', parse, {ends: true})
