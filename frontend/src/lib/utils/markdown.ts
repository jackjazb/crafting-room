import markdownit from "markdown-it/lib";
import type { DOMAttributes } from "react";

const mdIt = markdownit();

// https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer

// Remember the old renderer if overridden, or proxy to the default renderer.
const defaultRender = mdIt.renderer.rules.link_open || function (tokens, idx, options, _env, self) {
    return self.renderToken(tokens, idx, options);
};

mdIt.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    tokens[idx]?.attrSet("target", "_blank");
    return defaultRender(tokens, idx, options, env, self);
};

type DangerouslySetInnerHTMLProp = Required<
    DOMAttributes<never>["dangerouslySetInnerHTML"]
>;

/**
 * Parses markdown into HTML and return it in the form of React's
 * dangerouslySetInnerHTML prop.
 * @param content - Markdown content
 * @returns Markdown parsed as HTML
 */
export const md = (content: string): DangerouslySetInnerHTMLProp =>
    ({ __html: mdIt.render(content) });

/**
 * Parses markdown into HTML **inline** and return it in the form of React's
 * dangerouslySetInnerHTML prop.
 *
 * Rendering *inline* means the HTML is rendered without the outer \<p\> tag.
 * @param content - Markdown content
 * @returns Markdown parsed as HTML **inline**
 */
export const mdi = (content: string): DangerouslySetInnerHTMLProp =>
    ({ __html: mdIt.renderInline(content) });
