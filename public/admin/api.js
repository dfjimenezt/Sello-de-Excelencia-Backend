if (!dmt) {
	var dmt = {}
}
dmt.api= {
    version:"1.0",
    endpoints:[
        {
            controller:"configuration",
            entities:[
                {
                    entity:"user",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"role",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"availability",
                    permissions:{
                        read:"admin",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"level",
                    permissions:{
                        read:"admin",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"user_category",
                    permissions:{
                        read:"admin",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"user_questiontopic",
                    permissions:{
                        read:"admin",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"permission",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"permission_role",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"user_role",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"config",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"type_document",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                }

            ]
        },
        {
            controller:"forum",
            entities:[
                {
                    entity:"topic",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"message",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                }
            ]
        },
        {
            controller:"place",
            entities:[
                {
                    entity:"institution",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"city",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"region",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                }
            ]
        },
        {
            controller:"service",
            entities:[
                {
                    entity:"service",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"category",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"questiontopic",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"form",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"type",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"question",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                }
            ]
        },
        {
            controller:"question",
            entities:[
                {
                    entity:"evaluation_request",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"user_answer",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                },
                {
                    entity:"request_status",
                    permissions:{
                        read:"none",
                        write:"admin",
                        update:"admin",
                        delete:"admin"
                    }
                }
            ]
        }
    ]
}
try {
	module.exports = dmt;
} catch (e) {
	console.log(e);
}
