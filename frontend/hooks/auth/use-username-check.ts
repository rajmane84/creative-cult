import { useState, useCallback, useRef } from 'react';
import axios from '@/lib/axios';

export function useUsernameCheck() {
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const checkUsername = useCallback((username: string) => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Validate username format before checking
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (
      username.length < 3 ||
      username.length > 30 ||
      !usernameRegex.test(username)
    ) {
      setIsUsernameAvailable(null);
      return;
    }

    // Set new timer for debounced check
    debounceTimerRef.current = setTimeout(async () => {
      setIsCheckingUsername(true);
      try {
        const response = await axios.get(
          `/user/check-username?username=${username}`
        );
        setIsUsernameAvailable(response.data.data.available);
      } catch (error) {
        console.error('Username check error:', error);
        setIsUsernameAvailable(null); // Reset to neutral on error
      } finally {
        setIsCheckingUsername(false);
      }
    }, 500); // 500ms debounce
  }, []);

  return {
    isCheckingUsername,
    isUsernameAvailable,
    checkUsername,
  };
}
