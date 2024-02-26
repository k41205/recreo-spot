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
