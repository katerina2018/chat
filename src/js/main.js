import { initializeApp } from 'firebase/app';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    getAuth,
    onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, set, onValue } from 'firebase/database';

import { createButton } from '../pages/login';
import { createChat, createTextMsg } from '../pages/chat';
import { firebaseConfig } from './const';

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();
const starCountRef = ref(db, 'chat/');

const rootRef = document.querySelector('#root');

let user = true;

// function start() {
//     if (user) {
//         rootRef.innerHTML = createChat();
//         userSingOut();
//     } else {
//         rootRef.innerHTML = createButton();
//         onClickBtn();
//     }
// }
// start();

onAuthStateChanged(auth, userFirebase => {
    if (userFirebase) {
        const { photoURL, uid } = userFirebase;
        user = { photoURL, uid };
        console.log(user);
        rootRef.innerHTML = createChat();
        userSingOut();
        creareMsg();
    } else {
        rootRef.innerHTML = createButton();
        onClickBtn();
    }
});

function sendMsg(value) {
    const time = Date.now();
    set(ref(db, 'chat/' + time), {
        message: value,
        time: getTime(),
        ...user,
    });
}

function creareMsg() {
    const formRef = document.querySelector('.msg-form');
    formRef.addEventListener('submit', e => {
        e.preventDefault();
        const text = e.target.elements.msg.value.trim();
        if (!text) {
            return;
        }
        sendMsg(text);
        e.target.reset();
    });
}

onValue(starCountRef, snapshot => {
    const data = snapshot.val();
    const markup = createTextMsg(Object.values(data), user.uid);
    document.querySelector('.messages').innerHTML = markup;
});

const date = new Date();

function getTime() {
    return `${date.getHours()}:${date.getMinutes()}`;
}

// console.log(getTime());

function onClickBtn() {
    const loginBtnRef = document.querySelector('.js-msg-btn');
    loginBtnRef.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user);
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    });
}

function userSingOut() {
    const btnSingOutRef = document.querySelector('.btn-sing-out');
    btnSingOutRef.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log('message');
            })
            .catch(error => {
                // An error happened.
            });
    });
}