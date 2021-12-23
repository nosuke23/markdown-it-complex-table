import * as md from "markdown-it"
import outdent from "outdent"
import mdTable from "../src/index"
import * as beautify from "js-beautify"
import hljs from "highlight.js"

it("should return table", () => {
  const expected: string = outdent`
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
  `
  console.log(md)
  const result: string = md().use(mdTable).render(outdent`
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
  `)

  expect(beautify.html(result)).toBe(beautify.html(expected))
})

it("should parse md", () => {
  const result = outdent`
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
  `

  const expected = md({
    highlight: (code, info) => {
      if (info && hljs.getLanguage(info)) {
        return hljs.highlight(code, { language: info }).value
      }
      return ""
    },
  }).use(mdTable).render(outdent`
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
  `)

  expect(beautify.html(result)).toBe(beautify.html(expected))
})
