**API for talks at a conference with NestJs, Typescript and MongoDB**

**Socket.IO Server Address**

```
https://conference-api.onrender.com
```

**Sample json message body for real-time chats**

```
{
"message": "hello world",
"sender": "64750c0c82175b2f1cbb5bb8",
"talk": "64750bd382175b2f1cbb5bb4"
}
```

**Event to emit**
"chat"

Steps for real time chat

1. Emit `chat` to create a new chat with the message body formatted as above
2. Listen for a server response event of `newChat` to fetch chats

**Client used to test websocket**
Socket.IO Test Client (v0.4.3)
chrome-extension://ophmdkgfcjapomjdpfobjfbihojchbko/index.html

**API Documentation can be found here**

```https://conference-api.onrender.com/api-docs

```

**GitHub Repo**

```https://github.com/ejooremmanuel/talksatconference-api

```
