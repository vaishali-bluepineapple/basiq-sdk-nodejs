!(function(n, t) {
    "object" == typeof exports && "object" == typeof module
      ? (module.exports = t(require("request")))
      : "function" == typeof define && define.amd
      ? define(["request"], t)
      : "object" == typeof exports
      ? (exports.library = t(require("request")))
      : (n.library = t(n.request));
  })(global, function(n) {
    return (function(n) {
      var t = {};
      function e(i) {
        if (t[i]) return t[i].exports;
        var r = (t[i] = { i: i, l: !1, exports: {} });
        return n[i].call(r.exports, r, r.exports, e), (r.l = !0), r.exports;
      }
      return (
        (e.m = n),
        (e.c = t),
        (e.d = function(n, t, i) {
          e.o(n, t) || Object.defineProperty(n, t, { enumerable: !0, get: i });
        }),
        (e.r = function(n) {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(n, "__esModule", { value: !0 });
        }),
        (e.t = function(n, t) {
          if ((1 & t && (n = e(n)), 8 & t)) return n;
          if (4 & t && "object" == typeof n && n && n.__esModule) return n;
          var i = Object.create(null);
          if (
            (e.r(i),
            Object.defineProperty(i, "default", { enumerable: !0, value: n }),
            2 & t && "string" != typeof n)
          )
            for (var r in n)
              e.d(
                i,
                r,
                function(t) {
                  return n[t];
                }.bind(null, r)
              );
          return i;
        }),
        (e.n = function(n) {
          var t =
            n && n.__esModule
              ? function() {
                  return n.default;
                }
              : function() {
                  return n;
                };
          return e.d(t, "a", t), t;
        }),
        (e.o = function(n, t) {
          return Object.prototype.hasOwnProperty.call(n, t);
        }),
        (e.p = ""),
        e((e.s = 0))
      );
    })([
      function(n, t, e) {
        n.exports = {
          Session: e(1),
          User: e(5),
          Connection: e(6),
          Job: e(7),
          FilterBuilder: e(9)
        };
      },
      function(n, t, e) {
        const i = e(2),
          r = e(5),
          o = function(n, t) {
            if (!this) return new o(n, t);
            t = t || "1.0";
            let e = null;
            const s = this;
            return (
              (this.sessionTimestamp = null),
              (this.API = new i("https://au-api.basiq.io")
                .setHeader("Authorization", "Basic " + n)
                .setHeader("basiq-version", t)),
              (this.expired = function() {
                return Date.now() - s.sessionTimestamp > 36e5;
              }),
              (this.getToken = function() {
                return s.expired()
                  ? new Promise(function(t, i) {
                      return s.API.setHeader("Authorization", "Basic " + n)
                        .send("token", "POST")
                        .then(function(n) {
                          (s.sessionTimestamp = Date.now()),
                            (e = n.access_token),
                            s.API.setHeader(
                              "Authorization",
                              "Bearer " + n.access_token
                            ),
                            t(!0);
                        })
                        .catch(function(n) {
                          i(n);
                        });
                    })
                  : new Promise(function(n) {
                      n(!0);
                    });
              }),
              (this.createUser = function(n) {
                return new r(s).new(n);
              }),
              (this.getUser = function(n) {
                return new r(s).get(n);
              }),
              (this.forUser = function(n) {
                return new r(s).for(n);
              }),
              (this.getInstitutions = function() {
                return new Promise(function(n, t) {
                  return s
                    .getToken()
                    .then(function() {
                      return s.API.send("institutions", "GET");
                    })
                    .then(function(t) {
                      n(t);
                    })
                    .catch(function(n) {
                      t(n);
                    });
                });
              }),
              (this.getInstitution = function(n) {
                return new Promise(function(t, e) {
                  return s
                    .getToken()
                    .then(function() {
                      return s.API.send("institutions/" + n, "GET");
                    })
                    .then(function(n) {
                      t(n);
                    })
                    .catch(function(n) {
                      e(n);
                    });
                });
              }),
              new Promise(function(n, t) {
                s.getToken()
                  .then(function() {
                    n(s);
                  })
                  .catch(function(n) {
                    t(n);
                  });
              })
            );
          };
        n.exports = o;
      },
      function(n, t, e) {
        const i = e(3),
          r = e(4),
          o = function(n) {
            return (
              (this.options = {
                host: n,
                headers: { "Content-Type": "application/json" }
              }),
              this
            );
          };
        (o.prototype.setHeader = function(n, t) {
          return (this.options.headers[n] = t), this;
        }),
          (o.prototype.send = function(n, t, e) {
            const o = {};
            return (
              (o.uri = this.options.host + "/" + n),
              (o.method = t.toUpperCase()),
              (o.headers = (function(n) {
                if (null === n || "object" != typeof n) return n;
                const t = n.constructor();
                for (let e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
                return t;
              })(this.options.headers)),
              e &&
                ((o.body = JSON.stringify(e)),
                (o.headers["Content-Length"] = o.body.length)),
              new Promise(function(n, t) {
                i(o, function(e, i, o) {
                  if (e || i.statusCode > 299)
                    return t(e || new r(o, i.statusCode));
                  try {
                    n(o ? JSON.parse(o) : {});
                  } catch (n) {
                    t(n);
                  }
                });
              })
            );
          }),
          (n.exports = o);
      },
      function(t, e) {
        t.exports = n;
      },
      function(n, t) {
        n.exports = function n(t, e) {
          if (void 0 === this) return new n(t, e);
          if ("object" == typeof t) return t;
          let i;
          try {
            i = JSON.parse(t);
          } catch (n) {
            return n;
          }
          (this.statusCode = e),
            (this.response = i),
            (this.message = i.data
              .reduce(function(n, t) {
                return n + (t.detail + " ");
              }, "")
              .trim());
        };
      },
      function(n, t, e) {
        const i = e(6),
          r = e(8),
          o = e(9),
          s = function(n, t) {
            (this.id = n.id ? n.id : null),
              (this.email = n.email ? n.email : null),
              (this.mobile = n.mobile ? n.mobile : null),
              (this.service = t);
            const e = this;
            (this.createConnection = function(n, t, i, r, o) {
              return e.service.createConnection(e, n, t, i, r, o);
            }),
              (this.update = function(n) {
                return e.service.update(e, n);
              }),
              (this.delete = function() {
                return e.service.delete(e);
              }),
              (this.refreshAllConnections = function() {
                return e.service.refreshAllConnections(e);
              }),
              (this.listAllConnections = function(n) {
                return e.service.getAllConnections(e, n);
              }),
              (this.getAccount = function(n) {
                return e.service.getAccount(e, n);
              }),
              (this.getAccounts = function(n) {
                return e.service.getAccounts(e, n);
              }),
              (this.getTransaction = function(n) {
                return e.service.getTransaction(e, n);
              }),
              (this.getTransactions = function(n) {
                return e.service.getTransactions(e, n);
              });
          };
        n.exports = function(n) {
          if (!n) throw new Error("No session provided");
          const t = this;
          return (
            (this.new = function(e) {
              return new Promise(function(i, r) {
                return (
                  (e && (e.email || e.mobile)) ||
                    r(new Error("No email or phone number provided for user")),
                  n
                    .getToken()
                    .then(function() {
                      return n.API.send("users", "POST", e);
                    })
                    .then(function(n) {
                      i(new s(n, t));
                    })
                    .catch(function(n) {
                      r(n);
                    })
                );
              });
            }),
            (this.get = function(e) {
              return new Promise(function(i, r) {
                return (
                  e || r(new Error("No id provided for user")),
                  n
                    .getToken()
                    .then(function() {
                      return n.API.send("users/" + e, "GET");
                    })
                    .then(function(n) {
                      i(new s(n, t));
                    })
                    .catch(function(n) {
                      r(n);
                    })
                );
              });
            }),
            (this.for = function(n) {
              if (!n) throw new Error("No id provided for user");
              return new s({ id: n }, t);
            }),
            (this.update = function(e, i) {
              return new Promise(function(r, o) {
                return (
                  e.id || o(new Error("User has not been initialized")),
                  n
                    .getToken()
                    .then(function() {
                      return n.API.send("users/" + e.id, "POST", i);
                    })
                    .then(function(n) {
                      n.id || o(n), r(new s(n, t));
                    })
                    .catch(function(n) {
                      o(n);
                    })
                );
              });
            }),
            (this.delete = function(t) {
              return new Promise(function(e, i) {
                return (
                  t.id || i(new Error("User has not been initialized")),
                  n
                    .getToken()
                    .then(function() {
                      return n.API.send("users/" + t.id, "DELETE");
                    })
                    .then(function() {
                      e(!0);
                    })
                    .catch(function(n) {
                      i(n);
                    })
                );
              });
            }),
            (this.createConnection = function(t, e, r, o, s, u) {
              return new i(n, t).new(e, r, o, s, u);
            }),
            (this.getAllConnections = function(t, e) {
              return new Promise(function(i, r) {
                let s = "users/" + t.id + "/connections";
                return (
                  e &&
                    (e instanceof o ||
                      r(
                        new Error(
                          "Filter argument must be an instance of FilterBuilder"
                        )
                      ),
                    (s = s + "?" + e.getFilter())),
                  n
                    .getToken()
                    .then(function() {
                      return n.API.send(s, "GET");
                    })
                    .then(function(n) {
                      i(n);
                    })
                    .catch(function(n) {
                      r(n);
                    })
                );
              });
            }),
            (this.refreshAllConnections = function(t) {
              return new Promise(function(e, i) {
                return n
                  .getToken()
                  .then(function() {
                    return n.API.send(
                      "users/" + t.id + "/connections/refresh",
                      "POST"
                    );
                  })
                  .then(function(n) {
                    n.data || i("Invalid API response: " + JSON.stringify(n)),
                      e(n.data);
                  })
                  .catch(function(n) {
                    i(n);
                  });
              });
            }),
            (this.getAccounts = function(t, e) {
              return new Promise(function(i, r) {
                return n.getToken().then(function() {
                  let s = "users/" + t.id + "/accounts";
                  e &&
                    (e instanceof o ||
                      r(
                        new Error(
                          "Filter argument must be an instance of FilterBuilder"
                        )
                      ),
                    (s = s + "?" + e.getFilter())),
                    n.API.send(s, "GET")
                      .then(function(n) {
                        i(n);
                      })
                      .catch(function(n) {
                        r(n);
                      });
                });
              });
            }),
            (this.getAccount = function(t, e) {
              return new Promise(function(i, r) {
                return n
                  .getToken()
                  .then(function() {
                    return n.API.send("users/" + t.id + "/accounts/" + e, "GET");
                  })
                  .then(function(n) {
                    i(n);
                  })
                  .catch(function(n) {
                    r(n);
                  });
              });
            }),
            (this.getTransactions = function(t, e) {
              return new Promise(function(i, s) {
                return n.getToken().then(function() {
                  let u = "users/" + t.id + "/transactions";
                  e &&
                    (e instanceof o ||
                      s(
                        new Error(
                          "Filter argument must be an instance of FilterBuilder"
                        )
                      ),
                    (u = u + "?" + e.getFilter())),
                    n.API.send(u, "GET")
                      .then(function(t) {
                        i(new r(t, n));
                      })
                      .catch(function(n) {
                        s(n);
                      });
                });
              });
            }),
            (this.getTransaction = function(t, e) {
              return new Promise(function(i, r) {
                return n
                  .getToken()
                  .then(function() {
                    return n.API.send(
                      "users/" + t.id + "/transactions/" + e,
                      "GET"
                    );
                  })
                  .then(function(n) {
                    i(n);
                  })
                  .catch(function(n) {
                    r(n);
                  });
              });
            }),
            t
          );
        };
      },
      function(n, t, e) {
        const i = e(7),
          r = function(n, t) {
            (this.id = n.id ? n.id : null),
              (this.institution = n.institution ? n.institution : null),
              (this.accounts = n.accounts ? n.accounts : null),
              (this.status = n.status ? n.status : null);
            const e = this;
            (this.service = t),
              (this.update = function(n, t, i) {
                return e.service.update(e, n, t, i);
              }),
              (this.refresh = function() {
                return e.service.refresh(e);
              }),
              (this.delete = function() {
                return e.service.delete(e);
              });
          };
        n.exports = function(n, t) {
          if (!n) throw new Error("No session provided");
          if (!t) throw new Error("User not initialized");
          const e = this;
          return (
            (e.data = { job: null }),
            (this.new = function(r, o, s, u, c) {
              if (!o)
                throw new Error(
                  "No user id provided: " + JSON.stringify(arguments)
                );
              if (!s)
                throw new Error(
                  "No password provided: " + JSON.stringify(arguments)
                );
              if (!r)
                throw new Error(
                  "No institution id provided: " + JSON.stringify(arguments)
                );
              secondaryLoginId = c;
              (o = o.trim()),
                (s = s.trim()),
                (u = u && u.trim()),
                (secondaryLoginId = secondaryLoginId && secondaryLoginId.trim());
              const f = { loginId: o, password: s, institution: { id: r } };
              return (
                u && u.length > 0 && (f.securityCode = u),
                secondaryLoginId &&
                  secondaryLoginId.length > 0 &&
                  (f.secondaryLoginId = secondaryLoginId),
                new Promise(function(r, o) {
                  return n
                    .getToken()
                    .then(function() {
                      return n.API.send(
                        "users/" + t.id + "/connections",
                        "POST",
                        f
                      );
                    })
                    .then(function(t) {
                      t.id || o(t), r(new i(n, e).for(t));
                    })
                    .catch(function(n) {
                      o(n);
                    });
                })
              );
            }),
            (this.get = function(i) {
              if (!i)
                throw new Error(
                  "No connection id provided: " + JSON.stringify(arguments)
                );
              return new Promise(function(o, s) {
                return n
                  .getToken()
                  .then(function() {
                    return n.API.send(
                      "users/" + t.id + "/connections/" + i,
                      "GET"
                    );
                  })
                  .then(function(n) {
                    n.id || s(n), o(new r(n, e));
                  })
                  .catch(function(n) {
                    s(n);
                  });
              });
            }),
            (this.update = function(r, o, s, u) {
              if (!o)
                throw new Error("No password provided for connection update");
              if (!r.institution.id)
                throw new Error("No institution id set for connection");
              const c = { password: o, institution: { id: r.institution.id } };
              return (
                s && s.length > 0 && (c.securityCode = s),
                u && u.length > 0 && (c.secondaryLoginId = u),
                new Promise(function(o, s) {
                  return n
                    .getToken()
                    .then(function() {
                      return n.API.send(
                        "users/" + t.id + "/connections/" + r.id,
                        "POST",
                        c
                      );
                    })
                    .then(function(t) {
                      (t && t.id) || s(t), o(new i(n, e).for(t));
                    })
                    .catch(function(n) {
                      s(n);
                    });
                })
              );
            }),
            (this.delete = function(e) {
              return new Promise(function(i, r) {
                return n
                  .getToken()
                  .then(function() {
                    return n.API.send(
                      "users/" + t.id + "/connections/" + e.id,
                      "DELETE"
                    );
                  })
                  .then(function() {
                    i(!0);
                  })
                  .catch(function(n) {
                    r(n);
                  });
              });
            }),
            (this.refresh = function(r) {
              return new Promise(function(o, s) {
                return n
                  .getToken()
                  .then(function() {
                    return n.API.send(
                      "users/" + t.id + "/connections/" + r.id + "/refresh",
                      "POST"
                    );
                  })
                  .then(function(t) {
                    t.id || s(t), o(new i(n, e).get(t.id));
                  })
                  .catch(function(n) {
                    s(n);
                  });
              });
            }),
            (this.for = function(n, t) {
              if (!n) throw new Error("No connection id provided");
              const i = { id: n };
              return t && (i.institution = { id: t }), new r(i, e);
            }),
            this
          );
        };
      },
      function(n, t, e) {
        e(6);
        const i = function(n, t) {
          (this.id = n.id ? n.id : null),
            (this.created = n.created ? n.created : null),
            (this.updated = n.updated ? n.updated : null),
            (this.steps = n.steps ? n.steps : null),
            (this.links = n.links ? n.links : null);
          const e = this;
          (this.service = t),
            (this.getConnectionId = function() {
              return e.links && e.links.source
                ? e.links.source.substr(e.links.source.lastIndexOf("/") + 1)
                : "";
            }),
            (this.refresh = function() {
              return this.service.get(e.id);
            }),
            (this.getCurrentStep = function() {
              let n = { title: "uninitialized" };
              for (let t in e.steps)
                e.steps.hasOwnProperty(t) &&
                  "success" === e.steps[t].status &&
                  (n = e.steps[t]);
              return n;
            }),
            (this.waitForCredentials = function(n, t) {
              return this.service.waitForCredentials(e, n, t);
            }),
            (this.getConnection = function() {
              return this.service.getConnection(e);
            }),
            (this.canFetchTransactions = function() {
              return e.service.canFetchTransactions(e);
            }),
            (this.canFetchAccounts = function() {
              return e.service.canFetchAccounts(e);
            });
        };
        n.exports = function(n, t) {
          const e = this;
          (this.connectionService = t),
            (this.get = function(t) {
              if (!t) throw new Error("No job id provided");
              return new Promise(function(r, o) {
                return n
                  .getToken()
                  .then(function() {
                    return n.API.send("jobs/" + t, "GET");
                  })
                  .then(function(n) {
                    r(new i(n, e));
                  })
                  .catch(function(n) {
                    o(n);
                  });
              });
            }),
            (this.for = function(n) {
              if (!n.id) throw new Error("No job id provided");
              return new i(n, e);
            }),
            (this.getConnection = async function(n) {
              let i;
              return (
                (i =
                  "" === n.getConnectionId()
                    ? (await e.get(n.id)).getConnectionId()
                    : n.getConnectionId()),
                t.get(i)
              );
            }),
            (this.waitForCredentials = function(n, e, i) {
              const r = Date.now();
              return new Promise(async function(o, s) {
                const u = async function(c) {
                  if (Date.now() - r > 1e3 * i)
                    return s({
                      timeout: !0,
                      message: "The operation has timed out"
                    });
                  const f = (n = await n.refresh()).steps && n.steps[0];
                  if (
                    f.status &&
                    "in-progress" !== f.status &&
                    "pending" !== f.status
                  )
                    return "success" === f.status || "failed" === f.status
                      ? o(t.get(n.getConnectionId()))
                      : o(null);
                  setTimeout(u.bind(null, ++c), e);
                };
                setTimeout(u.bind(null, 0), 0);
              });
            }),
            (this.canFetchTransactions = async function(n) {
              return (
                n.steps || (n = await n.refresh()),
                "retrieve-accounts" === n.getCurrentStep().title ||
                  "retrieve-transactions" === n.getCurrentStep().title
              );
            }),
            (this.canFetchAccounts = async function(n) {
              return (
                n.steps || (n = await n.refresh()),
                "retrieve-accounts" === n.getCurrentStep().title &&
                  "success" === n.getCurrentStep().status
              );
            });
        };
      },
      function(n, t) {
        n.exports = function(n, t) {
          (this.data = n.data), (this.links = n.links), (this.session = t);
          const e = this;
          return (
            (this.next = function() {
              if (!e.links || !e.links.next) return !1;
              const n = e.links.next.substr(e.links.next.indexOf(".io/") + 4);
              return new Promise(function(i, r) {
                return t
                  .getToken()
                  .then(function() {
                    return t.API.send(n, "GET");
                  })
                  .then(function(n) {
                    if (n.data && 0 === n.data.length) return i(!1);
                    (e.data = n.data), (e.links = n.links), i(!0);
                  })
                  .catch(function(n) {
                    r(n);
                  });
              });
            }),
            this
          );
        };
      },
      function(n, t) {
        n.exports = function n(t) {
          if (!this) return new n(t);
          this.filters = t || [];
          const e = this;
          return (
            (this.eq = function(n, t) {
              return e.filters.push(n + ".eq('" + t + "')"), e;
            }),
            (this.gt = function(n, t) {
              return e.filters.push(n + ".gt('" + t + "')"), e;
            }),
            (this.gteq = function(n, t) {
              return e.filters.push(n + ".gteq('" + t + "')"), e;
            }),
            (this.lt = function(n, t) {
              return e.filters.push(n + ".lt('" + t + "')"), e;
            }),
            (this.lteq = function(n, t) {
              return e.filters.push(n + ".lteq('" + t + "')"), e;
            }),
            (this.bt = function(n, t, i) {
              return e.filters.push(n + ".bt('" + t + "','" + i + "')"), e;
            }),
            (this.toString = function() {
              return e.filters.join(",");
            }),
            (this.getFilter = function() {
              return "filter=" + e.filters.join(",");
            }),
            (this.setFilter = function(n) {
              return (e.filters = n), e;
            }),
            this
          );
        };
      }
    ]);
  });
  