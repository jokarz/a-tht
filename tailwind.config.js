module.exports = {
  purge: {
    content: [
      "./src/**/*.tsx"
    ]
  },
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.6rem'
      },
      spacing: {
        '128': '128px',
        '192': '192px',
        '256': '256px',
        '320': '320px'
      },
      maxHeight: {
        '256': '256px',
      }
    },
  },
  variants: {},
  plugins: [],
}
