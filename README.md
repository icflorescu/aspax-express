## What's this?
A module that enables [Express.js](http://expressjs.com) to serve assets built and packaged by [ASPAX](http://aspax.github.io).

## Installation
Run this in your application folder:

    npm install aspax-express --save

## Usage
Quick steps:

1. Create a folder structure similar to this one for your project:

        /assets        -> asset sources
        /server        -> main Express.js application folder
        /server/public -> public static folder

   Notice: put all your asset sources in `/assets`; **don't put anything** in `/server/public`, as **it will be overwritten**.

2. Create `/assets/aspax.yml` describing your assets configuration:

        js/app.js|fp|min:
          - lib/bootstrap/js/bootstrap.js
          - lib/moment.js
          - lib/jade/runtime.js
          - scripts/namespaces.coffee|bare
          - templates/now.jade
          - scripts/index.ls|bare

        css/app.css|fp|min:
          - lib/bootstrap/css/bootstrap.css
          - lib/bootstrap/css/bootstrap-theme.css
          - styles/index.styl|nib

        favicon.png: images/favicon.png

        ...

3. Install ASPAX globally if you haven’t already, [install aspax-express](#installation) in your application, and also make sure to install any necessary source handling plugins:

        # Global ASPAX
        npm install aspax -g

        cd server

        # ASPAX-Express
        npm install aspax-express --save

        # Source handling plugins
        npm install aspax-coffee-handler --save-dev
        npm install aspax-ls-handler --save-dev
        npm install aspax-jade-handler --save-dev
        npm install aspax-styl-handler --save-dev

4. Add `require('aspax-express')(app, path.join(__dirname, 'aspax.json'))` **before handling views** in your main application script (usually `/server/app.js`):

        var express = require('express')
          , app = express();

        ...
        require('aspax-express')(app, path.join(__dirname, 'aspax.json'));
        app.use app.router;
        app.get('/:page', function(req, res) {
        ...
        });

5. Wrap the URLs in your views into `asset()` function calls:

        //- link(rel="shortcut icon", href="/favicon.png")
        link(rel="shortcut icon", href=asset('favicon.png'))

6. Then, in your `/server` folder you can run:

        # watch and build on-the-fly during development
        aspax -s ../client watch

        # build for development
        aspax -s ../client build

        # pack for production (will compile, concat, minify and fingerprint)
        aspax -s ../client pack

        # clean everything
        aspax -s ../client clean

7. Run your application in **development** or **production** mode:

        # development
        #
        NODE_ENV=development node start.js
        # ...or
        NODE_ENV=development nodemon -e js,json,coffee -x node

        # production
        #
        NODE_ENV=production node start.js

   Notice: if you're using `nodemon` in development mode, add `aspax.json` to `.nodemonignore` to avoid restarting the application whenever an asset is rebuilt.

Have a look at [this demo repository](https://github.com/icflorescu/aspax-demo) to see it in action.

## What does it **actually** do?
In plain English:

- It does nothing in development mode;
- In production mode, on application startup it reads the map produced by `aspax pack` and registers the `app.locals.asset()` method you can use translate all the asset URLs in your views.

Have a look at the main file [here](https://github.com/icflorescu/aspax-express/blob/master/index.js) for details.

## Endorsing the author
If you find this piece of software useful, please [![endorse](https://api.coderwall.com/icflorescu/endorsecount.png)](https://coderwall.com/icflorescu) me on Coderwall!
