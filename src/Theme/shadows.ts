import color from "color";

function alpha(c: string, amount: number) {
  return color(c)
    .alpha(amount)
    .hsl()
    .string();
}

export function createShadows(color: string) {
  const shadow = (amount: number) => alpha(color, amount);

  return {
    xs: `0 0 1px ${shadow(0.1)},
    0 0 1px 1px ${shadow(0.12)}
  `,
    sm: `0 1px 8px 0 ${shadow(0.15)}, 
    0 1px 3px 0 ${shadow(0.1)},
    0 2px 3px -2px ${shadow(0.12)}`,
    md: `0 1px 10px 0 ${shadow(0.15)}, 
    0 6px 12px 0 ${shadow(0.1)},
    0 6px 15px -2px ${shadow(0.12)}`,
    lg: `0 1px 10px 0 ${shadow(0.15)}, 
    0 15px 22px 0 ${shadow(0.1)},
    0 15px 25px -2px ${shadow(0.12)}`,
    xl: `0 1px 10px 0 ${shadow(0.15)}, 
    0 25px 35px 0 ${shadow(0.1)},
    0 25px 40px -2px ${shadow(0.12)}`
  };
}

export function createDarkShadows(color: string) {
  const shadow = (amount: number) => alpha(color, amount);
  return {
    xs: `0 0 1px ${shadow(0.15)},
    0 0 1px 1px ${shadow(0.3)}
  `,
    sm: `0 1px 8px 0 ${shadow(0.24)}, 
    0 1px 3px 0 ${shadow(0.13)},
    0 2px 3px -2px ${shadow(0.16)}`,
    md: `0 1px 10px 0 ${shadow(0.15)}, 
    0 6px 12px 0 ${shadow(0.25)},
    0 6px 15px -2px ${shadow(0.25)}`,
    lg: `0 1px 10px 0 ${shadow(0.15)}, 
    0 15px 22px 0 ${shadow(0.25)},
    0 15px 25px -2px ${shadow(0.25)}`,
    xl: `0 1px 10px 0 ${shadow(0.15)}, 
    0 25px 35px 0 ${shadow(0.25)},
    0 25px 40px -2px ${shadow(0.25)}`
  };
}
