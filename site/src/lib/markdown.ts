import DOMPurify from "dompurify";
import { JSDOM } from 'jsdom';
import { marked } from "marked";

const window = new JSDOM('').window;
/**
 * Converts markdown to sanitised HTML.
 */
export async function markdown(string: string): Promise<string> {
    const html = await marked.parse(string);
    const purify = DOMPurify(window);
    const clean = purify.sanitize(html);
    return clean;
}