'use strict';

var Jest  = require("../src/jest.js");
var Curry = require("bs-platform/lib/js/curry.js");

describe("Fake Timers", (function () {
        Jest.test("runAllTimers", (function () {
                var flag = [/* false */0];
                jest.useFakeTimers();
                setTimeout((function () {
                        flag[0] = /* true */1;
                        return /* () */0;
                      }), 0);
                var before = flag[0];
                jest.runAllTimers();
                return Curry._2(Jest.Expect[/* Operators */24][/* = */5], Jest.Expect[/* expect */0](/* tuple */[
                                before,
                                flag[0]
                              ]), /* tuple */[
                            /* false */0,
                            /* true */1
                          ]);
              }));
        Jest.test("runAllTicks", (function () {
                var flag = [/* false */0];
                jest.useFakeTimers();
                process.nextTick((function () {
                        flag[0] = /* true */1;
                        return /* () */0;
                      }));
                var before = flag[0];
                jest.runAllTicks();
                return Curry._2(Jest.Expect[/* Operators */24][/* = */5], Jest.Expect[/* expect */0](/* tuple */[
                                before,
                                flag[0]
                              ]), /* tuple */[
                            /* false */0,
                            /* true */1
                          ]);
              }));
        Jest.test("runAllImmediates", (function () {
                var flag = [/* false */0];
                jest.useFakeTimers();
                setImmediate((function () {
                        flag[0] = /* true */1;
                        return /* () */0;
                      }));
                var before = flag[0];
                jest.runAllImmediates();
                return Curry._2(Jest.Expect[/* Operators */24][/* = */5], Jest.Expect[/* expect */0](/* tuple */[
                                before,
                                flag[0]
                              ]), /* tuple */[
                            /* false */0,
                            /* true */1
                          ]);
              }));
        Jest.test("runTimersToTime", (function () {
                var flag = [/* false */0];
                jest.useFakeTimers();
                setTimeout((function () {
                        flag[0] = /* true */1;
                        return /* () */0;
                      }), 1500);
                var before = flag[0];
                jest.runTimersToTime(1000);
                var inbetween = flag[0];
                jest.runTimersToTime(1000);
                return Curry._2(Jest.Expect[/* Operators */24][/* = */5], Jest.Expect[/* expect */0](/* tuple */[
                                before,
                                inbetween,
                                flag[0]
                              ]), /* tuple */[
                            /* false */0,
                            /* false */0,
                            /* true */1
                          ]);
              }));
        Jest.test("runOnlyPendingTimers", (function () {
                var count = [0];
                jest.useFakeTimers();
                var recursiveTimeout = function () {
                  count[0] = count[0] + 1 | 0;
                  setTimeout(recursiveTimeout, 1500);
                  return /* () */0;
                };
                recursiveTimeout(/* () */0);
                var before = count[0];
                jest.runOnlyPendingTimers();
                var inbetween = count[0];
                jest.runOnlyPendingTimers();
                return Curry._2(Jest.Expect[/* Operators */24][/* = */5], Jest.Expect[/* expect */0](/* tuple */[
                                before,
                                inbetween,
                                count[0]
                              ]), /* tuple */[
                            1,
                            2,
                            3
                          ]);
              }));
        Jest.test("clearAllTimers", (function () {
                var flag = [/* false */0];
                jest.useFakeTimers();
                setImmediate((function () {
                        flag[0] = /* true */1;
                        return /* () */0;
                      }));
                var before = flag[0];
                jest.clearAllTimers();
                jest.runAllTimers();
                return Curry._2(Jest.Expect[/* Operators */24][/* = */5], Jest.Expect[/* expect */0](/* tuple */[
                                before,
                                flag[0]
                              ]), /* tuple */[
                            /* false */0,
                            /* false */0
                          ]);
              }));
        return Jest.testAsync("clearAllTimers", (function (finish) {
                      jest.useFakeTimers();
                      jest.useRealTimers();
                      setImmediate((function () {
                              return Curry._1(finish, Jest.pass);
                            }));
                      return /* () */0;
                    }));
      }));

describe("beforeAllAsync", (function () {
        describe("without timeout", (function () {
                var x = [0];
                Jest.beforeAllAsync(/* None */0, (function (finish) {
                        x[0] = x[0] + 4 | 0;
                        return Curry._1(finish, /* () */0);
                      }));
                Jest.test("x is 4", (function () {
                        return Jest.Expect[/* toBe */2](4, Jest.Expect[/* expect */0](x[0]));
                      }));
                return Jest.test("x is still 4", (function () {
                              return Jest.Expect[/* toBe */2](4, Jest.Expect[/* expect */0](x[0]));
                            }));
              }));
        describe("with 100ms timeout", (function () {
                var x = [0];
                Jest.beforeAllAsync(/* Some */[100], (function (finish) {
                        x[0] = x[0] + 4 | 0;
                        return Curry._1(finish, /* () */0);
                      }));
                Jest.test("x is 4", (function () {
                        return Jest.Expect[/* toBe */2](4, Jest.Expect[/* expect */0](x[0]));
                      }));
                return Jest.test("x is still 4", (function () {
                              return Jest.Expect[/* toBe */2](4, Jest.Expect[/* expect */0](x[0]));
                            }));
              }));
        return /* () */0;
      }));

describe("beforeAllPromise", (function () {
        var x = [0];
        Jest.beforeAllPromise((function () {
                x[0] = x[0] + 4 | 0;
                return Promise.resolve(/* () */0);
              }));
        Jest.test("x is 4", (function () {
                return Jest.Expect[/* toBe */2](4, Jest.Expect[/* expect */0](x[0]));
              }));
        return Jest.test("x is still 4", (function () {
                      return Jest.Expect[/* toBe */2](4, Jest.Expect[/* expect */0](x[0]));
                    }));
      }));

describe("afterAllAsync", (function () {
        describe("without timeout", (function () {
                var x = [0];
                describe("phase 1", (function () {
                        Jest.afterAllAsync(/* None */0, (function (finish) {
                                x[0] = x[0] + 4 | 0;
                                return Curry._1(finish, /* () */0);
                              }));
                        return Jest.test("x is 0", (function () {
                                      return Jest.Expect[/* toBe */2](0, Jest.Expect[/* expect */0](x[0]));
                                    }));
                      }));
                describe("phase 2", (function () {
                        return Jest.test("x is suddenly 4", (function () {
                                      return Jest.Expect[/* toBe */2](4, Jest.Expect[/* expect */0](x[0]));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("with 100ms timeout", (function () {
                var x = [0];
                describe("phase 1", (function () {
                        Jest.afterAllAsync(/* Some */[100], (function (finish) {
                                x[0] = x[0] + 4 | 0;
                                return Curry._1(finish, /* () */0);
                              }));
                        return Jest.test("x is 0", (function () {
                                      return Jest.Expect[/* toBe */2](0, Jest.Expect[/* expect */0](x[0]));
                                    }));
                      }));
                describe("phase 2", (function () {
                        return Jest.test("x is suddenly 4", (function () {
                                      return Jest.Expect[/* toBe */2](4, Jest.Expect[/* expect */0](x[0]));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

describe("afterAllPromise", (function () {
        var x = [0];
        describe("phase 1", (function () {
                Jest.afterAllPromise((function () {
                        x[0] = x[0] + 4 | 0;
                        return Promise.resolve(/* true */1);
                      }));
                return Jest.test("x is 0", (function () {
                              return Jest.Expect[/* toBe */2](0, Jest.Expect[/* expect */0](x[0]));
                            }));
              }));
        describe("phase 2", (function () {
                return Jest.test("x is suddenly 4", (function () {
                              return Jest.Expect[/* toBe */2](4, Jest.Expect[/* expect */0](x[0]));
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
