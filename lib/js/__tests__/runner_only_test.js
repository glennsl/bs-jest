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
            "runner_only_test.ml",
            3,
            18
          ]
        ];
  }
}

var include = Jest.Runner(/* module */[/* affirm */affirm]);

var test = include[0];

var Only = include[8];

Curry._2(Only[/* test */0], "Only.test", (function () {
        return /* true */1;
      }));

Curry._2(Only[/* testAsync */1], "Only.testAsync", (function (finish) {
        return Curry._1(finish, /* true */1);
      }));

Curry._2(Only[/* testPromise */2], "Only.testPromise", (function () {
        return Promise.resolve(/* true */1);
      }));

Curry._3(Only[/* testAll */3], "testAll", /* :: */[
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

Curry._3(Only[/* testAll */3], "testAll - tuples", /* :: */[
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

describe.only("Only.describe", (function () {
        return Curry._2(test, "some aspect", (function () {
                      return /* true */1;
                    }));
      }));

var testAsync = include[1];

var testPromise = include[2];

var testAll = include[3];

var beforeAllAsync = include[4];

var beforeAllPromise = include[5];

var afterAllAsync = include[6];

var afterAllPromise = include[7];

var Skip = include[9];

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
