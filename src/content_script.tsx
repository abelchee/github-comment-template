class TextArea {
  constructor(private readonly textarea: HTMLTextAreaElement) {}

  public replaceSelectedText(text: string) {
    const originalSelectionStart = this.textarea!.selectionStart;
    const originalSelectionEnd = this.textarea!.selectionEnd;
    this.replaceText({
      from: originalSelectionStart,
      text,
      to: originalSelectionEnd,
    });
  }

  public replaceText({
    text,
    from,
    to,
  }: {
    text: string;
    from: number;
    to: number;
  }) {
    const textLeft = this.textarea!.value.substring(0, from);
    const textRight = this.textarea!.value.substring(to);
    const value = (this.textarea!.value = `${textLeft}${text}${textRight}`);
    this.textarea!.selectionEnd = from + text.length;
    const count = (value.match(/\n/g) || []).length;
    this.textarea.style.height = `${count * 23 + 16}px`;
  }
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (
    document.activeElement &&
    document.activeElement instanceof HTMLTextAreaElement
  ) {
    const textArea = new TextArea(document.activeElement);
    textArea.replaceSelectedText(msg.template);
  }
});
