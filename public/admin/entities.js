/**
 * relations
 * 1-1
 * {
        type: "1-1",
        name: "category",
        foreign_name: "name",
        entity: "category",
        leftKey: "id_category"
      }
 * 1-n rightKey 
 * {
        type:"1-n",
        name:"history",
        rightKey:"id_service",
        entity:"service_status"
  }
 * n-n intermediate table
 * {
      type: "n-n",
      entity: "role",
      name: "roles",
      intermediate: {
        entity: "user_role",
        leftKey: "id_user",
        rightKey: "id_role"
      }
    }
 */
if (!dmt) {
  var dmt = {}
}
dmt.entities = {
  "user": {
    table: "user",
    relations: [
      {
        type: "n-n",
        entity: "role",
        name: "roles",
        intermediate: {
          entity: "user_role",
          leftKey: "id_user",
          rightKey: "id_role"
        }
      },
      {
        type: "n-n",
        entity: "category",
        name: "categories",
        intermediate: {
          entity: "user_category",
          leftKey: "id_user",
          rightKey: "id_category"
        }
      },
      {
        type: "n-n",
        entity: "questiontopic",
        name: "topics",
        intermediate: {
          entity: "user_questiontopic",
          leftKey: "id_user",
          rightKey: "id_topic",

        }
      },
      {
        type: "1-1",
        name: "availability",
        entity: "availability",
        leftKey: "id_availability",
        foreign_name: "name"
      },
      {
        type: "1-1",
        name: "city",
        entity: "city",
        leftKey: "id_city",
        foreign_name: "name"
      },
      {
        type: "1-1",
        name: "type_document",
        entity: "type_document",
        leftKey: "id_type_document",
        foreign_name: "document"
      }
    ]
  },
  "user_role": {
    table: "user_role",
    relations: [
      {
        type: "1-1",
        name: "user",
        entity: "user",
        leftKey: "id_user",
        foreign_name: "name"
      },
      {
        type: "1-1",
        name: "role",
        entity: "role",
        leftKey: "id_role",
        foreign_name: "name"
      }
    ]
  },
  "permission_role": {
    table: "permission_role",
    relations: [
      {
        type: "1-1",
        name: "permission",
        entity: "permission",
        leftKey: "id_permission",
        foreign_name: "name"
      },
      {
        type: "1-1",
        name: "role",
        entity: "role",
        leftKey: "id_role",
        foreign_name: "name"
      }
    ]
  },
  "service": {
    table: "service",
    relations: [
      {
        type: "1-1",
        name: "category",
        foreign_name: "name",
        entity: "category",
        leftKey: "id_category"
      },
      {
        type: "1-1",
        name: "institution",
        foreign_name: "name",
        entity: "institution",
        leftKey: "id_institution"
      },
      {
        type: "1-n",
        name: "history",
        rightKey: "id_service",
        entity: "service_status"
      },
      {
        type: "1-1",
        name: "status",
        leftKey: "current_status",
        foreign_name: "name",
        entity: "status"
      },
      {
        type: "1-n",
        name: "comments",
        entity: "service_comment",
        rightKey: "id_service"
      }
    ]
  },
  "service_comment": {
    table: "service_comment",
    relations: [
      {
        type: "1-1",
        entity: "user",
        name: "user",
        leftKey: "id_user",
        foreign_name: "email"
      }
    ]
  },
  "service_status": {
    table: "service_status",
    relations: [
      {
        type: "1-1",
        name: "status",
        foreign_name: "name",
        entity: "category",
        leftKey: "id_status"
      }
    ]
  },
  "evaluation_request": {
    table: "evaluation_request",
    relations: [
      {
        type: "1-1",
        name: "user",
        entity: "user",
        leftKey: "id_user",
        foreign_name: "email"
      },
      {
        type: "1-1",
        name: "service",
        entity: "service",
        leftKey: "id_service",
        foreign_name: "name"
      },
      {
        type: "1-1",
        name: "status",
        entity: "request_status",
        leftKey: "id_request_status",
        foreign_name: "name"
      }
    ]
  },
  "institution": {
    table: "institution",
    relations: [
      {
        type: "1-1",
        entity: "city",
        name: "city",
        leftKey: "id_city",
        foreign_name: "name"
      },
      {
        type: "1-1",
        entity: "region",
        name: "region",
        leftKey: "id_region",
        foreign_name: "name"
      },
      {
        type: "1-1",
        entity: "user",
        name: "creator",
        leftKey: "id_user_creator",
        foreign_name: "email"
      },
      {
        type: "1-1",
        entity: "institutionType",
        name: "creator",
        leftKey: "id_institution_type",
        foreign_name: "id"
      },
      {
        type: "n-n",
        name: "users",
        entity: "user",
        intermediate: {
          entity: "institution_user",
          leftKey: "id_institution",
          rightKey: "id_user"
        }
      }
    ]
  },
  "city": {
    table: "city",
    relations: [
      {
        type: "1-1",
        entity: "region",
        name: "region",
        leftKey: "id_region",
        foreign_name: "name"
      }
    ]
  },
  "form": {
    table: "form",
    relations: [
      {
        type: "1-1",
        name: "category",
        entity: "category",
        leftKey: "id_category",
        foreign_name: "name"
      },
    ]
  },
  "user_answer":{
    table:"user_answer",
    relations:[
      {
        type:"1-1",
        entity:"question",
        leftKey:"id_question",
        name:"question",
        foreign_name:"text"
      },
      {
        type:"1-1",
        entity:"user",
        name:"user",
        leftKey:"id_user",
        foreign_name:"email"
      },
      {
        type:"1-1",
        entity:"media",
        name:"media",
        leftKey:"id_media",
        foreign_name:"url"
      },
      {
        type:"1-1",
        entity:"questiontopic",
        name:"topic",
        leftKey:"id_topic",
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
