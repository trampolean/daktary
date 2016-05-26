#! /bin/sh

# Merge JS files and convert in ES5
babel \
  ./src/lib/dk-githubUrl.js \
  ./src/lib/dk-layout.js \
  ./src/lib/dk-markdown.js \
  ./src/lib/dk-router.js \
  ./src/lib/dk-template.js \
  ./src/config.js \
  ./src/init.js \
  ./src/layout-folders.js \
  ./src/layout-home.js \
  ./src/layout-repositories.js \
  ./src/layout-searchList.js \
  ./src/layout-viewer.js \
  ./src/routes.js \
  ./src/tpl-breadcrumb.js \
  ./src/tpl-contribution.js \
  ./src/tpl-crews.js \
  ./src/tpl-folders.js \
  ./src/tpl-repos.js \
  ./src/tpl-search.js \
  ./src/tpl-searchList.js > dist/dk.js

# Minify js files
uglifyjs dist/dk.js --compress -o dist/dk.min.js

# Merge and minify css files
uglifycss \
  ./css/reset.css \
  ./css/daktary.css \
  ./css/layout-home.css \
  ./css/layout-repositories.css \
  ./css/tpl-contribution.css \
  ./css/tpl-crews.css \
  ./css/tpl-search.css \
  ./css/tpl-breadcrumb.css \
  ./css/tpl-list.css \
  ./css/tpl-folder.css \
  ./css/tpl-searchList.css > dist/dk.min.css
