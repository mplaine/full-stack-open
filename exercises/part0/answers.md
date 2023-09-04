# Exercises 0.1-0.6

Below are my answers to exercises 0.1-0.6.


## 0.1: HTML

Read the *HTML basics* tutorial available at https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics.


## 0.2: CSS

Read the *CSS basics* tutorial available at https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics.


## 0.3: HTML forms

Read the *Your first form* tutorial available at https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form.


## 0.4: New note diagram

A sequence diagram depicting the situation *after* the user has created a new note and clicked the *Save* button in the Notes app.

Base URL: https://studies.cs.helsinki.fi/exampleapp

```mermaid
sequenceDiagram
    autonumber
    participant Client
    participant Server

    Client ->> Server: HTTP POST /new_note (form data)
    activate Server
    Server -->> Client: HTTP 302 Redirect (/notes)
    deactivate Server

    Client ->> Server: HTTP GET /notes
    activate Server
    Server -->> Client: HTTP 200 OK (HTML document)
    deactivate Server

    Client ->> Server: HTTP GET /main.css
    activate Server
    Server -->> Client: HTTP 200 OK (CSS file)
    deactivate Server

    Client ->> Server: HTTP GET /main.js
    activate Server
    Server -->> Client: HTTP 200 OK (JavaScript file)
    deactivate Server

    Client ->> Server: HTTP GET /data.json (xhr)
    activate Server
    Server -->> Client: HTTP 200 OK (JSON data)
    deactivate Server

    Note right of Client: Fetch notes from the server and render them.
```


## 0.5: Single page app diagram

A sequence diagram depicting the situation where the user has requested the single-page app version of the Notes app.

Base URL: https://studies.cs.helsinki.fi/exampleapp

```mermaid
sequenceDiagram
    autonumber
    participant Client
    participant Server

    Client ->> Server: HTTP GET /spa
    activate Server
    Server -->> Client: HTTP 200 OK (HTML document)
    deactivate Server

    Client ->> Server: HTTP GET /main.css
    activate Server
    Server -->> Client: HTTP 200 OK (CSS file)
    deactivate Server

    Client ->> Server: HTTP GET /spa.js
    activate Server
    Server -->> Client: HTTP 200 OK (JavaScript file)
    deactivate Server

    Client ->> Server: HTTP GET /data.json (xhr)
    activate Server
    Server -->> Client: HTTP 200 OK (JSON data)
    deactivate Server

    Note right of Client: Fetch notes from the server and render them.

    Client ->> Server: HTTP GET /favicon.ico
    activate Server
    Server -->> Client: HTTP 404 Not Found (HTML document)
    deactivate Server
```


## 0.6: New note in Single page app diagram

A sequence diagram depicting the situation *after* the user has created a new note and clicked the *Save* button in the single-page app version of the Notes app.

Base URL: https://studies.cs.helsinki.fi/exampleapp

```mermaid
sequenceDiagram
    autonumber
    participant Client
    participant Server

    Client ->> Server: HTTP POST /new_note_spa (xhr, JSON data)
    activate Server
    Server -->> Client: HTTP 201 Created (JSON data)
    deactivate Server

    Note right of Client: Rerender notes and send the new note to the server.
```
