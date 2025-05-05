import 'dotenv/config';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } from 'discord.js';
import { BRICKBALL_ANSWERS } from './brickball-answers.js';

const BLACKJACK_COMMAND = {
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

const BRICKBALL_COMMAND = {
    data: new SlashCommandBuilder()
        .setName('brickball')
        .setDescription('Magic 8 brick ball')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('your question')
                .setRequired(true)
        ),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const answer = BRICKBALL_ANSWERS[Math.floor(Math.random() * BRICKBALL_ANSWERS.length)];
        await interaction.reply(`❓ **${question}**\n💬 **Answer:** ${answer}`);
    }
}

export const ALL_COMMANDS = [BLACKJACK_COMMAND, BRICKBALL_COMMAND].map(command => command.data.toJSON())
