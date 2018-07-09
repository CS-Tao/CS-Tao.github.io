new Vue({
  el: "#app",
  data: {
    author: "cs-tao",
    authorLink: "https://github.com/CS-Tao",
    musicText: " 三个人的时光",
    musicUrl:
      "https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/blog/music/homepage.mp3",
    copyright: "© 2018",
    signature:
      "也许，某天，当我们转过头，发现一切已在手里。<br>也许，某天，当我们偶一回眸，看到那人还在灯火阑珊中。",
    blogUrl: "/blog/",
    avatarUrl:
      "https://raw.githubusercontent.com/CS-Tao/blog/gh-pages/img/avatar.png",
    blogText: "CS-Tao",
    leaveTitle: "点我点我",
    returnTitle: "就很开心",
    baiduTongjiToken: "60c849aef33194f2884736dfb3f0b518",
    googleAnalyticsToken: "UA-104910484-1",
    auth: "7f1a65908b05238c21c134c764c89e28",
    authed: false,
    musicPlay: false,
    publicLinks: [
      {
        type: "mail",
        link:
          "http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&amp;amp;email=whucstao@qq.com",
        name: "MAIL",
        iconClass: "icon-mail"
      },
      {
        type: "github",
        link: "https://github.com/CS-Tao/",
        name: "GitHub",
        iconClass: "icon-github"
      },
      {
        type: "rss",
        link: "/blog/atom.xml",
        name: "RSS",
        iconClass: "icon-rss"
      }
    ],
    privateLinks: [
      {
        type: "lover",
        link: "https://lover.cs-tao.cc/",
        name: "lover",
        iconClass: "fa fa-heart"
      },
      {
        type: "gogs",
        link: "https://gogs.cs-tao.cc/",
        name: "gogs",
        iconClass: "fa fa-code-fork"
      },
      {
        type: "docker-web",
        link: "https://docker-web.cs-tao.cc/",
        name: "docker-web",
        iconClass: "fa fa-empire"
      },
      {
        type: "portainer-io",
        link: "https://portainer-io.cs-tao.cc/",
        name: "portainer-io",
        iconClass: "fa fa-codepen"
      },
      {
        type: "gallery",
        link: "https://gallery.cs-tao.cc/",
        name: "gallery",
        iconClass: "fa fa-picture-o"
      },
      {
        type: "cloud",
        link: "https://cloud.cs-tao.cc/",
        name: "cloud",
        iconClass: "fa fa-jsfiddle"
      },
      {
        type: "docker-store",
        link: "https://store.docker.com/profiles/cstao/",
        name: "docker-store",
        iconClass: "fa fa-ship"
      },
      {
        type: "docker-cloud",
        link: "https://cloud.docker.com/swarm/cstao/repository/list/",
        name: "docker-cloud",
        iconClass: "fa fa-anchor"
      }
    ]
  },
  head: {
    title: function() {
      return {
        inner: "CS-Tao",
        separator: "·"
      };
    },
    meta: [
      { name: "description", c: "Homepage of CS-Tao", id: "desc" },
      { name: "baidu-site-verification", content: "JEjptqwb98" }
    ],
    link: [
      {
        rel: "icon",
        href: "/favicon.png",
        sizes: "16x16",
        type: "image/x-icon"
      }
    ]
  },
  mounted() {
    this.checkMusicPlay();
    this.checkAuth();
    this.baiduTongji(this.baiduTongjiToken);
    this.googleAnalytics(this.googleAnalyticsToken);
    var OriginTitile = document.title,
      titleTime;
    var app = this;
    document.addEventListener("visibilitychange", function() {
      if (document.hidden) {
        document.title = app.leaveTitle;
        clearTimeout(titleTime);
      } else {
        document.title = app.returnTitle;
        titleTime = setTimeout(function() {
          document.title = OriginTitile;
        }, 2000);
      }
    });
  },
  methods: {
    checkAuth() {
      if (
        !!localStorage.homepageAuthForCSTaoOrFriend &&
        localStorage.homepageAuthForCSTaoOrFriend === this.auth
      )
        this.authed = true;
      else this.authed = false;
    },
    baiduTongji(token) {
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?" + token;
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    },
    googleAnalytics(token) {
      (function(i, s, o, g, r, a, m) {
        i["GoogleAnalyticsObject"] = r;
        (i[r] =
          i[r] ||
          function() {
            (i[r].q = i[r].q || []).push(arguments);
          }),
          (i[r].l = 1 * new Date());
        (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
      })(
        window,
        document,
        "script",
        "//www.google-analytics.com/analytics.js",
        "ga"
      );
      ga("create", token, "auto");
      ga("send", "pageview");
    },
    lockClicked () {
      this.checkAuth()
      if (this.authed) localStorage.homepageAuthForCSTaoOrFriend = null;
      else window.location = './authentication/index.html'
      this.checkAuth()
    },
    musicClicked () {
      var audio = document.getElementById('bgm')
      if (!this.musicPlay) {
        localStorage.homepageMusicPlay = 1
        this.musicPlay = true
        if (audio !== null && audio.paused)
          audio.play()
      } else {
        localStorage.homepageMusicPlay = 0
        this.musicPlay = false
        if (audio !== null && !audio.paused)
          audio.pause()
      }
    },
    checkMusicPlay () {
      var audio = document.getElementById('bgm')
      if (localStorage.homepageMusicPlay && localStorage.homepageMusicPlay == 1) {
        this.musicPlay = true
        if (audio !== null && audio.paused)
          audio.play()
      }
      else {
        this.musicPlay = false
        if (audio !== null && !audio.paused)
          audio.pause()
      }
    }
  }
});
