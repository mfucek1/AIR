/** The bordered box around the control: border, hover, focus, error and disabled looks. */
export function fieldBoxClasses(size: 'm' | 's', extra?: string) {
  return ['air-field-box', `air-field-box--${size}`, extra].filter(Boolean).join(' ');
}
