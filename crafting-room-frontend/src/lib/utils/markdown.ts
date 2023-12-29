import markdownit from 'markdown-it/lib';
import { DOMAttributes } from 'react';

/**
 * Parse this content as markdown.
 * @param content - Target content
 * @returns Transformed content.
 */
const mdIt = markdownit();

type DangerouslySetInnerHTMLProp = Required<DOMAttributes<never>['dangerouslySetInnerHTML']>;

/**
 * Parse markdown into HTML and return it in the form of React's `dangerouslySetInnerHTML` prop.
 * @param content - Target content
 * @returns Parsed markdown HTML
 */
export const md = (content: string) =>
	({ __html: mdIt.render(content) } as DangerouslySetInnerHTMLProp);

/**
 * Parse markdown into HTML and return it in the form of React's `dangerouslySetInnerHTML` prop.
 *
 * Rending inline means the resulting HTML is without the outer `<p>` tags.
 * @param content - Target content
 * @returns Parsed markdown HTML
 */
export const mdi = (content: string) =>
	({ __html: mdIt.renderInline(content) } as DangerouslySetInnerHTMLProp);