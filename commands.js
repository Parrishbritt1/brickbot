import 'dotenv/config';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } from 'discord.js';

export const BLACKJACK_COMMAND = {
    data: new SlashCommandBuilder()
        .setName('bj')
        .setDescription('BlackJack'),
    async execute(interaction) {
        const join_button = new ButtonBuilder().setCustomId('join_table').setLabel('Sit at table').setStyle(ButtonStyle.Success)

        const row = new ActionRowBuilder()
            .addComponents(join_button);

        await interaction.reply({
            content: `Starting Blackjack - Take a seat!`,
            components: [row]
        })
    }
}
