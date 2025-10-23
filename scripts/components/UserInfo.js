class UserInfo {
  constructor(userSelectors) {
    this._name = document.querySelector(userSelectors.name);
    this._job = document.querySelector(userSelectors.job);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }
}

export default UserInfo;
