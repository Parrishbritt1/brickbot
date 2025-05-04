import { REST, Routes } from "discord.js";
import { BLACKJACK_COMMAND } from "./commands.js";

const rest = new REST().setToken(process.env.BOT_TOKEN);
const commands = [BLACKJACK_COMMAND.data.toJSON()];

// deploy commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();