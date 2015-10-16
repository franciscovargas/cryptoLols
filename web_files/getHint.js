Searching 28 files for "getHint" (case sensitive)

/home/francisco/cryptoLols/web_files/jscommon.js:
 11838                      !d && this._compareQueryToInputValue()
 11839                  },
 11840:                 getHintValue: function() {
 11841                      return this.$hint.val()
 11842                  },
 .....
 12092                      switch (a.type) {
 12093                          case "tabKeyed":
 12094:                             a = this.inputView.getHintValue();
 12095                              d = this.inputView.getInputValue();
 12096                              d = a && a !== d;
 .....
 12154                  _autocomplete: function(a) {
 12155                      var d, b, c, e, g;
 12156:                     ("rightKeyed" !== a.type && "leftKeyed" !== a.type || (d = this.inputView.isCursorAtEnd(), b = "ltr" === this.inputView.getLanguageDirection() ? "leftKeyed" === a.type : "rightKeyed" === a.type, d && !b)) && (c = this.inputView.getQuery(), e = this.inputView.getHintValue(),
 12157                          "" !== e && c !== e && (g = this.dropdownView.getFirstSuggestion(), this.inputView.setInputValue(g.value), this.eventBus.trigger("autocompleted", g.datum, g.dataset)))
 12158                  },
 .....
 16044                      a(d.hint);
 16045                  this.$input = a(d.input).on("blur.tt", e).on("focus.tt", f).on("keydown.tt", g);
 16046:                 0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = k.noop);
 16047                  k.isMsie() ? this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function(a) {
 16048                      c[a.which || a.keyCode] || k.defer(k.bind(n._onInput, n, a))
 .....
 16101                      switch (a) {
 16102                          case "tab":
 16103:                             c = this.getHint();
 16104                              e = this.getInputValue();
 16105                              c = c && c !== e && !d(b);
 .....
 16153                      this.setInputValue(this.query, !0)
 16154                  },
 16155:                 getHint: function() {
 16156                      return this.$hint.val()
 16157                  },
 .....
 16165                      var a, b;
 16166                      a = this.getInputValue();
 16167:                     b = this.getHint();
 16168                      b = a !== b && 0 === b.indexOf(a);
 16169                      "" !== a && b && !this.hasOverflow() || this.clearHint()
 .....
 16598                  _autocomplete: function(a) {
 16599                      var b, d, c;
 16600:                     b = this.input.getHint();
 16601                      d = this.input.getQuery();
 16602                      a = a || this.input.isCursorAtEnd();

/home/francisco/cryptoLols/web_files/pweb.js:
  614              pCrypt.lock()
  615          },
  616:         getHint: function(a, b) {
  617              HFN.apiMethod("crypto_getuserhint", {}, function(b) {
  618                  a(b.hint)

9 matches across 2 files
