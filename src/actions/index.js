const DISPLAY = 'Display';

export function updateDisplay(newDisplay) {
  return {
    type: DISPLAY,
    payload: newDisplay
  }
};
