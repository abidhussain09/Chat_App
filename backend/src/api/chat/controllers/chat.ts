import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::chat.chat', ({ strapi }) => ({
    async create(ctx) {
        try {
            const { message_text, user } = ctx.request.body.data;

            if (!message_text || !user) {
                return ctx.badRequest("Message text and user ID are required.");
            }

            const newChat = await strapi.entityService.create('api::chat.chat', {
                data: {
                    message_text,
                    user,  // Ensure this is a valid user ID
                    message_date: new Date().toISOString(),
                },
            });

            return ctx.send({ message: "Chat saved successfully!", data: newChat });
        } catch (error) {
            console.error("Error saving chat:", error);
            return ctx.internalServerError("An error occurred while saving the chat.");
        }
    },
}));
