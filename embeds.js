/*const { timeStamp } = require('console');*/
const { EmbedBuilder, Embed } = require('discord.js')
const axios = require('axios');

// Styling Variables
const messageErrorServer = 'SERVER ERROR';
const messageButtonTimeout = '`Confirmation not received within 60s, cancelling request.`';

const colorSuccess = '#45BB8A';
const colorWarn = '#FFB53E';
const colorError = '#F14647';
const colorInfo = '#00469F';

const iconSuccess = '<:DG_CO_Check:1028309734450806815> ';
const iconWarn = '<:DG_CO_Warn:1142925963668238536> ';
const iconError = '<:DG_CO_Error:1142926009579094226> ';
const iconConnect = '<:DG_CO_Connect:1249377684962803794> ';
const iconConnectB = '<:DG_CO_ConnectBlack:1203623412271022150> ';
const iconMembers = '<:DG_CO_Members:1257658527426674731>';

const iconURLConnect = 'https://cdn.discordapp.com/emojis/1249377684962803794.webp?size=22&quality=lossless'
const iconURLCommunity = 'https://cdn.discordapp.com/emojis/1172188410522386533.webp?size=22&quality=lossless'
const iconURLConnectB = 'https://connect.deltagamez.ch/common/img/ConnectTransparentB.png'

const footerConnect = { text: 'Connect', iconURL: iconURLConnectB };
const footerPartnership = { text: 'Connect Partnership', iconURL: iconURLConnectB };

const moduleEnabled = { name: 'MODULE STATUS', value: `${iconSuccess}\u200B \`ENABLED\`\n\u200B`}
const moduleDisabled = { name: 'MODULE STATUS', value: `${iconError}\u200B \`DISABLED\`\n\u200B`}

// Log Embeds
const embedLog = {
    Success: {
        title: '\x1b[SUCCESS]',
        color: colorSuccess,
    },
    Warn: {
        title: '\x1b[WARN]',
        color: colorWarn,
    },
    Error: {
        title: '\x1b[ERROR]',
        color: colorError,
    },
    Info: {
        title: '\x1b[INFO]',
        color: colorInfo,
    }
};


const embedInfo = {
    Success: new EmbedBuilder()
        .setTitle('SUCCESS')
        .setColor(colorSuccess)
        .setTimestamp(), 

    Warn: new EmbedBuilder()
        .setTitle('WARNING')
        .setColor(colorWarn)
        .setTimestamp(), 

    Error: new EmbedBuilder()
        .setTitle(`${iconError} ERROR`)
        .setColor(colorError)
        .setTimestamp(), 

    Info: new EmbedBuilder()
        .setTitle('INFO')
        .setColor(colorInfo)
        .setTimestamp()
}



const embedAbout = {
    About: new EmbedBuilder(embedInfo.Info)
        .setTitle(`${iconConnect} CONNECT`)
        .setDescription(`Connect your community to the best advertising platform for Discord communities. Connect is an easy to use Discord Bot, perfected for small and large Discord communities, filled with features for partnerships, advertising and more.`)
        .setFooter(footerConnect),
    GetStarted: new EmbedBuilder(embedInfo.Success)
        .setTitle(`${iconSuccess} SUCCESSFULLY CONNECTED`)
        .setDescription(`Thanks for inviting <:DG_CO_ConnectBlack:1203623412271022150> **Connect**! 
            
            Connect your community to the best advertising platform for Discord communities. Connect is an easy-to-use Discord Bot, perfected for small and large Discord communities, filled with features for partnerships, advertising and more.
            \u200B`)
        .addFields( 
            { name: `COMMUNITY INFORMATION`, 
            value: `Connect uses only minimal commands to get you where you want to be. Here are the commands to help you get started. 
            
            \`/connect\` • Advertise your community on the Connect [web-platform](https://connect.deltagamez.ch).
            \`/partnership\` • Manage partnerships inside your community. 
            \`/about\` • Learn more about us, our terms and privacy policy.
            
            [Join our Discord](https://sYpmUFQ) for more help, updates, and our road-map.
            \u200B`})
        .setFooter(footerConnect),
    serverInfo: async function serverInfo(serverData, guild){
        let embed = new EmbedBuilder(embedInfo.Info)
            .setTitle(`${iconConnect} SERVER INFORMATION`)
            .setDescription(`This is the information about your server on the Connect platform. 
                \u200B`)
            .addFields( 
                { name: 'COMMUNITY INFORMATION', 
                value: `**${guild.name}**
                **DESCRIPTION:** ${serverData.ShortDesc}
                **MEMBERS**: ${serverData.MemberCount}
                **INVITE**: ${serverData.ServerInvite}\n\u200B`})
            .setFooter(footerConnect)
        return embed;
    }
}

const embedConnect = {
        Connect : async function Connect(status, server){
        let embed = new EmbedBuilder(embedInfo.Info)
            .setTitle(`${iconConnect} CONNECT`)
            .setDescription(`Connect your community to the best advertising platform.

                This module allows your community to be displayed on the [Connect web-platform](https://connect.deltagamez.ch). Through the platform, you can display your community to the web, for everyone to view and join. 
                Use the buttons below to enable or disable the module and walk-through the setup, we will do the rest and get you online. 
                \u200B
                `)

        if (server.Connect) {
            embed.addFields( 
                { name: 'COMMUNITY INFORMATION', 
                value: `**${server.ServerName}**
                **DESCRIPTION:** ${server.ShortDesc}
                **MEMBERS**: ${server.MemberCount}
                **INVITE**: ${server.ServerInvite}\n\u200B`})
        }
            embed.setFooter(footerConnect)

        return embed
    },
    DescriptionUpdated: new EmbedBuilder(embedInfo.Success)
        .setTitle(`${iconSuccess} DESCRIPTION UPDATED`)
        .setDescription('Your community description has been updated.')
        /*LOGIC SIMILAR TO THE embedConnect.Connect SHOULD BE IMPLEMENTED HERE, SHOWING THE WHOLE COMMUNITY INFORMATION AFTER UPDATING THE DESCRIPTION*/ 
        .setFooter(footerConnect),
    Error: new EmbedBuilder(embedInfo.Error)
        .setDescription('Error')
        .setFooter(footerConnect),
    OutsideServer: new EmbedBuilder(embedInfo.Error)
        .setTitle(`${iconError} ${messageErrorServer}`)
        .setDescription('You need to be in a server to use this command.')
        .setFooter(footerConnect),
    ServerOwner: new EmbedBuilder(embedInfo.Error)
        .setTitle(`${iconError} ERROR`)
        .setDescription('Only the server owner can run this command. Please contact the server owner to use this command.')
        .setFooter(footerConnect),
    ModalProcess: new EmbedBuilder(embedInfo.Error)
        .setTitle(`${iconError} ${messageErrorServer}`)
        .setDescription('An error occurred while processing your form.\n Please try again later.')
        .setFooter(footerConnect),
    Process: new EmbedBuilder(embedInfo.Error)
        .setTitle(`${iconError} ${messageErrorServer}`)
        .setDescription('An error occurred while processing your request.\n Please try again later.')
        .setFooter(footerConnect),
    ErrorDatabase: new EmbedBuilder(embedInfo.Error)
        .setTitle(`${iconError} ${messageErrorServer}`)
        .setDescription('Database could not be reached.\n Please try again later or contact support.')
        .setFooter(footerConnect),
    ConnectEnabled: async function ConnectEnabled(status, server){
        let embed = new EmbedBuilder(embedInfo.Success)
            .setTitle(`${iconSuccess} CONNECT ${status ? 'ENABLED' : 'DISABLED'}`)
            .setDescription(`Connect has successfully been ${status ? 'Enabled' : 'Disabled'}.\n\u200B`)
            .setFooter(footerConnect)

        if (server.Connect) {
            embed.addFields( 
                { name: 'COMMUNITY INFORMATION', 
                value: `**${server.ServerName}**
                **${server.ShortDesc}**
                **MEMBERS**: ${server.MemberCount}
                **INVITE**: ${server.ServerInvite}`})
        }
        return embed
    }
};


const embedPartnership = {
    Submitted : async function Submitted(status, server){
        let embed = new EmbedBuilder(embedInfo.Success)
            .setTitle(`${iconSuccess} ENABLED`)
            .setDescription(`Partnerships has successfully ${status ? "been setup and enabled" : ""}been set up and enabled\n`)
            .addFields( { name: 'PARTNERSHIPS INFORMATION', value: 'Values set during the setup displayed here as in connect module'})
            .setFooter(footerConnect)

        return embed
    },
    Partnership : async function Partnership(status, server){
        let embed = new EmbedBuilder(embedInfo.Info)
            .setTitle(`PARTNERSHIPS MODULE`)
            .setDescription(`This module allows you to set up partnerships with other communities.
                Module is ${status ? "enabled" : "disabled"}.
                Use the buttons below to enable or disable the module and walk-through the setup, we will do the rest and get you online.
                \u200B`)
            .setFooter(footerPartnership)

        return embed
    },
    StatusChange : async function StatusChange(status){
        const StatusChange = new EmbedBuilder(embedInfo.Success)
            .setTitle(`${iconSuccess} PARTNERSHIP MODULE ${status ? "ENABLED" : "DISABLED"} `)
            .setDescription(`The Partnership module has sucessfully been ${status ? "Enabled" : "Disabled"}.\n\u200B`)
            .setFooter(footerPartnership);
        return StatusChange;
    },
    ChannelSelection: new EmbedBuilder(embedInfo.Info)
        .setTitle(`CHANNEL SELECTION`)
        .setDescription(`Select the channel users can create a partnership request in.\n\u200B`)
        .addFields({ name: `HOW IT WORKS`, 
            value: `Users can create a partnership request through pressing the \`Request Partnership\` button. 
            We suggest your selected channel is called \`#request-partnership\` and make sure it is public to \`@everyone\`.
            We will post the message, in which users can request a partnership with you.\n\u200B` })
        .setFooter(footerPartnership),
    RoleSelection: new EmbedBuilder(embedInfo.Info)
        .setTitle(`ROLE SELECTION`)
        .setDescription(`Select the roles which should be mentioned for new partnership requests.\n\u200B`)
        .addFields({ name: `HOW IT WORKS`, 
            value: `As soon as someone requests a new partnership, your selected roles will be mentioned. A thread is created for your staff to approve or decline a partnership request.\n\u200B` })
        .setFooter(footerPartnership),
    MemberRequirementSelection: new EmbedBuilder(embedInfo.Info)
        .setTitle(`MEMBER REQUIREMENTS`)
        .setDescription(`Select the minimum members a community needs to partner with you.\n\u200B`)
        .addFields({ name: `HOW IT WORKS`, 
            value: `As soon as someone requests a new partnership, your selected roles will be mentioned. A thread is created for your staff to approve or decline a partnership request.\n\u200B` })
        .setFooter(footerPartnership),

    /*PARTNERSHIP REQUEST*/
    PartnershipRequest: async function PartnershipRequest(memberRequirement, roleMention){
        partnerShipEmbedDescription = `Press the button below to request a partnership`
        
        
        if(memberRequirement){
            partnerShipEmbedDescription += `\n${iconMembers} **Member Requirements**: ${memberRequirement}`;
        }
        if (roleMention) {
            partnerShipEmbedDescription += `\nThis would ping the role(s) : ${roleMention}`;
        }
        
        const PartnerShipEmbed = new EmbedBuilder(embedInfo.Info)
            .setTitle(`${iconConnectB} REQUEST PARTNERSHIP`)
            .setDescription(partnerShipEmbedDescription)
            .setFooter(footerPartnership)
        return PartnerShipEmbed;
    },
    /*END*/
    partnershipOpener: async function partnershipOpener(channel, enable, memberRequirement, roleMention){
        // Enable is true if the partnership module is enabled, False if edited
        let embed = new EmbedBuilder(embedInfo.Info)
            .setTitle(`Partnership`)
            .setDescription(`Partnership has been sent in <#${channel}>`)
        return embed


    },
    partershipAccepted: async function partershipAccepted(user){
        if (!user) {
            const embed = new EmbedBuilder(embedInfo.Success)
                .setTitle(`${iconSuccess} PARTNERSHIP ACCEPTED`)
                .setDescription(`Your partnership request has been accepted.`)
                .setFooter(`Note for Staff: The user couldn't be found, and hasn't been pinged. Please mention the user manually.`)
            return embed
        }
        
        const embed = new EmbedBuilder(embedInfo.Success)
            .setTitle(`${iconSuccess} PARTNERSHIP ACCEPTED`)
            .setDescription(`<@${user.user.id}>, your partnership has been accepted. Please wait for further instructions by the staff team to complete the partnership.\n\u200B`)
            .setThumbnail('https://cdn.discordapp.com/emojis/1172188410522386533.webp?size=22&quality=lossless')
            .setFooter(footerPartnership)
        return embed
    },

    ThreadOpened: async function ThreadOpened(existingThread){
        const embed = new EmbedBuilder(embedInfo.Warn)
            .setTitle(`${iconWarn} PARTNERSHIP REQUEST PENDING`)
            .setDescription(`Your partnership request has already been sent and is pending. Please wait until a staff member handles your request.
                [View Request](${existingThread.url})`)
            .setFooter(footerPartnership)
        return embed
    },

    ThreadOpener: new EmbedBuilder(embedInfo.Success)
        .setTitle(`Partnership Request`)
        .setDescription(
            `This is your partnership request thread. Please describe what you had in mind, and we will get back to you as soon as possible.`,
        ),
    threadOpen: async function threadOpen(url){
        const embed = new EmbedBuilder(embedInfo.Success)
            .setTitle("Partnership Request")
            .setDescription(`Your partnership request thread has been opened. [Click here to view it](${url})`)
            .setTimestamp();
        return embed
    },
    partnershipDeclineReason: async function partnershipDeclineReason(reason){
        const embed = new EmbedBuilder(embedInfo.Error)
            .setTitle("Partnership Declined")
            .setDescription(`Your partnership request has been declined for the following reason: ${reason}`)
            .setTimestamp();
        return embed
    },
    partnershipFailedtoPingUser: async function partnershipFailedtoPingUser(embed){
        const embed2 = new EmbedBuilder(embed)
                .setFooter("Failed to Ping user")
        return embed2;
    },
    PartnershipDisabled: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Partnership`)
        .setDescription(`You can not use the Button for Partnership Requests as the Partnership Module is disabled.`),
}

// Staff Management Embeds
const embedManage = {
    Management: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Please pick a Subcategory`)
        .setDescription('These are the subcategories you can pick from.')
        .setFields(
            {name: 'Staff Leave', value: 'Staff Leave can help manage staff going on holiday etc.'},
            {name: 'Promotion', value: 'Promotion is for helping u promote/demote staff members and keeping a log of these actions'}
        ),
    Promotion: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Promotion`)
        .setDescription(`This is Promotion\nThis is for coolio people`),
    PromotionDisabled: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Promotion`)
        .setDescription(`This has been disabled`),
    PromotionEdit: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Promotion`)
        .setDescription(`This has been Edited`),
    PromotionEnabled: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Promotion`)
        .setDescription(`This has been Enabled`),
    StaffLeave: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Staff Leave`)
        .setDescription(`This is staff leave\nThis is for coolio people`),
    StaffLeaveDisabled: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Staff Leave`)
        .setDescription(`This has been disabled`),
    StaffLeaveEdited: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Staff Leave`)
        .setDescription(`This has been edited`),
    StaffLeaveEnabled: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Staff Leave`)
        .setDescription(`This has been enabled`),
    StaffLeavePost: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Staff Leave`)
        .setDescription(`This has been posted`),
    StaffLeaveReviewFormat: async function (interaction, StaffLeaveID){
        let data
        try {
            const response = await axios.get(
                `${process.env.DATABASE_URL}${process.env.STORAGE_PATH}/servers/staffmanagement/staffleave/${StaffLeaveID}`,{
                    timeout: 2500
                }
            );
    
            data = response.data.staffleave;
        } catch (error) {
            if(interaction.customId){
                await interaction.update({embeds: [embedInfoError.ServerConnectionError], components: []})
            } else {
                await interaction.reply({embeds: [embedInfoError.ServerConnectionError], components: []})
            }
            return;
        }
        let desc = ""
        if(data.UserID){
            desc += `User: <@${data.UserID}>\n`;
        }
        if(data.Reason){
            desc += `Reason: ${data.Reason}\n`;
        }
        if(data.StartDate){
            const startTimestampInSeconds = Math.floor(new Date(data.StartDate).getTime() / 1000);
            desc += `Start Date: <t:${startTimestampInSeconds}:D>\n`;
        }
        if (data.EndDate) {
            const endTimestampInSeconds = Math.floor(new Date(data.EndDate).getTime() / 1000);
            desc += `End Date: <t:${endTimestampInSeconds}:D>\n`;
        }
        if(data.Status){
            desc += `Status: ${data.Status}\n`;
        }
        if(data.ApprovedBy){
            desc += `${data.Status == "Approved" ? "Approved" : "Declined"} By: <@${data.ApprovedBy}>\n`;
        }
        if(data.ApprovedDate){
            const approvedTimestampInSeconds = Math.floor(new Date(data.ApprovedDate).getTime() / 1000);
            desc += `${data.Status == "Approved" ? "Approved" : "Declined"} Date: <t:${approvedTimestampInSeconds}:D>\n`;
        }
        if(data.DeclineReason !== "No Reason Provided"){
            desc += `Decline Reason: ${data.DeclineReason}\n`;
        }


        let embed = new EmbedBuilder(embedInfo.Info)
            .setTitle(`Staff Leave`)
            .setDescription(desc)
            .setFooter({text: `Staff Leave ID: ${data.StaffLeaveID}`})
        return embed
    },
    StaffLeaveSubmitted: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Staff Leave`)
        .setDescription(`your Staff Leave Request has been submitted`),
    StaffLeaveApproved: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Staff Leave`)
        .setDescription(`You have approved this Staff Leave Request`),
    StaffLeaveDeclined: async function StaffLeaveDeclined(reason){
        let embed = new EmbedBuilder(embedInfo.Info)
            .setTitle(`Staff Leave`)
            .setDescription(`You have declined this Staff Leave Request for ${reason}.`)
        return embed
    },
    // The channel that the Staff Leaves get posted to
    channelSelect: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Channel Select`)
        .setDescription(`Select a Channel to post the Staff Leave Requests in for review.`),
    // The channel that the button to request staff leave gets posted in
    postChannelSelect: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Post Channel Select`)
        .setDescription(`Select a Channel to post the Staff Leave Requests in for review.`),
    selectManageRoles: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Select Management Roles`)
        .setDescription(`Select the roles that can manage staff leave requests.`),
    selectModeraterRoles: new EmbedBuilder(embedInfo.Info)
        .setTitle(`Select Moderation Roles`)
        .setDescription(`Select the roles that can moderate staff leave requests.`),
};



// Info Success Embeds
const embedInfoSuccessTemplate = new EmbedBuilder().setColor(colorSuccess).setFooter({ text: "Connect" });
const embedInfoSuccess = {
    Template: embedInfoSuccessTemplate,
    ModalSumbit: new EmbedBuilder(embedInfoSuccessTemplate)
        .setTitle(`${iconSuccess} SERVER SUBMITTED`)
        .setDescription(
            'Your server has sucessfully been submitted and will now be processed.',
        )
};

// Info Warn Embeds
/*const embedInfoWarnTemplate = new EmbedBuilder().setColor(colorWarn).setFooter('Connect');*/

// Info Error Embeds
const embedInfoErrorTemplate = new EmbedBuilder().setColor(colorError).setFooter({ text: "Connect" });
const embedInfoError = {
    Template: embedInfoErrorTemplate,
    ServerError: new EmbedBuilder(embedInfoErrorTemplate)
        .setTitle(`${iconError} ${messageErrorServer}`)
        .setDescription('You need to be in a server to use this!'),
    ServerOwner: new EmbedBuilder(embedInfoErrorTemplate)
        .setTitle(`${iconError} 'ERROR'`)
        .setDescription('Only the server owner can run this command.'),
    ModalProcess: new EmbedBuilder(embedInfoErrorTemplate)
        .setTitle(`${iconError} ${messageErrorServer}`)
        .setDescription(
            'An error occurred while processing your form. Please try again later.',
        ),
    Process: new EmbedBuilder(embedInfoErrorTemplate)
        .setTitle(`${iconError} ${messageErrorServer}`)
        .setDescription(
            'An error occurred while processing your request.\n Please try again later.',
        ),
    ServerConnectionError: new EmbedBuilder(embedInfoErrorTemplate)
        .setTitle(`${iconError} ${messageErrorServer}`)
        .setDescription(
            'Database could not be reached.\n Please try again later or contact support.',
        ),
};


// Exporting Embeds
module.exports = {
    embedLog,
    embedInfo,
    embedConnect,
    embedPartnership,
    embedManage,
    embedInfoError,
    embedInfoSuccess,
    embedAbout,
    messageButtonTimeout
};
