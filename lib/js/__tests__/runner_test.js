'use strict';

var Jest                    = require("../src/jest.js");
var Curry                   = require("bs-platform/lib/js/curry.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function affirm(ok) {
  if (ok) {
    return 0;
  } else {
    throw [
          Caml_builtin_exceptions.assert_failure,
          [
            "runner_test.ml",
            3,
            18
          ]
        ];
  }
}

var include = Jest.Runner(/* module */[/* affirm */affirm]);

var test = include[0];

var testAsync = include[1];

var testPromise = include[2];

var testAll = include[3];

var beforeAllAsync = include[4];

var beforeAllPromise = include[5];

var afterAllAsync = include[6];

var afterAllPromise = include[7];

var Skip = include[9];

Curry._2(test, "test", (function () {
        return /* true */1;
      }));

it.skip("test - expect fail", (function () {
        return /* false */0;
      }));

Curry._2(testAsync, "testAsync", (function (finish) {
        return Curry._1(finish, /* true */1);
      }));

it.skip("testAsync - no done", (function () {
        return /* () */0;
      }));

it.skip("testAsync - expect fail", (function (finish) {
        return Curry._1(finish, /* false */0);
      }));

Curry._2(testPromise, "testPromise", (function () {
        return Promise.resolve(/* true */1);
      }));

it.skip("testPromise - reject", (function () {
        return Promise.reject([
                    Caml_builtin_exceptions.failure,
                    ""
                  ]);
      }));

it.skip("testPromise - expect fail", (function () {
        return Promise.resolve(/* false */0);
      }));

Curry._3(testAll, "testAll", /* :: */[
      "foo",
      /* :: */[
        "bar",
        /* :: */[
          "baz",
          /* [] */0
        ]
      ]
    ], (function (input) {
        return +(input.length === 3);
      }));

Curry._3(testAll, "testAll - tuples", /* :: */[
      /* tuple */[
        "foo",
        3
      ],
      /* :: */[
        /* tuple */[
          "barbaz",
          6
        ],
        /* :: */[
          /* tuple */[
            "bananas!",
            8
          ],
          /* [] */0
        ]
      ]
    ], (function (param) {
        return +(param[0].length === param[1]);
      }));

describe("describe", (function () {
        return Curry._2(test, "some aspect", (function () {
                      return /* true */1;
                    }));
      }));

describe("beforeAll", (function () {
        var x = [0];
        beforeAll((function () {
                x[0] = x[0] + 4 | 0;
                return /* () */0;
              }));
        Curry._2(test, "x is 4", (function () {
                return +(x[0] === 4);
              }));
        return Curry._2(test, "x is still 4", (function () {
                      return +(x[0] === 4);
                    }));
      }));

describe("beforeAllAsync", (function () {
        describe("without timeout", (function () {
                var x = [0];
                Curry._2(beforeAllAsync, /* None */0, (function (finish) {
                        x[0] = x[0] + 4 | 0;
                        return Curry._1(finish, /* () */0);
                      }));
                Curry._2(test, "x is 4", (function () {
                        return +(x[0] === 4);
                      }));
                return Curry._2(test, "x is still 4", (function () {
                              return +(x[0] === 4);
                            }));
              }));
        describe("with 100ms timeout", (function () {
                var x = [0];
                Curry._2(beforeAllAsync, /* Some */[100], (function (finish) {
                        x[0] = x[0] + 4 | 0;
                        return Curry._1(finish, /* () */0);
                      }));
                Curry._2(test, "x is 4", (function () {
                        return +(x[0] === 4);
                      }));
                return Curry._2(test, "x is still 4", (function () {
                              return +(x[0] === 4);
                            }));
              }));
        return /* () */0;
      }));

describe("beforeAllPromise", (function () {
        var x = [0];
        Curry._1(beforeAllPromise, (function () {
                x[0] = x[0] + 4 | 0;
                return Promise.resolve(/* () */0);
              }));
        Curry._2(test, "x is 4", (function () {
                return +(x[0] === 4);
              }));
        return Curry._2(test, "x is still 4", (function () {
                      return +(x[0] === 4);
                    }));
      }));

describe("beforeEach", (function () {
        var x = [0];
        beforeEach((function () {
                x[0] = x[0] + 4 | 0;
                return /* () */0;
              }));
        Curry._2(test, "x is 4", (function () {
                return +(x[0] === 4);
              }));
        return Curry._2(test, "x is suddenly 8", (function () {
                      return +(x[0] === 8);
                    }));
      }));

describe("afterAll", (function () {
        var x = [0];
        describe("phase 1", (function () {
                afterAll((function () {
                        x[0] = x[0] + 4 | 0;
                        return /* () */0;
                      }));
                return Curry._2(test, "x is 0", (function () {
                              return +(x[0] === 0);
                            }));
              }));
        describe("phase 2", (function () {
                return Curry._2(test, "x is suddenly 4", (function () {
                              return +(x[0] === 4);
                            }));
              }));
        return /* () */0;
      }));

describe("afterAllAsync", (function () {
        describe("without timeout", (function () {
                var x = [0];
                describe("phase 1", (function () {
                        Curry._2(afterAllAsync, /* None */0, (function (finish) {
                                x[0] = x[0] + 4 | 0;
                                return Curry._1(finish, /* () */0);
                              }));
                        return Curry._2(test, "x is 0", (function () {
                                      return +(x[0] === 0);
                                    }));
                      }));
                describe("phase 2", (function () {
                        return Curry._2(test, "x is suddenly 4", (function () {
                                      return +(x[0] === 4);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("with 100ms timeout", (function () {
                var x = [0];
                describe("phase 1", (function () {
                        Curry._2(afterAllAsync, /* Some */[100], (function (finish) {
                                x[0] = x[0] + 4 | 0;
                                return Curry._1(finish, /* () */0);
                              }));
                        return Curry._2(test, "x is 0", (function () {
                                      return +(x[0] === 0);
                                    }));
                      }));
                describe("phase 2", (function () {
                        return Curry._2(test, "x is suddenly 4", (function () {
                                      return +(x[0] === 4);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

describe("afterAllPromise", (function () {
        var x = [0];
        describe("phase 1", (function () {
                Curry._1(afterAllPromise, (function () {
                        x[0] = x[0] + 4 | 0;
                        return Promise.resolve(/* true */1);
                      }));
                return Curry._2(test, "x is 0", (function () {
                              return +(x[0] === 0);
                            }));
              }));
        describe("phase 2", (function () {
                return Curry._2(test, "x is suddenly 4", (function () {
                              return +(x[0] === 4);
                            }));
              }));
        return /* () */0;
      }));

describe("afterEach", (function () {
        var x = [0];
        afterEach((function () {
                x[0] = x[0] + 4 | 0;
                return /* () */0;
              }));
        Curry._2(test, "x is 0", (function () {
                return +(x[0] === 0);
              }));
        return Curry._2(test, "x is suddenly 4", (function () {
                      return +(x[0] === 4);
                    }));
      }));

describe("Only", (function () {
        return /* () */0;
      }));

describe("Skip", (function () {
        it.skip("Skip.test", (function () {
                return /* true */1;
              }));
        it.skip("Skip.testAsync", (function (finish) {
                return Curry._1(finish, /* true */1);
              }));
        it.skip("Skip.testPromise", (function () {
                return Promise.resolve(/* true */1);
              }));
        Curry._3(Skip[/* testAll */0], "testAll", /* :: */[
              "foo",
              /* :: */[
                "bar",
                /* :: */[
                  "baz",
                  /* [] */0
                ]
              ]
            ], (function (input) {
                return +(input.length === 3);
              }));
        Curry._3(Skip[/* testAll */0], "testAll - tuples", /* :: */[
              /* tuple */[
                "foo",
                3
              ],
              /* :: */[
                /* tuple */[
                  "barbaz",
                  6
                ],
                /* :: */[
                  /* tuple */[
                    "bananas!",
                    8
                  ],
                  /* [] */0
                ]
              ]
            ], (function (param) {
                return +(param[0].length === param[1]);
              }));
        describe.skip("Skip.describe", (function () {
                return Curry._2(test, "some aspect", (function () {
                              return /* true */1;
                            }));
              }));
        return /* () */0;
      }));

var Only = include[8];

exports.test             = test;
exports.testAsync        = testAsync;
exports.testPromise      = testPromise;
exports.testAll          = testAll;
exports.beforeAllAsync   = beforeAllAsync;
exports.beforeAllPromise = beforeAllPromise;
exports.afterAllAsync    = afterAllAsync;
exports.afterAllPromise  = afterAllPromise;
exports.Only             = Only;
exports.Skip             = Skip;
/* include Not a pure module */
