import {
    MessageFlags,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle, Client,
    Collection,
    Events,
    GatewayIntentBits
} from 'discord.js';
import 'dotenv/config.js';
import { BLACKJACK_COMMAND } from './commands.js'

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.commands.set(BLACKJACK_COMMAND.data.name, BLACKJACK_COMMAND)

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        }
    }
});

let players = new Collection();

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'join_table') {
        if (players.has(interaction.userId)) {
            await interaction.reply({ content: 'You already joined the table.', flags: MessageFlags.Ephemeral });
            return;
        }
    }

    players.set(interaction.userId, { bet: null });

    const bet_10 = new ButtonBuilder().setCustomId(`bet_10`).setLabel('Bet 10').setStyle(ButtonStyle.Primary);
    const bet_50 = new ButtonBuilder().setCustomId(`bet_50`).setLabel('Bet 50').setStyle(ButtonStyle.Primary);
    const bet_100 = new ButtonBuilder().setCustomId(`bet_100`).setLabel('Bet 100').setStyle(ButtonStyle.Primary);
    const row = new ActionRowBuilder().addComponents(bet_10, bet_50, bet_100);

    await interaction.reply({
        content: '✅ You joined the table! Now place your bet:',
        components: [row],
        flags: MessageFlags.Ephemeral
    });
});

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);