import plugin from "tailwindcss/plugin";

export const shadcnPlugin = plugin(
  function ({ addBase }) {
    // Add base styles.
    addBase({
      ":root": {
        "--background": "241 100% 95%",
        "--foreground": "241 5% 0%",
        "--primary": "241 55.2% 77.3%",
        "--primary-foreground": "0 0% 0%",
        "--primary-gradient":
          "linear-gradient(\n      180deg,\n      #81a3f9 -0.06%,\n      #3462d8 108.09%\n    )",
        "--primary-title": "225, 74%, 21%, 1",
        "--primary-light": "221, 100%, 97%, 1",
        "--secondary-gradient":
          "linear-gradient(\n      219.21deg,\n      #c399db -0.38%,\n      #5882f7 106.68%\n    )",
        "--secondary": "241 30% 70%",
        "--secondary-foreground": "0 0% 0%",
        "--secondary-yellow": "#f8bf2c",
        "--font-title":
          '"Space Grotesk", Arial, Helvetica, sans-serifc sans-serif',
        "--font": '"Nunito", Arial, Helvetica, sans-serifc sans-serif',
        "--muted": "203 30% 85%",
        "--muted-foreground": "241 5% 35%",
        "--popover": "241 100% 95%",
        "--popover-foreground": "241 100% 0%",
        "--card": "241 50% 90%",
        "--card-foreground": "241 5% 10%",
        "--border": "241 30% 50%",
        "--input": "241 30% 18%",
        "--accent": "203 30% 80%",
        "--accent-foreground": "241 5% 10%",
        "--destructive": "0 100% 30%",
        "--destructive-foreground": "241 5% 90%",
        "--ring": "241 55.2% 77.3%",
        "--radius": "0.5rem",
        "--placeholder": "223, 53%, 68%, 1",
        "--grey": "235, 5%, 28%, 1",
        "--stroke": "221, 100%, 97%, 1",
      },
      ".dark": {
        "--background": "241 50% 5%",
        "--foreground": "241 5% 90%",
        "--card": "241 50% 0%",
        "--card-foreground": "241 5% 90%",
        "--popover": "241 50% 5%",
        "--popover-foreground": "241 5% 90%",
        "--primary": "241 55.2% 77.3%",
        "--primary-foreground": "0 0% 0%",
        "--secondary": "241 30% 10%",
        "--secondary-foreground": "0 0% 100%",
        "--muted": "203 30% 15%",
        "--muted-foreground": "241 5% 60%",
        "--accent": "203 30% 15%",
        "--accent-foreground": "241 5% 90%",
        "--destructive": "0 100% 30%",
        "--destructive-foreground": "241 5% 90%",
        "--border": "241 30% 18%",
        "--input": "241 30% 18%",
        "--ring": "241 55.2% 77.3%",
        "--radius": "0.5rem",
      },
    });

    addBase({
      " *": {
        "@apply border-border": {},
      },
      body: {
        "@apply bg-background text-foreground text-base font": {},
      },
    });
  },
  {
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        fontFamily: {
          DEFAULT: "var(--font-nunito)",
          title: "var(--font-space-grotesk)",
        },
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          placeholder: "hsl(var(--placeholder))",
          stroke: "hsl(var(--stroke))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
            title: "hsl(var(--primary-title))",
            light: "hsl(var(--primary-light))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
            yellow: "hsl(var(--secondary-yellow))",
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
        },
        backgroundImage: {
          "primary-gradient": "var(--primary-gradient)",
          "secondary-gradient": "var(--secondary-gradient)",
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        borderImageSource: {
          "primary-gradient": "var(--primary-gradient)",
          "secondary-gradient": "var(--secondary-gradient)",
        },
        borderImage: {
          // Ajoutez la définition de votre gradient de bordure ici
          gradient: "linear-gradient(rgb(0,143,104), rgb(250,224,66)) 1",
          "secondary-gradient": "var(--secondary-gradient)",
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
  }
);
