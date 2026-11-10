type AttrValue = string | number | boolean | null | undefined;
type Child = Node | string;

type CreateElOptions<K extends keyof HTMLElementTagNameMap> = {
  tag?: K;
  className?: string;
} & Record<string, AttrValue>;

export default function createEl<K extends keyof HTMLElementTagNameMap = "div">(
  { tag = "div" as K, className, ...attrs }: CreateElOptions<K> = {},
  children: Child[] = [],
) {
  const el = document.createElement(tag);

  if (className) {
    el.classList.add(...className.split(" ").filter(Boolean));
  }

  for (const [name, val] of Object.entries(attrs)) {
    if (val === false || val == null) {
      continue;
    }

    el.setAttribute(name, val === true ? "" : String(val));
  }

  el.append(...children);

  return el;
}
