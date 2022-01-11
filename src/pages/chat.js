export function createChat() {
    return `<button type="button" class="btn-sing-out">Sing out</button>
    <div class="chat">
      <h1 class="chat-name">Chat name</h1>
      <ul id="messages" class="messages">
        <li class="msg">
        <img class="img-avatar" width="40" height="40" src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/user-account-profile-human-avatar-face-head--128.png">
          <span class="msg-nameUser"><b>User1:</b></span>
          text message
        </li>
        <li class="msg my">
        <img class="img-avatar" width="40" height="40" src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/user-account-profile-human-avatar-face-head--128.png">
          <span class="msg-nameUser"><b>User2:</b></span>
          text message
        </li>
      </ul>
      
    <form id="msg-form" class="msg-form" autocomplete="off">
        <input type="text" name="msg" id="msg-input" class="msg-input" placeholder="Enter a message" />
        <button type="submit" id="msg-btn" class="msg-btn">Send</button>
    </form>
    </div>`;
}
export function createTextMsg(array, id) {
    const markup = array
        .map(({ photoURL, uid, message }) => {
            const classEl = id === uid ? 'mgs my' : 'msg';
            return `<li class=${classEl}>
        <img class="img-avatar" width="40" height="40" src="${photoURL}">
          <span class="msg-nameUser"><b>User1:</b></span>
          ${message}
        </li>`;
        })
        .join();
    return markup;
}