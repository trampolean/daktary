/**
   * An object to manage Github url.
   *
   * @param {String} An HTML string reprsenting a github Url.
   *
   */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var GithubUrl = (function () {
  function GithubUrl(_ref) {
    var owner = _ref.owner;
    var repo = _ref.repo;
    var branch = _ref.branch;
    var path = _ref.path;

    _classCallCheck(this, GithubUrl);

    this.ghData = {
      keys: {
        secret: atob(GH_SECRET),
        id: atob(GH_ID)
      },
      owner: owner,
      repo: repo,
      branch: branch,
      path: path ? '/' + path : ''
    };
  }

  _createClass(GithubUrl, [{
    key: '_listMd',
    value: function _listMd(json) {
      return json.filter(function (elt) {
        if (elt.type === 'dir' || elt.name.match(/.md$/)) {
          return elt;
        }
      });
    }
  }, {
    key: '_listByFolder',
    value: function _listByFolder(json) {
      var files = [];
      var dirs = [];
      json.map(function (elt) {
        if (elt.type === 'file') {
          files.push(elt);
        }
        if (elt.type === 'dir') {
          dirs.push(elt);
        }
      });
      return dirs.concat(files);
    }
  }, {
    key: 'toGhApiSearch',
    value: function toGhApiSearch(query) {
      var owner = this.ghData.owner;

      return 'https://api.github.com/search/code' + ('?q=' + query + '+language:Markdown+user:' + owner);
    }
  }, {
    key: 'toGhApiUrl',
    value: function toGhApiUrl() {
      var _ghData = this.ghData;
      var keys = _ghData.keys;
      var owner = _ghData.owner;
      var repo = _ghData.repo;
      var branch = _ghData.branch;
      var path = _ghData.path;

      var branchParam = !!branch ? 'ref=' + branch + '&' : '';
      return 'https://api.github.com' + ('/repos/' + owner + '/' + repo + '/contents' + path) + ('?' + branchParam + 'client_id=' + keys.id + '&client_secret=' + keys.secret);
    }
  }, {
    key: 'toGhRepoApiUrl',
    value: function toGhRepoApiUrl() {
      var _ghData2 = this.ghData;
      var keys = _ghData2.keys;
      var owner = _ghData2.owner;

      return 'https://api.github.com/users/' + owner + '/repos' + ('?client_id=' + keys.id + '&client_secret=' + keys.secret);
    }
  }, {
    key: 'getHtmlBlob',
    value: function getHtmlBlob() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        fetch(_this.toGhApiUrl(), { headers: { Accept: 'application/vnd.github.v3.html' } }).then(function (response) {
          return response.text();
        }).then(function (htmlResponse) {
          resolve(htmlResponse);
        });
      });
    }
  }, {
    key: 'getMdBlob',
    value: function getMdBlob() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        fetch(_this2.toGhApiUrl(), { headers: { Accept: 'application/vnd.github.v3.raw' } }).then(function (response) {
          return response.text();
        }).then(function (mdResponse) {
          resolve(mdResponse);
        });
      });
    }
  }, {
    key: 'getJsonRepo',
    value: function getJsonRepo() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        fetch(_this3.toGhRepoApiUrl(), { headers: { Accept: 'application/vnd.github.v3' } }).then(function (response) {
          return response.json();
        }).then(function (json) {
          resolve(json);
        });
      });
    }
  }, {
    key: 'getJsonSearch',
    value: function getJsonSearch(query) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        fetch(_this4.toGhApiSearch(query), { headers: { Accept: 'application/vnd.github.v3.html' } }).then(function (response) {
          return response.json();
        }).then(function (json) {
          resolve(json);
        });
      });
    }
  }, {
    key: 'getJsonFolders',
    value: function getJsonFolders() {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        fetch(_this5.toGhApiUrl(), { headers: { Accept: 'application/vnd.github.v3' } }).then(function (response) {
          return response.json();
        }).then(function (json) {
          resolve(_this5._listByFolder(_this5._listMd(json)));
        });
      });
    }
  }]);

  return GithubUrl;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Lyt = (function () {
  function Lyt() {
    _classCallCheck(this, Lyt);

    this._htmlTpl = '';
  }

  _createClass(Lyt, [{
    key: '_getTemplateNames',
    value: function _getTemplateNames() {
      return Array.from(this._htmlTpl.querySelectorAll('[data-template]')).map(function (div) {
        return div.getAttribute('data-template');
      });
    }
  }, {
    key: 'html',
    value: function html(_html) {
      var htmlTpl = document.createElement('template');
      htmlTpl.innerHTML = _html;
      this._htmlTpl = htmlTpl.content;
    }
  }, {
    key: 'render',
    value: function render(tpl) {
      // to preserve this._htmlTpl after appendChild
      var clone = document.importNode(this._htmlTpl, true);
      document.querySelector('#container').innerHTML = '';
      document.querySelector('#container').appendChild(clone);
      this._getTemplateNames().map(function (tplName) {
        if (!template.hasOwnProperty(tplName)) {
          throw 'Template ' + tplName + ' is undefined';
        }
        return template[tplName].render();
      });
    }
  }]);

  return Lyt;
})();

var Layout = (function () {
  function Layout() {
    _classCallCheck(this, Layout);
  }

  _createClass(Layout, [{
    key: 'create',
    value: function create(name) {
      this[name] = new Lyt();
    }
  }]);

  return Layout;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Markdown = (function () {
  function Markdown(content) {
    _classCallCheck(this, Markdown);

    this.content = content;
    this.metas = {};
    if (this._isMetas()) {
      this._extractMetas();
    }
  }

  _createClass(Markdown, [{
    key: '_isMetas',
    value: function _isMetas() {
      return !!this.content.match(/---([\s\S]*?)---/);
    }
  }, {
    key: '_extractMetas',
    value: function _extractMetas() {
      var _this = this;

      this.content.match(/---([\s\S]*?)---/)[1].split('\n').filter(function (elt) {
        return elt.trim();
      }).map(function (elt) {
        var _elt$match = elt.match(/([\s\S]*?): (.*)/);

        var _elt$match2 = _slicedToArray(_elt$match, 3);

        var key = _elt$match2[1];
        var value = _elt$match2[2];

        _this.metas[key.trim()] = value.trim();
      });
    }
  }]);

  return Markdown;
})();
/**
   * A Router to manage client side url.
   *
   * @param {String} An HTML string reprsenting an arguments
   * and queries option Url.
   *
   */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Router = (function () {
  function Router() {
    _classCallCheck(this, Router);

    this.url = '';
    this.currentRoute = '';
    this.injectLayout = function () {};
    this._routes = [];
    this.params = {};
    this.queries = {};
    if (this._isOffLine()) {
      this._go503();
    }
  }

  _createClass(Router, [{
    key: '_isOffLine',
    value: function _isOffLine() {
      return !navigator.onLine;
    }
  }, {
    key: '_go503',
    value: function _go503() {
      window.location = './503.html';
    }
  }, {
    key: '_urlWithoutParams',
    value: function _urlWithoutParams() {
      return this.url.split('?')[0];
    }
  }, {
    key: '_resetRoute',
    value: function _resetRoute() {
      this.currentRoute = '';
      this.layout = '';
      this.params = {};
      this.queries = {};
    }
  }, {
    key: '_setQueries',
    value: function _setQueries() {
      var _this = this;

      var queries = this.url.split('?')[1];
      if (queries) {
        queries.split('&').map(function (query) {
          _this.queries[query.split('=')[0]] = query.split('=')[1];
        });
      }
    }
  }, {
    key: '_setParams',
    value: function _setParams(pattern) {
      var paramsName = pattern.split('/');
      var paramsValue = this._urlWithoutParams().split('/');
      for (var index in paramsName) {
        // Store all remain values
        if (paramsName[index].match(/\(\.\*\)/)) {
          this.params[paramsName[index].match(/^:(\w+)/)[1]] = paramsValue.slice(index).join('/')
          // Store single value
          ;
        } else if (paramsName[index].match(/^:/)) {
          this.params[paramsName[index].match(/^:(\w+)/)[1]] = paramsValue[index];
        }
      }
    }
  }, {
    key: '_patternToRegex',
    value: function _patternToRegex(pattern) {
      var regex = [];
      regex.push('^');
      pattern.split('/').map(function (patternItem) {
        // Capture a parameter
        if (patternItem.match(/^:/)) {
          var regTmp = '[0-9A-Za-zÀ-ſ-_.]*';
          // Capture all the parameters
          if (patternItem.match(/\(\.\*\)$/)) {
            regTmp = '[0-9A-Za-zÀ-ſ-_./]*';
          }
          // Capture optional parameters
          if (patternItem.match(/\?$/)) {
            regex.pop();
            regTmp = '(/[0-9A-Za-zÀ-ſ-_./]*|)';
          }
          regex.push(regTmp);
        } else {
          // Capture a fixed parameter
          regex.push(patternItem);
        }
        regex.push('/');
      });
      regex.pop();
      regex.push('$');
      return regex.join('');
    }
  }, {
    key: '_checkPatternWithUrl',
    value: function _checkPatternWithUrl(pattern) {
      return !!this._urlWithoutParams().match(this._patternToRegex(pattern));
    }
  }, {
    key: '_findAndSetCurrentRoute',
    value: function _findAndSetCurrentRoute() {
      var route = {};
      for (var index in this._routes) {
        route = this._routes[index];
        if (this._checkPatternWithUrl(route.pattern)) {
          // Execute the action attach on a route
          this._setParams(route.pattern);
          this._setQueries();route.action.bind(this)();
          break;
        }
      }
      return route;
    }
  }, {
    key: 'isNoRoute',
    value: function isNoRoute() {
      return !this.currentRoute;
    }
  }, {
    key: 'go',
    value: function go(url) {
      this._resetRoute();
      this.url = url || '/';
      this._findAndSetCurrentRoute();
      this.injectLayout();
      if (this.currentRoute !== 'home') {
        window.location = '#' + url;
      }
    }
  }, {
    key: 'route',
    value: function route(pattern, action) {
      this._routes.push({
        pattern: pattern,
        action: action
      });
    }
  }]);

  return Router;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Tpl = (function () {
  function Tpl(name) {
    _classCallCheck(this, Tpl);

    this._htmlTpl = '';
    this._name = name;
    this._events = {};
    this.data = function () {};
  }

  _createClass(Tpl, [{
    key: 'html',
    value: function html(_html) {
      var htmlTpl = document.createElement('template');
      htmlTpl.innerHTML = _html;
      this._htmlTpl = htmlTpl.content;
      // we don't want to inherits of old events
      this._events = {};
    }
  }, {
    key: '_renderEvents',
    value: function _renderEvents(clone) {
      var _this = this;

      var _loop = function (_event) {
        var _event$split = _event.split(' ');

        var _event$split2 = _slicedToArray(_event$split, 2);

        var evtType = _event$split2[0];
        var evtSelector = _event$split2[1];

        var func = _this._events[_event];
        clone.querySelector(evtSelector).addEventListener(evtType, function (evt) {
          return func(evt);
        });
      };

      for (var _event in this._events) {
        _loop(_event);
      }
      return clone;
    }
  }, {
    key: '_injectHtml',
    value: function _injectHtml() {
      var selector = '[data-template="' + this._name + '"]';
      var clone = document.importNode(this._htmlTpl, true);
      this._renderEvents(clone);
      document.querySelector(selector).innerHTML = '';
      document.querySelector(selector).appendChild(clone);
    }
  }, {
    key: 'renderAsync',
    value: function renderAsync() {
      this._injectHtml();
    }
  }, {
    key: 'render',
    value: function render() {
      this.data();
      if (this._htmlTpl) {
        this._injectHtml();
      }
    }
  }, {
    key: 'events',
    value: function events(_events) {
      this._events = _events;
    }
  }]);

  return Tpl;
})();

var Template = (function () {
  function Template() {
    _classCallCheck(this, Template);
  }

  _createClass(Template, [{
    key: 'create',
    value: function create(name) {
      this[name] = new Tpl(name);
    }
  }]);

  return Template;
})();
'use strict';

var GH_SECRET = 'M2NmYjI1YmNlOWE4MGFjN2E2NzIxZTg5YzkwMGVhZjM5NzEwN2Y2MA==';
var GH_ID = 'NGEzOWM4YzE4NjA3NDkxNWU1NDY=';

var CREWS = { crews: [{ title: 'Bienvenue sur multiBàO',
    label: 'Accueil Multibao',
    owner: 'multibao'
  }, {
    title: 'Réseau Transition BE',
    label: 'association Réseau Transition Wallonie Bruxelles',
    owner: 'reseautransitionwb'
  }, {
    title: 'Réseau Coop-tic',
    label: 'associations Outils Réseaux (FR) et CRIE Mouscron (BE); établissement SupAgro Florac (FR)',
    owner: 'supagroflorac'
  }, {
    title: 'Captain Berrotte',
    label: 'stagiaires travaillant sur multiBàO',
    owner: 'captain-berrotte'
  }, {
    title: 'Traducteurs agiles',
    label: 'Les Traducteurs Agiles sont une communauté d’Agilistes et de … Traducteurs.',
    owner: 'les-traducteurs-agiles'
  }, {
    title: 'Onpassealacte',
    label: 'Media web citoyen montrant des initiatives positives en vidéos',
    owner: 'onpassealacte'
  }] };
'use strict';

window.addEventListener('hashchange', function () {
  return window.location.reload(true);
});
window.addEventListener('load', function () {
  var ghUrl = window.location.toString().split('#')[1];
  router.go(ghUrl);
  if (router.isNoRoute()) {
    window.location = './404.html';
  }
});
var template = new Template();
var layout = new Layout();
/**
 * Layout for manage and display Github repositories.
 *
 */
'use strict';

{
  layout.create('folders');
  layout.folders.html('\n  <header>\n    <h1>multi<span>BàO</span></h1>\n    <div id="search-engine-wrapper" class="search-engine-wrapper" data-template="search">\n    </div>\n  </header>\n  <main>\n    <div id="breadcrumb" class="breadcrumb" data-template="breadcrumb">\n    </div>\n    <section id="gh-list" class="gh-list" data-template="folders">\n    </section>\n  </main>');
}
'use strict';

{
  layout.create('home');
  layout.home.html('\n  <header class="clearfix">\n    <h1>multi<span>BàO</span></h1>\n  </header>\n  <main>\n    <section class="home-intro">\n        <h2>Partager en équipe et au monde <span>ses apprentissages sur le faire ensemble</span></h2>\n        <a href="#multibao/contributions/blob/master/pages/commencer_ici.md">Commencer ici</a>\n        <a href="#multibao/documentation/blob/master/README.md">Guide d\'utilisation</a>\n    </section>\n    <section id="gh-crew-list" data-template="crews">\n    </section>\n  </main>');
}
/**
 * Layout for manage and display Github repositories.
 *
 */
'use strict';

{
  layout.create('repos');
  layout.repos.html('\n  <header>\n    <h1>multi<span>BàO</span></h1>\n    <div id="search-engine-wrapper" class="search-engine-wrapper" data-template="search">\n    </div>\n  </header>\n  <main>\n    <div id="breadcrumb" class="breadcrumb" data-template="breadcrumb">\n    </div>\n    <section id="gh-list" class="gh-list" data-template="repos">\n    </section>\n  </main>');
}
/**
 * Layout for manage and display Github repositories.
 *
 */
'use strict';

{
  layout.create('searchList');
  layout.searchList.html('\n  <header>\n    <h1>multi<span>BàO</span></h1>\n    <div id="search-engine-wrapper" class="search-engine-wrapper" data-template="search">\n    </div>\n  </header>\n  <main>\n    <section id="gh-list" class="gh-list" data-template="searchList">\n    </section>\n  </main>');
}
/**
* Layout for manage and display Github contribution.
*
*/
'use strict';

{
  layout.create('viewer');
  layout.viewer.html('\n    <main data-template="contribution">\n    </main>\n  ');
}
// Create a router
'use strict';

var router = new Router();

router.route('/', function () {
  this.currentRoute = 'home';
  layout.home.render();
});
router.route('search/code', function () {
  this.currentRoute = 'search';
  layout.searchList.render();
});
router.route(':owner/:repo/blob/:branch/:path(.*)', function () {
  this.currentRoute = 'blob';
  layout.viewer.render();
});
router.route(':owner/:repo/tree/:branch/:path(.*)?', function () {
  this.currentRoute = 'tree';
  layout.folders.render();
});
router.route(':owner/:repo', function () {
  this.currentRoute = 'list';
  layout.folders.render();
});
router.route(':owner', function () {
  this.currentRoute = 'repos';
  layout.repos.render();
});
'use strict';

{
  template.create('breadcrumb');

  template.breadcrumb.data = function () {
    var _router$params = router.params;
    var owner = _router$params.owner;
    var repo = _router$params.repo;
    var branch = _router$params.branch;
    var path = _router$params.path;

    var folders = [];
    if (path) {
      (function () {
        var pathByFolder = [];
        path.split('/').map(function (elt) {
          pathByFolder.push('/' + elt);
          folders.push({
            link: '#' + owner + '/' + repo + '/tree/' + branch + '' + pathByFolder.join(''),
            label: elt
          });
        });
      })();
    }
    var _ownerTpl$repoTpl$foldersTpl = {
      ownerTpl: {
        label: owner,
        link: '#' + owner
      },
      repoTpl: {
        label: repo,
        link: '#' + owner + '/' + repo + '/tree/' + branch
      },
      foldersTpl: folders
    };
    var ownerTpl = _ownerTpl$repoTpl$foldersTpl.ownerTpl;
    var repoTpl = _ownerTpl$repoTpl$foldersTpl.repoTpl;
    var foldersTpl = _ownerTpl$repoTpl$foldersTpl.foldersTpl;

    template.breadcrumb.html('<ul>\n        <li><a href="#">Accueil</a></li>\n        <li><a href="' + ownerTpl.link + '">' + ownerTpl.label + '</a></li>\n        ' + (repoTpl.label ? '<li><a href="' + repoTpl.link + '">' + repoTpl.label + '</a></li>' : '') + foldersTpl.map(function (folder) {
      return '<li><a href="' + folder.link + '">' + folder.label + '</a></li>';
    }).join('\n') + '</ul>');
  };
}
'use strict';

{
  (function () {
    var html = function html(_ref) {
      var link = _ref.link;
      var label = _ref.label;
      var _html = _ref.html;
      return '\n    <div id="parentRepo" class="breadcrumbs">\n      À retrouver dans le dépôt : <a href="' + link + '">' + label + '</a>\n    </div>\n    <article id="contribution">\n      ' + _html + '\n    </article>\n  ';
    };

    template.create('contribution');
    template.contribution.data = function () {
      var ghApi = new GithubUrl(router.params);
      ghApi.getHtmlBlob().then(function (htmlResponse) {
        var _router$params = router.params;
        var owner = _router$params.owner;
        var repo = _router$params.repo;
        var branch = _router$params.branch;
        var path = _router$params.path;

        var data = {
          html: htmlResponse,
          link: '#' + owner + '/' + repo + '/tree/' + branch + '/' + ('' + path.replace(/(\/|)[0-9A-Za-z\u00C0-\u017F\-\_\.]*$/, '')),
          label: '' + owner + ' - ' + repo
        };
        template.contribution.html(html(data));
        template.contribution.renderAsync();
      });
    };
  })();
}
/**
* Add selected in current crew and return the crews list.
*
* @param {String} An HTML string representing a github Url contribution.
* @result {Array} A array with each crew Object.
*/
'use strict';

var crewsWithSelectedClass = function crewsWithSelectedClass(owner, crews) {
  return crews.map(function (elt) {
    if (elt.owner === owner) {
      elt.classAttr = 'selected';
    }
    return elt;
  });
};
template.create('crews');
template.crews.data = function () {
  var ownerRoute = router.params.owner;
  var _crews = { crews: crewsWithSelectedClass(ownerRoute, CREWS.crews) };
  var crews = _crews.crews;

  template.crews.html('<ul>' + crews.map(function (_ref) {
    var title = _ref.title;
    var repo = _ref.repo;
    var label = _ref.label;
    var link = _ref.link;
    var owner = _ref.owner;
    var classAttr = _ref.classAttr;
    return '<li><a title="' + title + '" class="' + classAttr + '" href="#' + owner + '"' + (' data-owner="' + owner + '"><h3>' + label + '</h3><p>' + title + '</p></a></li>');
  }).join('\n') + '</ul>');
};
'use strict';

{
  (function () {
    var htmlContrib = function htmlContrib(_ref) {
      var type = _ref.type;
      var url = _ref.url;
      var name = _ref.name;
      var git_url = _ref.git_url;
      var prose_url = _ref.prose_url;
      return '<article class="gh-list-item gh-type-' + type + '">\n        <h2 class="gh-list-title"><a href="#' + url + '">' + name + '</a></h2>\n        <div class="gh-list-meta">\n          <p>Mis à jour : 02/02/16</p>\n          <p>Créé par : <a href="">pntbr</a> / Contributeurs les plus actifs :\n            <a href="">pntbr</a> / <a href="">wolffgang</a>\n          </p>\n          <p>\n           <a href="' + prose_url + '">Editer la fiche</a>\n           <a href="' + git_url + '">Voir sur Github</a>\n          </p>\n        </div>\n        <!--si <image--></image-->\n        <img src="http://placehold.it/350x150">\n        <!--/si image-->\n        <p class="gh-list-excerpt">Le début de la fiche qui parle de ...</p>\n        <a class="gh-list-readmore"\n          title="Lire la suite de la fiche Titre de la fiche"\n          href="' + url + '">Lire la fiche</a>\n      </article>';
    };

    var htmlFolder = function htmlFolder(_ref2) {
      var url = _ref2.url;
      var name = _ref2.name;
      var folders = _ref2.folders;
      var contributions = _ref2.contributions;
      var contributors = _ref2.contributors;
      var git_url = _ref2.git_url;
      var banner_url = _ref2.banner_url;
      var description = _ref2.description;
      return '<article class="gh-list-item gh-type-repo">\n          <h2 class="gh-list-title"><a href="#' + url + '">' + name + '</a></h2>\n          <div class="gh-list-meta">\n            <p>Dossiers : ' + folders + ' - Fiches : ' + contributions + '</p>\n            <p>Contributeurs : ' + contributors + '</p>\n            </p>\n            <p>\n              <a href="' + git_url + '">Voir sur Github</a>\n            </p>\n          </div>\n          <img src="' + (banner_url ? banner_url : 'http://lorempixel.com/g/350/150/') + '">\n          <p class="gh-list-excerpt">' + description + '</p>\n          <a class="gh-list-readmore"\n              title="Lire la suite de la fiche Titre de la fiche"\n              href="#' + url + '">Lire la présentation complète</a>\n        </article>';
    };

    template.create('folders');

    template.folders.data = function () {
      var ghApi = new GithubUrl(router.params);
      var html = [];
      ghApi.getJsonFolders().then(function (jsonResponse) {
        jsonResponse.map(function (_ref3) {
          var name = _ref3.name;
          var type = _ref3.type;
          var html_url = _ref3.html_url;

          var data = {
            type: type,
            url: '' + html_url.match(/^https:\/\/github.com\/(.*)/)[1],
            name: name,
            git_url: html_url,
            prose_url: ('http://prose.io/#' + html_url.match(/^https:\/\/github.com\/(.*)/)[1]).replace('blob', 'edit')
          };
          if (type === 'file') {
            html.push(htmlContrib(data));
          } else {
            data.folders = 12;
            data.contributions = 5;
            data.contributors = 'pntbr - newick - tom';
            html.push(htmlFolder(data));
          }
          template.folders.html(html.join('\n'));
        });
        template.folders.renderAsync(template.folders._htmlTpl);
      });
    };
  })();
}
'use strict';

{
  (function () {
    var htmlRepos = function htmlRepos(_ref) {
      var url = _ref.url;
      var title = _ref.title;
      var folders = _ref.folders;
      var contributions = _ref.contributions;
      var contributors = _ref.contributors;
      var git_url = _ref.git_url;
      var banner_url = _ref.banner_url;
      var description = _ref.description;
      var readme_url = _ref.readme_url;
      return '<article class="gh-list-item gh-type-repo">\n      <h2 class="gh-list-title"><a href="#' + url + '">' + title + '</a></h2>\n      <div class="gh-list-meta">\n        <p>Dossiers : ' + folders + ' - Fiches : ' + contributions + '</p>\n        <p>Contributeurs : ' + contributors + '</p>\n        </p>\n        <p>\n          <a href="' + git_url + '">Voir sur Github</a>\n        </p>\n      </div>\n      <img src="' + (banner_url ? banner_url : 'http://lorempixel.com/g/350/150/') + '">\n      <p class="gh-list-excerpt">' + description + '</p>\n      <a class="gh-list-readmore"\n          title="Lire la suite de la fiche Titre de la fiche"\n          href="#' + readme_url + '">Lire la présentation complète</a>\n    </article>';
    };

    template.create('repos');

    template.repos.data = function () {
      var ghApi = new GithubUrl(router.params);
      var html = [];
      ghApi.getJsonRepo().then(function (jsonResponse) {
        jsonResponse.map(function (_ref2) {
          var name = _ref2.name;
          var type = _ref2.type;
          var html_url = _ref2.html_url;
          var url = _ref2.url;

          var readmeUrl = { owner: router.params.owner, repo: name, branch: 'master', path: 'README.md' };
          var ghApiBlob = new GithubUrl(readmeUrl);
          ghApiBlob.getMdBlob().then(function (mdResponse) {
            var contribution = new Markdown(mdResponse);
            var data = {
              url: html_url.replace('https://github.com/', ''),
              git_url: html_url,
              readme_url: html_url.replace('https://github.com/', '') + '/blob/master/README.md',
              title: contribution.metas.titre,
              banner_url: contribution.metas.bandeau_url,
              description: contribution.metas.description,
              contributors: contribution.metas.contributeurs,
              folders: contribution.metas.dossiers,
              contributions: contribution.metas.fiches
            };
            html.push(htmlRepos(data));
            template.repos.html(html.join('\n'));
            template.repos.renderAsync(template.repos._htmlTpl);
          });
        });
      });
    };
  })();
}
'use strict';

{
  template.create('search');

  template.search.data = function () {
    template.search.html('\n      <div class="search-engine">\n        <fieldset>\n          <input id="gh-search" type="text" placeholder="Recherche">\n          <input id="button-gh-search" value="Rechercher" type="submit">\n        </fieldset>\n      </div>\n    ');
    template.search.events({
      'click #button-gh-search': function clickButtonGhSearch() {
        if (document.querySelector('#gh-search').value.length > 2) {
          var userQuery = document.querySelector('#gh-search').value;
          var apiUrl = new GithubUrl(router.params).toGhApiSearch(userQuery);
          router.go(apiUrl.replace('https://api.github.com/', ''));
        }
      },
      'keypress #gh-search': function keypressGhSearch(evt) {
        if (evt.key === 'Enter' && evt.target.value.length > 2) {
          var userQuery = evt.target.value;
          var apiUrl = new GithubUrl(router.params).toGhApiSearch(userQuery);
          router.go(apiUrl.replace('https://api.github.com/', ''));
        }
      }
    });
  };
}
'use strict';

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

{
  (function () {
    var htmlSearchList = function htmlSearchList(_ref) {
      var type = _ref.type;
      var url = _ref.url;
      var title = _ref.title;
      var authors = _ref.authors;
      var prose_url = _ref.prose_url;
      var git_url = _ref.git_url;
      var banner_url = _ref.banner_url;
      var description = _ref.description;
      return '<article class="gh-list-item gh-type-' + type + '">\n         <h2 class="gh-list-title"><a href="#' + url + '">' + title + '</a></h2>\n         <div class="gh-list-meta">\n           <p>Créé par : ' + authors + '</p>\n           <p>\n             ' + (type === 'file' ? '<a href="' + prose_url + '">Editer la fiche</a> - ' : '') + '\n             <a href="' + git_url + '">Voir sur Github</a>\n           </p>\n         </div>\n         <img src="' + banner_url + '">\n         <p class="gh-list-excerpt">' + description + '</p>\n         <a class="gh-list-readmore"\n           title="Lire la suite de la fiche Titre de la fiche"\n           href="#' + url + '">Lire la fiche</a>\n        </article>';
    };

    template.create('searchList');
    template.searchList.data = function () {
      var _router$queries$q$match = router.queries.q.match(/(.*)\+language:Markdown\+user:([0-9A-Za-z\u00C0-\u017F\-\_\.]*)/);

      var _router$queries$q$match2 = _slicedToArray(_router$queries$q$match, 3);

      var req = _router$queries$q$match2[0];
      var query = _router$queries$q$match2[1];
      var user = _router$queries$q$match2[2];

      router.params.owner = user;
      var ghApi = new GithubUrl(router.params);
      var html = [];
      ghApi.getJsonSearch(query).then(function (jsonResponse) {
        jsonResponse.items.map(function (_ref2) {
          var name = _ref2.name;
          var type = _ref2.type;
          var path = _ref2.path;
          var html_url = _ref2.html_url;
          var repository = _ref2.repository;

          var readmeUrl = { owner: router.params.owner, repo: repository.name, branch: 'master', path: path };
          var ghApiBlob = new GithubUrl(readmeUrl);
          ghApiBlob.getMdBlob().then(function (mdResponse) {
            var contribution = new Markdown(mdResponse);
            var data = {
              type: type,
              prose_url: ('http://prose.io/#' + html_url.match(/^https:\/\/github.com\/(.*)/)[1]).replace('blob', 'edit'),
              git_url: html_url,
              url: '' + repository.full_name + '/blob/master/' + path,
              description: contribution.metas.description,
              title: contribution.metas.titre,
              authors: contribution.metas.auteurs,
              banner_url: contribution.metas.bandeau_url || 'http://lorempixel.com/g/350/150/'
            };
            html.push(htmlSearchList(data));
            template.searchList.html(html.join('\n'));
            template.searchList.renderAsync(template.searchList._htmlTpl);
          });
        });
      });
    };
  })();
}

