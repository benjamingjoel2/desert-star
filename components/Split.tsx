import { Children, isValidElement, cloneElement, type ReactNode, type ReactElement } from "react";

/**
 * Splits text into words that rise from behind a mask, staggered.
 * Nested elements (e.g. <em>) keep their styling; their words are split too.
 * Without JS the text simply shows.
 */
export default function Split({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  let i = 0;
  const walk = (node: ReactNode): ReactNode =>
    Children.map(node, (child) => {
      if (typeof child === "string") {
        return child.split(/(\s+)/).map((w, k) =>
          /^\s+$/.test(w) || w === "" ? w : (
            <span key={k} className="sw"><span className="sw-i" style={{ transitionDelay: `${delay + i++ * 55}ms` }}>{w}</span></span>
          )
        );
      }
      if (isValidElement(child)) {
        const el = child as ReactElement<{ children?: ReactNode }>;
        return cloneElement(el, {}, walk(el.props.children));
      }
      return child;
    });
  return <span className="split" aria-label={typeof children === "string" ? children : undefined}>{walk(children)}</span>;
}
