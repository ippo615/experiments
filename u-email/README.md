# Udacity Email

Try it in action: http://ippo615.github.io/experiments/u-email/

## General Notes

> Udacity could use an internal messaging system for site-wide announcements, for
> instructors to send messages to their class, and for one-to-one communication between
> users.  Design and implement as many of the following features as you feel comfortable
> (and have time for), include any notes that document the design issues you discovered
> and how you chose to address them, and don’t forget some tests.  If you don’t have
> time to implement all the features but believe your design would support them, feel
> free to just explain how you would go about implementing them given more time.

A general note, I implemented the front end and described how the backend should behave.
All of the pages in the `server` folder show example responses that the server should
make.

Most of the choices I made were to minimize bandwidth usage and minimize response time.

## Part 1

> Allow sending of messages between individual users, identified by the unique key of
> their record in the system. Messages are in markdown format, and auto-complete of
> recipients would be a bonus.

Users are identified by an email address. There is also a name associated with 
each email address. The requests a list of contacts on page load by sending a
request to `server/contacts`. The sever replies with JSON which looks like:

    {
      n: number of contacts,
      data: [ array of contacts ]
    }

A contact is:

    {
      name: the contact's first/last name or some other identifier
      email: the contact's email address (or unique identifier
    }

When the page loads, a list of contacts is loaded in the background. When the user is
as the user editing the `to`, `cc`, or `bcc` fields suggestions are shown. 

Markdown rendering is achieved with [markdown-js]
(https://github.com/evilstreak/markdown-js)

## Part 2

> Allow a user to view their inbox, read messages, (automatically) mark messages as
> read, and delete messages.

The user requests a summary of their inbox by contacting `server/inbox`. 
The sever replies with JSON which looks like:

    {
      n: number of messages,
      data: [ array of message ]
    }

A message is:

    {
      id: unique id or serial number for the message,
      status: if the message has been read,
      subject: typical email subject,
      from: who sent the email,
      to: addresses the email was sent to,
      cc: addresses that received copies,
      date: the date/time the email was sent,
      blurb: short summary of the body of the email (or the first part of the text)
    }

The client can load an email by sending a request to `server/email`. The backend
will handle marking it as read on the server and will return the markdown text
body of the email. The client then displays the rendered Markdown to the user for
viewing or printing (go ahead try printing stuff).

The client can delete an email by sending a request to `server/delete`.

I need to add functionality to mark the email as read in the client.

## Part 3

> Allow sending a broadcast message to all users.  Keep in mind that there could be
> millions of users.

I think this is be implemented in the backend. The message would be queued and then
sent to all of the users. 

## Part 4

> Allow sending a message to a group of users.  Groups can be large (over 100,000 users)
> and are stored by having each user record list all the groups it’s a member of.  Group
> membership varies over time and a message should be received only by the users who
> were members of the destination group at the time the message was sent.

I also think this is best accomplished in the backend. I would use an algorithm
similar to the following psuedo-code:

    function get_unique_users(groups){
      for( user in all_users ){
        for( group in groups ){
          if( user is in group ){
            send to user
            stop looking through other groups
          }
        }
      }
    }

Iterate over users first because (I believe) the time to look up a user would be
much longer than the time required to look up the specified group. Also by iterating
over groups second we can stop iterating over the remaining groups once a user is 
shown to be in a group (we won't want to send 1 user the same email 5 times if he/she
is in 5 different groups). Nevertheless, performance tests would be the best way to 
ensure that is fast/scalable enough.

## Improvements

### Scrolling on mobile devices

I used absolutely positioned div's with `overflow:scroll` this prevents some of the
content from being shown on mobile devices because the user cannot scroll to the 
extra content. To fix this, I need to allow overflow and then re-position the toolbar
and other fixed ui elements as the user scrolls.

### Back Button

Browser back button/history integration would be nice.

### The Delete Button

I show it all the time. Just have to hide it when it's not being used.

### Automated Browser Testing

I've never worked with it before but [phantomjs](http://phantomjs.org/) or
[selenium](http://docs.seleniumhq.org/) seem like they would be useful.

### Minor Tweaks and Adjustments

  - Better styling (maybe use bootstrap)
  - Make code more modular/maintainable
  - Stop polluting the global namespace
  - Show To/From when viewing received emails
  - Login page

### Stumbling Blocks

Sometimes when displaying a 1px border will not be shown because of the way browsers
determine coordinates and rounding. Css borders that you want to appear everywhere
should be greater than 1px. Adding 0.5 should be enough. For example 1px to 1.5px.

When working with `input` elements you have to wrap them in `div`s if you want 
more styling freedom. Also You cannot use `:before` or `:after` for `input`
elements. They technically do not have any inner content so you can't put stuff
before or after it.