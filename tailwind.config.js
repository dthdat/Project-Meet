module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "10v": "10vh",
        "5v": "5vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#3c4043",
      secondary: "#202124",
      danger: "#e3342f",
      chatbox: "#40444B",
    }),
  },
  plugins: [],
};
