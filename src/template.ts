function toUTF16(codePoint: number) {
  let TEN_BITS = parseInt("1111111111", 2);
  function u(codeUnit: number) {
    return "\\u" + codeUnit.toString(16).toUpperCase();
  }

  if (codePoint <= 0xffff) {
    return u(codePoint);
  }
  codePoint -= 0x10000;

  // Shift right to get to most significant 10 bits
  let leadSurrogate = 0xd800 + (codePoint >> 10);

  // Mask to get least significant 10 bits
  let tailSurrogate = 0xdc00 + (codePoint & TEN_BITS);

  return u(leadSurrogate) + u(tailSurrogate);
}

function encode(s: string) {
  return toUTF16(s.codePointAt(0)!);
}

export const defaultTemplate1 = `### What type of comment I am giving?:
- [ ] I am trying to propose a better way of doing things
- [ ] I am asking for a clarification
- [ ] I believe there is a potential issue in these piece of codes
- [ ] These codes may didn't follow the standards

### Context and Knowledge Sharing - which may help you understand my comment

### Mainly what I want to say

\uD83E\uDD80

### Self check <!-- Should be removed -->
- [ ] I am not causing confusion
- [ ] I am trying to be helpful
`;

export const defaultTemplate2 = `\uD83E\uDD80 This is super good \uD83E\uDD80
`;
