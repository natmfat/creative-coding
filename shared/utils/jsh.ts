export type Children = (HTMLElement | string)[];

export type Props = {
  style?: CSSStyleDeclaration;
  [key: string]: any;
};

export type HyperProxy = {
  [key: string]: (props: Props, ...children: Children) => HTMLElement;
};

const setAttributeList = ["className", "style"];

/**
 * Recursively create HTML elements
 * @param tag element tagName, like "div"
 * @param props element attributes, includes event listeners like onClick
 * @param children child HTML elements
 * @returns HTML element
 */
export function h(
  tag: string,
  props: Props = {},
  children: Children = [],
): HTMLElement {
  const element: HTMLElement = document.createElement(tag);

  // add props & event listeners
  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith("on")) {
      element.addEventListener(key.substring(2).toLowerCase(), value);
    } else if (setAttributeList.includes(key)) {
      // we're just going to assume that an object value means we should assign it
      // like Object.assign(element.style, {})
      typeof value === "object"
        ? Object.assign((element as any)[key], value)
        : ((element as any)[key] = value);
    } else {
      element.setAttribute(key, value);
    }
  }

  // append children
  for (const child of children) {
    typeof child == "string"
      ? element.appendChild(document.createTextNode(child))
      : element.appendChild(child);
  }

  return element;
}

/**
 * Javascript Hyperfunction
 * Create HTML elements by properties instead of passing in strings directly
 */
export const jsh: HyperProxy = new Proxy(
  {},
  {
    get:
      (_, tag: string) =>
      (props: Props, ...children: Children) =>
        h(tag, props, children),
  },
);
