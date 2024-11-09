const form = document.querySelector('.needs-validation');
const addFriendButton = document.querySelector('#add-friend');
const removeFriendButton = document.querySelector('#remove-friend');

const title = () => document.querySelector('#title').value;
const friends = () => {
    const friendInputs = document.querySelectorAll('.friend');
    return Array.from(friendInputs).filter(friend => friend.value !== '').map(friend => friend.value);
};
const date = () => document.querySelector('#date').value;
const time = () => document.querySelector('#time').value;
const detail = () => document.querySelector('#detail').value;
const category = () => document.querySelector('#category').value;
const file = () => {
    const file = document.querySelector('#file').files[0];
    if (file) {
        return file.name;
    } else {
        return '';
    }
};


let friendCount = 1;

function submit(e) {
    if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
    } else {
        e.preventDefault();
        e.stopPropagation();
        saveSchedule();
    }
    form.classList.add('was-validated');
}

function addFriend() {
    friendCount++;
    let friend = document.createElement('input');
    friend.setAttribute('type', 'text');
    friend.setAttribute('class', 'form-control friend');
    friend.setAttribute('id', `friend${friendCount}`);
    friend.setAttribute('name', `friend${friendCount}`);

    const lastFriend = document.querySelector(`#friend${friendCount - 1}`);
    const parent = lastFriend.parentElement;
    parent.insertBefore(friend, lastFriend.nextSibling);
}

function removeFriend() {
    if (friendCount > 1) {
        const lastFriend = document.querySelector(`#friend${friendCount}`);
        lastFriend.remove();
        friendCount--;
    }
}

function doFormatting(str) {
    str = str.trim();
    str = str.replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;')
             .replace(/"/g, '&quot;')
             .replace(/'/g, '&#039;');
    return str;
}

function saveSchedule() {
    const schedule = {
        title: doFormatting(title()),
        friends: friends().map(friend => doFormatting(friend)),
        date: doFormatting(date()),
        time: doFormatting(time()),
        detail: doFormatting(detail()),
        category: doFormatting(category()),
        file: file()
    };

    console.log(schedule);
    
    fetch('save_schedule.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(schedule)
    })
    .then(response => {
        console.log(response);
        if (response.status === 200) {
            alert('일정이 저장되었습니다.');
            location.href = 'index.html';
        } else {
            alert('일정 저장에 실패했습니다. 날짜와 시간이 같은 일정이 이미 존재합니다');
        }
    });
}


form.addEventListener('submit', submit);
addFriendButton.addEventListener('click', addFriend);
removeFriendButton.addEventListener('click', removeFriend);