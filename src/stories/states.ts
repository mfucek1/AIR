/** Pseudo-state classes the stories use; storybook-addon-pseudo-states maps them to real states. */
export const pseudoStates = {
  hover: ['.is-hover'],
  active: ['.is-pressed'],
  focusVisible: ['.is-focus'],
  focusWithin: ['.is-focus-within'],
  focus: ['.is-focused'],
};

export const stateParameters = { layout: 'padded', pseudo: pseudoStates } as const;
