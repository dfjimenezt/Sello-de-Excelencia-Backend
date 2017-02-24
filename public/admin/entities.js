/**
 * Relations
 * 1-1 leftKey
 * 1-n rightKey
 * n-n intermediate table
 */
if (!dmt) {
  var dmt = {}
}
dmt.entities = {
  "user": {
    table: "user",
    relations: [{
      type: "n-n",
      entity: "role",
      name: "roles",
      intermediate: {
        entity: "user_role",
        leftKey: "id_user",
        rightKey: "id_role"
      }
    }
    ]
  },
  "user_role":{
    table:"user_role",
    relations:[
      {
        type:"1-1",
        name:"user",
        entity:"user",
        leftKey:"id_user",
        foreign_name:"name"
      },
      {
        type:"1-1",
        name:"role",
        entity:"role",
        leftKey:"id_role",
        foreign_name:"name"
      }
    ]
  },
  "permission_role":{
    table:"permission_role",
    relations:[
      {
        type:"1-1",
        name:"permission",
        entity:"permission",
        leftKey:"id_permission",
        foreign_name:"name"
      },
      {
        type:"1-1",
        name:"role",
        entity:"role",
        leftKey:"id_role",
        foreign_name:"name"
      }
    ]
  }
}
try {
  module.exports = dmt;
} catch (e) {
  console.log(e);
}