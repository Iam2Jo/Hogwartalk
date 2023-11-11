export const scrollToBottom = (
  messagesEndRef: React.RefObject<HTMLDivElement | null>,
) => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView();
  }
};

export const handleScroll = (
  e: React.UIEvent<HTMLDivElement>,
  setIsAtBottom: React.Dispatch<React.SetStateAction<boolean>>,
  messageContainerRef: React.RefObject<HTMLDivElement | null>,
) => {
  const target = e.target as HTMLDivElement;
  const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;

  if (!bottom) {
    setIsAtBottom(false);
  }

  if (target.scrollTop === 0) {
    const oldScrollHeight = target.scrollHeight;

    requestAnimationFrame(() => {
      target.scrollTop = target.scrollHeight - oldScrollHeight;
    });
  }

  if (!messageContainerRef.current) {
    return;
  }

  const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;
  const atBottom = scrollHeight - (scrollTop + clientHeight) < 10;
  setIsAtBottom(atBottom);
};
