# markdown-it-complex-table

Markdown syntax is designed to be readable and writeable, but Markdown table is not. Because common text editor don't have concept of column and isn't always monospace fonts.

The best way to express column in common text editor is YAML. This plugin provides a simple way to write complex html.

## Install

```
npm install markdown-it-complex-table
```

## Usage

```js
import md from "markdown-it"
import complexTable from "markdown-it-complex-table"

const mdString = `
\`\`\`yaml:table
- 
  - !td
  - Mars
  - !cs 
  - Venus
  - !cs 
- 
  - !rs
  - &h1 Produced
  - &h2 Sold
  - *h1
  - *h2
---
- 
  - !th Teddy Bears
  - 50,000
  - 30,000
  - 100,000
  - 80,000
- 
  - !th Board Games
  - 10,000
  - 5,000
  - 12,000
  - 9,000
\`\`\`
` // from https://www.w3.org/WAI/tutorials/tables/irregular/

const htmlString = md().use(complexTable).parse(mdString) // "<table>...</table>"
```

`htmlString` is the following.

<blockquote>
<table>
    <col>
    <colgroup span="2"></colgroup>
    <colgroup span="2"></colgroup>
    <thead>
        <tr>
          <td rowspan="2"></td>
          <th colspan="2" scope="colgroup">Mars</th>
          <th colspan="2" scope="colgroup">Venus</th>
        </tr>
        <tr>
            <th scope="col">Produced</th>
            <th scope="col">Sold</th>
            <th scope="col">Produced</th>
            <th scope="col">Sold</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Teddy Bears</th>
            <td>50,000</td>
            <td>30,000</td>
            <td>100,000</td>
            <td>80,000</td>
        </tr>
        <tr>
            <th scope="row">Board Games</th>
            <td>10,000</td>
            <td>5,000</td>
            <td>12,000</td>
            <td>9,000</td>
        </tr>
    </tbody>
</table>
</blockquote>

<details>
<summary>HTML</summary>

```html
<table>
    <col>
    <colgroup span="2"></colgroup>
    <colgroup span="2"></colgroup>
    <thead>
        <tr>
          <td rowspan="2"></td>
          <th colspan="2" scope="colgroup">Mars</th>
          <th colspan="2" scope="colgroup">Venus</th>
        </tr>
        <tr>
            <th scope="col">Produced</th>
            <th scope="col">Sold</th>
            <th scope="col">Produced</th>
            <th scope="col">Sold</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Teddy Bears</th>
            <td>50,000</td>
            <td>30,000</td>
            <td>100,000</td>
            <td>80,000</td>
        </tr>
        <tr>
            <th scope="row">Board Games</th>
            <td>10,000</td>
            <td>5,000</td>
            <td>12,000</td>
            <td>9,000</td>
        </tr>
    </tbody>
</table>
```

</details>

## Rules

please see [here](https://www.npmjs.com/package/yaml2html-table).

## Examples

You can use Markdown sytnax in table.

```javascript
import md from "markdown-it"
import complexTable from "markdown-it-complex-table"
import hljs from "highlight.js"

const mdString = `
\`\`\`yaml:table
[Emphasis, Lists, Code Blocks]
---
- "**bold**"
- |
  - first
  - second
- |
  ~~~python
  import os
  print(f'Hello, {os.getlogin()}')
  ~~~
\`\`\`
`

const htmlString = md({
  highlight: (code, info) => {
    if (info && hljs.getLanguage(info)) {
      return hljs.highlight(code, { language: info }).value
    }
    return ""
  },
}).use(complexTable).render(mdString)
```

`htmlString` is the following.

<table>
    <thead>
        <tr>
            <th scope="col">Emphasis</th>
            <th scope="col">Lists</th>
            <th scope="col">Code Blocks</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>bold</strong></td>
            <td>
                <ul>
                    <li>first</li>
                    <li>second</li>
                </ul>
            </td>
            <td>
                <pre><code class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-built_in">print</span>(<span class="hljs-string">f'Hello, <span class="hljs-subst">{os.getlogin()}</span>'</span>)
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

<details>
<summary>HTML</summary>

```html
<table>
    <thead>
        <tr>
            <th scope="col">Emphasis</th>
            <th scope="col">Lists</th>
            <th scope="col">Code Blocks</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>bold</strong></td>
            <td>
                <ul>
                    <li>first</li>
                    <li>second</li>
                </ul>
            </td>
            <td>
                <pre><code class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-built_in">print</span>(<span class="hljs-string">f'Hello, <span class="hljs-subst">{os.getlogin()}</span>'</span>)
</code></pre>
            </td>
        </tr>
    </tbody>
</table>
```

</details>