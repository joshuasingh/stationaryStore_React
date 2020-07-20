//;
const UserInfo = (
  state = {
    UserId: "hxUqGaiuvzUqXje4RVQGZEYbNNP2",
    firstName: null,
    lastName: null,
    email: null,
  },
  action
) => {
  switch (action.type) {
    case "initiateUser":
      state = action.payload;
      break;
    case "SignOut":
      state = {
        UserId: null,
        firstName: null,
        lastName: null,
        email: null,
      };

      break;
    case "toggle":
      console.log("in toggle");
      var t = null;
      if (state.UserId === null) t = "not null";
      else t = null;
      state = { UserId: t };
      break;
  }

  return state;
};

export default UserInfo;
