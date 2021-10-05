const {addUser,getUserbyId} = require('../../services/userService');


async function testuserService(){
 //   let user = await addUser('Manish','Ukirade','MANISHUKIRADE','premium');
      let user = await  getUserbyId('7e258ad8-1bc5-44d3-b82a-612f1a52eb17')
      console.log(user);
}

testuserService();