const userRepository = require('./data/repositories/user.repository');

const fetchUsers = async () => {
  const users = await userRepository.getAllUsers();
  console.log(users);
};

fetchUsers();
