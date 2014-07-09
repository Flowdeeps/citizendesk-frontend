[![Build Status](https://travis-ci.org/sourcefabric-innovation/citizendesk-frontend.png?branch=master)](https://travis-ci.org/sourcefabric-innovation/citizendesk-frontend)
[![Coverage Status](https://coveralls.io/repos/sourcefabric-innovation/citizendesk-frontend/badge.png?branch=master)](https://coveralls.io/r/sourcefabric-innovation/citizendesk-frontend?branch=master)

### Citizendesk frontend

This is the frontend for Citizendesk. It will serve a web interface
connected with a [Citizendesk interface][interface] component.

#### Deployment

This is an Angular application produced with Yeoman, and as such it
can be deployed just serving the static files under `app/`. Remember
to install the Bower dependencies running bower install:

    $ bower install

In order to work, the front end has to be connected to a [Citizendesk
interface][interface] component, and you have to write its address in
the file `app/scripts/services/prefix.js`.

[interface]: https://github.com/sourcefabric-innovation/citizendesk-interface

#### Development notes

Tests use a `mocks` object built with a tool called
[mockatenate](https://github.com/danse/mockatenate). In order to
update the file, run the './mockatenate' command from the root repository
folder

##### Test troubleshooting

There are some details in maintaining the tests that, if you do not
pay attention, makes you waste a lot of time. If your tests are
failing and you really do not know what is going on, check this list:

 - make sure that your mocks are updated using the `./mockatenate` script
 - make sure that the API endpoint you are using (throug `eve-api`) is in the root mock
