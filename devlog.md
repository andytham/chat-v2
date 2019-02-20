State handled by redux
- is user logged in
- chat history

State handled by react
- whatever is being typed on the page

I need to either initialize redux's store on load or sync it with the backend's log of the chat history.


## Issues

For some reason, I keep running into issues when trying to serve the express app until I added babel polyfill.
But then it suddenly works after I install and uninstall it?

So after spending several days working with JWT and trying to figure out the workflow here's what I gathered so far.

Create JWT in backend on login.
Send JWT to client/frontend, store in cookie.
When trying to access private route, check HTTP-headers for Authorization: Bearer 'JWT goes here'
When verified in the backend with jwt.verify, allow user to go in, otherwise status 403.

Problems I've spent a long time dealing with.
Trying ot use XHR to send a http request to the express backend
However, I want to do it right, and everytime you access a URL through a browser a get request naturally occurs, and it seems you can't modify it (most likely for security reasons), so I can't set the headers for this request (a lot of guides seem to miss this as they use POSTMAN to send the headers directly).
The XHR request then goes through, so the authorization headers comes in after the first one, thereby running into a problem.

I discovered cookies are sent with every request, so that is currently my goal rather than trying to find another workaround to (contemplating skipping the first 'GET' request in authorization as a workaround).

Storing tokens in cookies seems to be vulnerable to CSRF (but auth0 warns that web storage is vulnerable to XSS)

##

In the reducer, I'm passing the next state as action.username. However, when I am mapping the state to props in my component, and then pulling out state.auth.username, it's nesting the username as an object of itself and its value? Might have to do with combing the reducers incorrectly...

https://stackoverflow.com/questions/39695768/mapstatetoprops-in-redux-app-nesting-state-within-state


## GAME redo
at this moment, the game is rendered, and updates on players are sent through the socket.
Game is unbearably laggy. Most likely because conflicting player data is being sent back and forth.

In an attempt to fix, I thought it might be best to redo the entire thing, and send keystrokes through the socket instead, and updating the game state that way.


##

seems like video game standard is 16 char limit for usernames


##

add a logo? 