import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';

module.exports = models => {

    const {User, Photo, Message} = models;

    const UserType = new GraphQLObjectType({
        name: 'User',
        description: 'User in my db',
        fields: () => ({
            id: {type: GraphQLString},
            name: {type: GraphQLString},
            email: {type: GraphQLString},
            createdAt: {type: GraphQLString},
        })
    })

    const MessageType = new GraphQLObjectType({
        name: 'Message',
        description: '...',
        fields: () => ({
            id: {type: GraphQLString},
            text: {type: GraphQLString},
            userId: {type: GraphQLString},
            photoId: {type: GraphQLString},
            createdAt: {type: GraphQLString},
            user: {
                type: UserType,
                resolve: (message) => {
                    const user = User.get(message.userId);
                    console.log(user);
                    return user;
                }
            }
        })
    })

    const PhotoType = new GraphQLObjectType({
        name: 'Photo',
        description: 'Photos like instagram',
        fields: () => ({
            id: {type: GraphQLString},
            title: {type: GraphQLString},
            likes: {type: GraphQLInt},
            url: {type: GraphQLString},
            createdAt: {type: GraphQLString},
            messages: {
                type: new GraphQLList(MessageType),
                resolve: (photo) => {
                    return Message.getMessagesByPhotoId(photo.id);
                }
            },
            user: {
                type: UserType,
                resolve: (photo) => {
                    return User.get(photo.userId);
                }
            }
        })
    })

    const QueryType = new GraphQLObjectType({
        name: 'Query',
        description: '...',
        fields: () => ({
            user: {
                type: UserType,
                args: {
                    id: {type:GraphQLString}
                },
                resolve: (root, args, info) => {
                    return User.get(args.id)
                }
            },
            photo: {
                type: PhotoType,
                args: {
                    id: {type:GraphQLString}
                },
                resolve: (root, args, info) => {
                    return Photo.getPhoto(args.id)
                }
            },
            photos: {
                type: new GraphQLList(PhotoType),
                resolve: (root, args, info) => {
                    return Photo.getAll();
                }
            }
        })
    });

    return new GraphQLSchema({
        query: QueryType
    })
};
