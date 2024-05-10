# [1.3.0](https://github.com/k41205/recreo-spot/compare/v1.2.0...v1.3.0) (2024-05-10)


### Features

* implement share by email ([e347a78](https://github.com/k41205/recreo-spot/commit/e347a784e32b9a524b27fcedb1e80611e91505d5))

# [1.2.0](https://github.com/k41205/recreo-spot/compare/v1.1.0...v1.2.0) (2024-05-09)


### Features

* implement favourite feat and relative panel ([087c118](https://github.com/k41205/recreo-spot/commit/087c11882e794f9c0395ab19ce6bb03d225ad0eb))

# [1.1.0](https://github.com/k41205/recreo-spot/compare/v1.0.0...v1.1.0) (2024-05-08)


### Features

* **auth:** implement auth Firebase with Google provider ([913ef7a](https://github.com/k41205/recreo-spot/commit/913ef7ae687e001c4b6054eb08600f606754cd8a))

# [1.0.0](https://github.com/k41205/recreo-spot/compare/v0.7.2...v1.0.0) (2024-03-17)


### chore

* updated package.json ([72df8ae](https://github.com/k41205/recreo-spot/commit/72df8aeb79917f575e8ed0ec82f6e18969a23b2b))


### BREAKING CHANGES

* version 1.0.0 released

## [0.7.2](https://github.com/k41205/recreo-spot/compare/v0.7.1...v0.7.2) (2024-03-17)


### Bug Fixes

* **url-api:** change url for api client side ([38db8d8](https://github.com/k41205/recreo-spot/commit/38db8d86ef51a52c0f3c7929c34d544745b75b2b))

## [0.7.1](https://github.com/k41205/recreo-spot/compare/v0.7.0...v0.7.1) (2024-03-17)


### Bug Fixes

* **secure flag http:** fix problem in production for cookie on unsecure connection and general cleaning ([e689ed5](https://github.com/k41205/recreo-spot/commit/e689ed5bca7e3d0c63de24f0a13a4363507b831d))

# [0.7.0](https://github.com/k41205/recreo-spot/compare/v0.6.0...v0.7.0) (2024-03-17)


### Bug Fixes

* **css:** improve css, some rework on controllers ([df48284](https://github.com/k41205/recreo-spot/commit/df48284607e8b6112c57ef0a494875e274e0b1ca))


### Features

* **joy validation:** create and implement validation schemes on controllers and APIs ([1300a2b](https://github.com/k41205/recreo-spot/commit/1300a2beef0e67d0beb5eebe13c3efc1f7475d2f))

# [0.6.0](https://github.com/k41205/recreo-spot/compare/v0.5.0...v0.6.0) (2024-03-16)


### Features

* **views/controller:** implement profile and user view and controller, rework on all views ([922684b](https://github.com/k41205/recreo-spot/commit/922684b64c88c83b7660bc6b60e1c323fd4127bb))
* **views:** implement admin view and redefine its controller ([8d48d5d](https://github.com/k41205/recreo-spot/commit/8d48d5d7010f5d25a8d9a28787d30be3bcc68c4b))

# [0.5.0](https://github.com/k41205/recreo-spot/compare/v0.4.0...v0.5.0) (2024-02-28)


### Bug Fixes

* **api:** solve problem on api calls and add tests ([7dd0a00](https://github.com/k41205/recreo-spot/commit/7dd0a00783847ec5b983d122e5b80b4bf05c9991))


### Features

* **pois api:** implement pois api with supporting tests ([ddac90b](https://github.com/k41205/recreo-spot/commit/ddac90b326a7eaeac1264c7df4724bce32521d0c))
* **user-api:** implement JWT to work with API and user API ([9b1a249](https://github.com/k41205/recreo-spot/commit/9b1a249204730c562d8724c281fb4ac5d1e4d8c4))

# [0.4.0](https://github.com/k41205/recreo-spot/compare/v0.3.0...v0.4.0) (2024-02-26)


### Features

* **poi-firestore-store:** implement POI Firestore model, tests, and update db.js ([1328dc4](https://github.com/k41205/recreo-spot/commit/1328dc44a6f1e62ae6744ad9314f52a8828d1b55))

# [0.3.0](https://github.com/k41205/recreo-spot/compare/v0.2.0...v0.3.0) (2024-02-25)


### Features

* **accounts-controller:** implement input check with joi and render errors on view ([a542737](https://github.com/k41205/recreo-spot/commit/a5427377a5070f8f3c465265e210aeb4541b578a))
* **auth:** implement cookie-based session handling ([d6be861](https://github.com/k41205/recreo-spot/commit/d6be86180b10ceb3c558bc6bdbb72f64ad905af1))

# [0.2.0](https://github.com/k41205/recreo-spot/compare/v0.1.0...v0.2.0) (2024-02-24)


### Features

* **models/firestore/connect:** implement Firestore init and configured server.js and db.js to run with Firestore ([172b1a6](https://github.com/k41205/recreo-spot/commit/172b1a6d5583c890974e9ca4e82a349bc0df0c1f))
* **models/firestore:** implement getUser by username and email method and add tests for both ([fcf9e21](https://github.com/k41205/recreo-spot/commit/fcf9e21ac2e6b1d3a854312179950a59560db419))
* **models/firestore:** implement user model ([e0461c6](https://github.com/k41205/recreo-spot/commit/e0461c680907505304160823c58ade2bfecc24ec))

# 1.0.0 (2024-02-16)


### Bug Fixes

* **dashboard-controller:** correct method call for get all POIs and adding one ([2f2ea1c](https://github.com/k41205/recreo-spot/commit/2f2ea1c9add77ba3693fa0beb80acef476c78b10))


### Features

* **controllers/accounts:** implement user signup, login, and logout functionalities ([91c4f57](https://github.com/k41205/recreo-spot/commit/91c4f57d132919dbb2df4f21468661fd000eda95))
* **controllers/dashboard:** implement POI creation and listing to the dashboard ([719d34d](https://github.com/k41205/recreo-spot/commit/719d34da0b1f2b96ddc12ac5577e3ffc4277b306))
* **data-storage:** implement in-memory stores for users and POIs ([2c0b32b](https://github.com/k41205/recreo-spot/commit/2c0b32b2fac0e3a5851e06719edb44391589f5e9))
* **server-setup:** implement Hapi server configured with Vision plugin and set Handlebars as view engine ([0f3d48d](https://github.com/k41205/recreo-spot/commit/0f3d48dded9b2c24bc3162b2e70bf2785bcfd9fd))
* **views:** implement user interface with routing and layout partials ([3880c3d](https://github.com/k41205/recreo-spot/commit/3880c3d6e5bfe6d83dd76c7c29819373947d5cf3))
