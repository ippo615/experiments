# AJAX Server Status Monitor

When you reboot a server it would be nice to know when it is back
online so you can referesh the user's page. These examples show how to
make lightweight requests that only check if the server is running.

01-basic-status shows how to poll if your server is up or down.

02-wait-for-event shows how to wait for your server to go offline or
come back online.

03-sequence shows how to wait and perform actions during a sequence of
online/offline events. For example, you restart the server so you wait
for it to go offline then want to wait and take some action when it
finishes rebooting and is back online.

## Running

The simplest way to run these examples is my starting a server in this
directory and starting/stopping it after you've loaded the pages in a 
webbrowser. The simple way to start a server:

	python -m SimpleHTTPServer

Then hold `ctrl+c` to stop it.
