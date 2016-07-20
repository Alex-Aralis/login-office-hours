Description
=======
A clean app that implements user registration, authentication, and routing.

Frameworks
======
Angular
Bootstrap
Firebase
Twilio
Mailgun

Installation
======

with `nodeJS` installed run 

```bash
npm install
```

in the project root directory.

# Features

Features added after branch from [Seth's Repo](https://github.com/xternbootcamp16/mutant-office-hours).
- Confirm email with by sending verification email.
- Add permissions to Firebase
- Add a ui-router resolve to prevent unautherized access to pages.
- Refactor
- Integrate Gravatar
- Store mutants by user
- Make pages dynamically display user info
- Add in a forget password link to registration state
- Have uid be a parameter in the URL
- Have mutant controls change based on privileges
- Create multiple views into the mutants list that have helpful filters applied to them.
- Create a user registry for searching through and navigating to that users list of mutants
- Sort by column in registry and list
- Allow sorting through users in registry state

> *Check out the [Trello Board](https://trello.com/b/OaqYu17J/mutant-office-hours) for more information on features.*

production
------

Install with

```bash
npm install --production
```

if serving with something other than http-server.

Serving
==========

development
------
To start serving the project on port 8080

```bash
npm start
```
