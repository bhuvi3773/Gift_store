import { useEffect } from 'react';

const BASE_TITLE = 'KSR Gift Store';

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE_TITLE}` : `${BASE_TITLE} | Thoughtful Gifts, Beautifully Wrapped`;
  }, [title]);
}
