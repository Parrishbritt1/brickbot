import 'dotenv/config';
import { SlashCommandBuilder } from 'discord.js';

export const BLACKJACK_COMMAND = new {
    data: SlashCommandBuilder()
        .setName('bj')
        .setDescription('BlackJack'),
    async execute(interaction) {
        await interaction.reply(`Starting Blackjack - INTERACTION: ${interaction}`)
    }
}
