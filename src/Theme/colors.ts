export const scales = {
  neutral: {
    N1: "#f8f9fa",
    N2: "#e9ecef",
    N3: "#dee2e6",
    N4: "#ced4da",
    N5: "#adb5bd",
    N6: "#6c757d",
    N7: "#495057",
    N8: "#343a40",
    N9: "#212529",
    N10: "#000",

    // Transparent variants.
    N1A: "rgba(0, 0, 0, 0.04)",
    N2A: "rgba(0, 0, 0, 0.06)",
    N3A: "rgba(0, 0, 0, 0.09)",
    N4A: "rgba(0, 0, 0, 0.14)",
    N5A: "rgba(0, 0, 0, 0.3)",
    N6A: "rgba(0, 0, 0, 0.47)",
    N7A: "rgba(0, 0, 0, 0.7)",
    N8A: "rgba(0, 0, 0, 0.81)"
  },

  blue: {
    B1: "#f7f9fd",
    B2: "#f1f7fc",
    B3: "#e9f2fa",
    B4: "#ddebf7",
    B5: "#b7d4ef",
    B6: "#8fbce6",
    B7: "#579ad9", // Large Text AA
    B8: "#3d8bd4", // Normal Text AA
    B9: "#1070ca", // Normal Text AAA
    B10: "#084b8a", // Normal Text AAA

    // Transparent variants.
    B1A: "rgba(16, 112, 202, 0.04)",
    B2A: "rgba(16, 112, 202, 0.06)",
    B3A: "rgba(16, 112, 202, 0.09)",
    B4A: "rgba(16, 112, 202, 0.14)",
    B5A: "rgba(16, 112, 202, 0.3)",
    B6A: "rgba(16, 112, 202, 0.47)",
    B7A: "rgba(16, 112, 202, 0.7)",
    B8A: "rgba(16, 112, 202, 0.81)"
  }
};

export const palette = {
  neutral: {
    lightest: scales.neutral.N1,
    light: scales.neutral.N4,
    base: scales.neutral.N8,
    dark: scales.neutral.N9
  },

  blue: {
    lightest: scales.blue.B1,
    light: scales.blue.B4,
    base: scales.blue.B9,
    dark: scales.blue.B10
  },

  red: {
    lightest: "#fef6f6",
    light: "#fae2e2",
    base: "#ec4c47",
    dark: "#bf0e08"
  },

  orange: {
    lightest: "#fdf8f3",
    light: "#fae3cd",
    base: "#d9822b",
    dark: "#95591e"
  },

  yellow: {
    lightest: "#fef8e7",
    light: "#fbe6a2",
    base: "#ffc107",
    dark: "#7e6514"
  },

  green: {
    lightest: "#f1faf5",
    light: "#d4eee2",
    base: "#47b881",
    dark: "#00783e"
  },

  teal: {
    lightest: "#f1fbfc",
    light: "#d2eef3",
    base: "#14b5d0",
    dark: "#007489"
  },

  purple: {
    lightest: "#f8f7fc",
    light: "#eae7f8",
    base: "#735dd0",
    dark: "#37248f"
  }
};

export default {
  background: {
    tint1: scales.neutral.N1,
    tint2: scales.neutral.N2,
    overlay: scales.neutral.N6A,

    // Non required.
    yellowTint: palette.yellow.lightest,
    greenTint: palette.green.lightest,
    orangeTint: palette.orange.lightest,
    redTint: palette.red.lightest,
    blueTint: palette.blue.lightest,
    purpleTint: palette.purple.lightest,
    tealTint: palette.teal.lightest
  },

  border: {
    default: scales.neutral.N3, // Was BorderColors.muted in v3 and under.
    muted: scales.neutral.N2 // Was BorderColors.extraMuted in v3 and under
  },

  text: {
    muted: scales.neutral.N6,
    default: scales.neutral.N8,
    dark: scales.neutral.N10,
    selected: palette.blue.base,

    // Intent.
    success: palette.green.dark,
    info: palette.blue.dark,
    danger: palette.red.dark,
    warning: palette.orange.dark
  },

  icon: {
    default: scales.neutral.N8,
    muted: scales.neutral.N7,
    disabled: scales.neutral.N5A,
    selected: palette.blue.base,

    // Intent.
    success: palette.green.base,
    info: palette.blue.base,
    danger: palette.red.base,
    warning: palette.orange.base
  },

  intent: {
    none: palette.blue.base,
    success: palette.green.base,
    danger: palette.red.base,
    warning: palette.orange.base
  }
};
