const { Interaction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');
const { info, warn, error, nolog } = require('../src/log.js');
const { servererror, serverowner } = require('../embeds.js')
/**
 * @param {Interaction} interaction
 */

module.exports = {
	data: new SlashCommandBuilder()
		.setName('signup')
		.setDescription('Sign up your server on Connect.'),

        async execute(interaction) {

            if(!interaction.guildId) {
                await interaction.reply({
                    embeds: [servererror]
                });
                return;
            }
            if (!(interaction.member.id && interaction.guild.ownerId && parseInt(interaction.member.id) === parseInt(interaction.guild.ownerId))) {
                await interaction.reply({
                    embeds: [serverowner]
                });
                return;
            }
            info(`Owner used signup command.`);
            const form = new ModalBuilder()
                .setCustomId('signup-submit')
                .setTitle('Sign up your community on our website.')

            const descriptionInput = new TextInputBuilder()
                .setCustomId('signup-set-description')
                // NOTE: If you want to modify the Label below, we believe it needs to be under 50 characters. Any more, and it will throw an error.
                .setLabel(`Describe your server to us.`)
                .setRequired(true)
                .setMinLength(20)
                .setMaxLength(400)
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder('Write your description...')

            const actionRow1 = new ActionRowBuilder().addComponents(descriptionInput);
            form.addComponents(actionRow1);
            await interaction.showModal(form);
    }
};

    

async function signup(interaction) {
    if(!interaction.guildId) {
        await interaction.reply({
            content:`This command can only be used in a server.`
        });
        return;
    }
    if (!(interaction.member.id && interaction.guild.ownerId && parseInt(interaction.member.id) === parseInt(interaction.guild.ownerId))) {
        await interaction.reply({
            content:`The server owner must use this command.`
        });
        return;
    }
    info(`Owner used signup command.`);
    const form = new ModalBuilder()
        .setCustomId('signup-submit')
        .setTitle('Sign up your community on our website.')
    const descriptionInput = new TextInputBuilder()
        .setCustomId('signup-set-description')
        // NOTE: If you want to modify the Label below, we believe it needs to be under 50 characters. Any more, and it will throw an error.
        .setLabel(`Describe your server to us.`)
        .setRequired(true)
        .setMinLength(20)
        .setMaxLength(400)
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Write your description...')
    const actionRow1 = new ActionRowBuilder().addComponents(descriptionInput);
    form.addComponents(actionRow1);
    await interaction.showModal(form);
}