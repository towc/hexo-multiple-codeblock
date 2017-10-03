# hexo-multiple-codeblock
hexo plugin to output a simple html structure to manage for specific language sets

# usage

input:

```
{% multicodeblock %}
---js esnext
const greeting = `hello ${name}`;
---js es5
var greeting = 'hello ' + name;
---php php
$greeting = 'hello ' . $name;
{% endmulticodeblock %}
```

pseudo-output:

```
{% raw %}
<div class="hexo-multi-codeblock">
{% endraw %}
  <!-- this will be <pre slot="esnext" ...>...</pre> -->
\`\`\`js
const greeting = `hello ${name}`;
\`\`\`
  <!-- <pre slot="es5" ...>...</pre> -->
\`\`\`js
var greeting = 'hello ' + name;
\`\`\`
  <!-- <pre slot="php" ...>...</pre> -->
\`\`\`php
$greeting = 'hello ' . $name;
{% raw %}
</div>
{% endraw %}
```


You can also use a default language:

```
{% multicodeblock js %}
--- esnext
const greeting = `hello ${name}`;
--- es5
var greeting = 'hello ' + name;
{% endmulticodeblock %}
```

# reason
This was developed for [vuejs.org](//vuejs.org), in order to extend hexo so multiple branches of javascript could be used. It's up to the developer to do what they want with the various elements, this is just a convenient way to arrange them
