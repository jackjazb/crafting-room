import markdownit from 'markdown-it/lib';
import { DOMAttributes } from 'react';

/**
 * Parse this content as markdown.
 * @param content - Target content
 * @returns Transformed content.
 */
const md = markdownit();

type DangerouslySetInnerHTMLProp = DOMAttributes<never>['dangerouslySetInnerHTML'];

/**
 * Parse markdown into HTML and return it in the form of React's `dangerouslySetInnerHTML` prop.
 * @param content - Target content
 * @returns Parsed markdown HTML
 */
export const markdown = (content: string) => {
	const prop: DangerouslySetInnerHTMLProp = { __html: md.render(content) };
	return prop;
};

/**
 * Parse markdown into HTML and return it in the form of React's `dangerouslySetInnerHTML` prop.
 *
 * Rending inline means the resulting HTML is without the outer `<p>` tags.
 * @param content - Target content
 * @returns Parsed markdown HTML
 */
export const markdownInline = (content: string) => {
	const prop: DangerouslySetInnerHTMLProp = { __html: md.renderInline(content) };
	return prop;
};