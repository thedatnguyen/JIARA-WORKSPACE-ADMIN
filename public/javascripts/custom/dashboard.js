XMLHttpRequest.prototype.origOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function () {
    this.origOpen.apply(this, arguments);
    this.setRequestHeader('auth-token', localStorage.getItem('auth-token'));
};

const sendRequest = (method, url, body) => {
    xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.send(body);
}