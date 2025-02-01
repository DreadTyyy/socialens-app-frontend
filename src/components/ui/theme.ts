import { createSystem,  defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react"

const buttonRecipe =  defineRecipe({
  // slots: ["active", "root"],
  // baseStyle: {
  //   fontWeight: "medium",
  //   px: 4,
  //   py: "20px"
  // },
  variants: {
    active: {
      true: { 
        bgColor: "#3886DE",
        color: "white"
      },
    },
  },
})

const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: {value: 'Inter, Helvetica, sans-serif'}
      },
      colors: {
        primary: {
          950: {value: '#3886DE'},
          500: {value: '#1F70CC'},
          200: {value: '#E2EDFA'},
          100: {value: 'rgb(245, 249, 253)'}
        },
        secondary: {
          950: {value: '#37DDDE'}
        },
        tertiarity: {
          950: {value: '#DEA237'},
          500: {value: '#C88D25'}
        },
        danger: {value: '#DA240C'},
        dark: {
          // 50: { value: "#e6f2ff" },
          100: { value: "#DEE1E5" },
          200: { value: "#D2D6D9" },
          300: { value: "#B7B7B7" },
          700: { value: "#2d2d30" },
          950: { value: "#0D0D0E" },
        },
      },
    },
    recipes: {
      button: buttonRecipe,
    }
  },
})

export const system = createSystem(defaultConfig, customConfig)