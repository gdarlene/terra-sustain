// tailwind.config.ts
import { url } from 'inspector'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    textOpacity: true,
    textDecoration: true,
    fontFamily: true,
    fontWeight: true,
    fontSize: true,
    lineHeight: true,
    letterSpacing: true,
    
  },
  theme: {
    extend: {
       colors:{
        primary: '#02410ae9',
        secondary:'#e39206fe',
        accent: '#faec23',
        textColor:'#333333',
        hoverGrays:'#575757',
        neutral:{
          100:'#e8e8e8',
          500:'#4a4a4a',
          800: '#1a2917',
          300:'#e3e3e3',
          400:'#bdbdbd',
          600:'#c4fc90',
        },
        sectionBg:{
           50:'#f6fced',
           400:'#fffff2',
           300 :'#F4F8F3',
        },
        neutral1:{
          100:'#02410a88',
        }
       },
       fontFamily: {
       'sans': ['ui-sans-serif', 'system-ui'],
       'serif': ['ui-serif', 'Georgia'],
       'mono': ['ui-monospace', 'SFMono-Regular'],
       'display': ['"Oswald"', ""],
       'body': ["Inter","sans-serif"],
       'titles':["Poppins","sans-serif"],
       'logo':["Poppins","sans-serif"] ,
       'subheadings':['Poppins',"sans-serif"],
      },
      // Custom spacing/sizes for consistency
      spacing: {
        'header': '4rem', // Custom header padding
      },
      backgroundImage: {
        'footer-bg':'url("images/fresh-produce.jpg")',
      },
      fontSize: {
        logo:'xx-large'
      },
      // Custom shadows for cards/buttons
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}

export default config