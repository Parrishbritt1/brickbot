import { REST, Routes } from "discord.js";
import { ALL_COMMANDS } from "./commands.js";

const rest = new REST().setToken(process.env.BOT_TOKEN);

// deploy commands!
(async () => {
    try {
        console.log(`Started refreshing ${ALL_COMMANDS.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID),
            { body: ALL_COMMANDS },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();