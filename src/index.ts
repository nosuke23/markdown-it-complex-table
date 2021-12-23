import yaml2htmlTable from "yaml2html-table"
import MarkdownIt from "markdown-it"

export default (md: MarkdownIt) => {
  const origRule = md.renderer.rules.fence
    ? md.renderer.rules.fence.bind(md.renderer.rules)
    : null

  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    if (/^yaml:table(\s|:|$)/.test(token.info.trim().toLowerCase())) {
      const code: string = token.content.trim()
      return yaml2htmlTable(code, {
        callback: (src) => {
          const tokensInCell = md.parse(src, env)

          // only a paragraph
          if (
            tokensInCell.length === 3 &&
            tokensInCell[0].tag === "p" &&
            tokensInCell[tokensInCell.length - 1].tag === "p"
          ) {
            return md.renderer.render([tokensInCell[1]], options, env)
          }

          return md.render(src)
        },
      }).outerHTML
    }

    return origRule ? origRule(tokens, idx, options, env, slf) : ""
  }
}
