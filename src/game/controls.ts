/** Board order is row-major: top left through bottom right. Shared by input and its menu reference. */
export const keyboardLayouts = [
  { labels: ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'], codes: ['KeyQ', 'KeyW', 'KeyE', 'KeyA', 'KeyS', 'KeyD', 'KeyZ', 'KeyX', 'KeyC'], castLabel: 'R', castCode: 'KeyR' },
  { labels: ['7', '8', '9', '4', '5', '6', '1', '2', '3'], codes: ['Numpad7', 'Numpad8', 'Numpad9', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad1', 'Numpad2', 'Numpad3'], castLabel: '+', castCode: 'NumpadAdd' },
] as const;
