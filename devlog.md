State handled by redux
- is user logged in
- chat history

State handled by react
- whatever is being typed on the page

I need to either initialize redux's store on load or sync it with the backend's log of the chat history.


## Issues

For some reason, I keep running into issues when trying to serve the express app until I added babel polyfill.
But then it suddenly works after I install and uninstall it?