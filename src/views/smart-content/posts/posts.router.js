export default [
    {
        path: "/posts",
        name: "user-posts",
        component: () => import("@/views/smart-content/posts/Posts.vue"),
        // redirect: {name: 'logistic-s-office-hours'},
        meta: {
            // pageTitle: 'My posts',
            // breadcrumb: [
            //     {
            //         text: 'My posts',
            //         active: true,
            //     },
            // ],
        },
    },
        {
            path: "chat-history2",
            name: "chat-history",
            component: () => import('@/views/smart-content/posts/components/chat/ChatSM.vue'),
            meta: {
                contentRenderer: 'sidebar-left',
                contentClass: 'chat-application',
                pageTitle: 'Chat',
                breadcrumb: [
                    {
                        text: "Chat",
                        active: true,
                    },
                ],
            },
        },
        // children: [
        //     {
        //         path: "chat-history",
        //         name: "chat-history",
        //         component: () => import('@/views/apps/chat/Chat.vue'),
        //         meta: {
        //             contentRenderer: 'sidebar-left',
        //             contentClass: 'chat-application',
        //             pageTitle: 'Chat',
        //             breadcrumb: [
        //                 {
        //                     text: "Chat",
        //                     active: true,
        //                 },
        //             ],
        //         },
        //     },
            // {
            //     path: "type-request",
            //     name: "logistic-s-type-request",
            //     component: () => import("@/commons/employee-claims/components/settings/components/TypeRequest.vue"),
            //     meta: {
            //         pageTitle: 'Settings',
            //         module: 19,
            //         breadcrumb: [
            //             {
            //                 text: "Type Request",
            //                 active: true,
            //             },
            //         ],
            //     },
            // }
        // ]
    // }
]
