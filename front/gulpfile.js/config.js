module.exports = {
  assets: './assets',
  dest: './dist',
  watch: {
    html: ['./assets/**/*.ejs', '!./assets/**/_*.ejs'],
    css: './assets/css/**/*.styl',
    script: './assets/js/**/*.js'
  },
  copy: [
    {
      from: './assets/jplayer/**/*',
      to: './dist/jplayer'
    },
    {
      from: './assets/img/**/*',
      to: './dist/img'
    },
    {
      from: './assets/**/*.json',
      to: './dist'
    },
    {
      from: './assets/audio/**/*',
      to: './dist/audio'
    },
    {
      from: './assets/movie/**/*',
      to: './dist/movie'
    }
  ],
  stylus: {
    assets: ['./assets/css/**/*.styl', '!./assets/css/**/_*.styl'],
    dest: './dist/css'
  },
  ejs: {
    assets: ['./assets/**/*.ejs', '!./assets/**/_*.ejs'],
    dest: './dist'
  },
  webpack: {
    entry: './assets/js/app.js',
    assets: './assets/js/**/*.js',
    dest: './dist/js'
  }
};
