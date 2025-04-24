import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand colors - based on #d27621, black, and dark grey
        dunkin: {
          orange: "#d27621", // Main brand color
        },
        brand: {
          // Primary amber color (#d27621)
          amber: {
            50: "#fdf3e9",
            100: "#fbe7d3",
            200: "#f7cfa7",
            300: "#f3b77b",
            400: "#ef9f4f",
            500: "#d27621", // Main brand color
            600: "#a85e1a",
            700: "#7e4714",
            800: "#54300d",
            900: "#2a1807",
          },
          // Dark theme backgrounds
          dark: {
            100: "#2d2d2d", // Dark grey
            200: "#252525",
            300: "#1f1f1f",
            400: "#181818",
            500: "#121212", // Near black
            600: "#0e0e0e",
            700: "#0a0a0a",
            800: "#050505",
            900: "#000000", // Pure black
          },
          // Neutral grays
          gray: {
            50: "#f7f7f7",
            100: "#e3e3e3",
            200: "#c8c8c8",
            300: "#a4a4a4",
            400: "#818181",
            500: "#666666",
            600: "#515151",
            700: "#434343",
            800: "#383838",
            900: "#1a1a1a",
          },
        },
        // Semantic colors - derived from our main palette
        status: {
          success: {
            light: "#e6f5e6",
            DEFAULT: "#4caf50",
            dark: "#3b8a3e",
          },
          warning: {
            light: "#fff8e1",
            DEFAULT: "#ffc107",
            dark: "#c79100",
          },
          error: {
            light: "#ffebee",
            DEFAULT: "#f44336",
            dark: "#c62828",
          },
          info: {
            light: "#e3f2fd",
            DEFAULT: "#2196f3",
            dark: "#1565c0",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
