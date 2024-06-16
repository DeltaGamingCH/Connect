const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { editStaffLeave } = require("../utils/utils.js");
const { embedManage } = require("../embeds.js");

module.exports = {
    data: {
        name: "staffleavedecline",
        customId: "staffleavedecline",
        description: "Process StaffLeave decline.",
    },
    async execute(interaction) {
        const staffLeaveDeclineReason = interaction.fields.getTextInputValue("staffleavedecline-reason")
        const id = interaction.customId.split("-")[1]

        const data = {
            StaffLeaveID: id,
            Status: "Declined",
            ApprovedBy: interaction.user.id,
            ApprovedDate: Date.now(),
            DeclineReason: staffLeaveDeclineReason,
        };

        staffleave = await editStaffLeave(data);

        if (staffleave.data.status !== 200) {
            return interaction.reply({ content: `Unable to approve StaffLeave.`, ephemeral: true });
        }

        const approvebutton = new ButtonBuilder()
            .setCustomId(`staffleaveapprove-${staffleave.data.staffleave.StaffLeaveID}`)
            .setLabel("Approve")
            .setStyle(ButtonStyle.Success)

        const declinebutton = new ButtonBuilder()
            .setCustomId(`staffleavedecline-${staffleave.data.staffleave.StaffLeaveID}`)
            .setLabel("Decline")
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true)

        const row = new ActionRowBuilder().addComponents(approvebutton, declinebutton)

        const embed = await embedManage.StaffLeaveReviewFormat(interaction, staffleave.data.staffleave.StaffLeaveID);
        await interaction.message.edit({ embeds: [embed], components: [row]});

        const replyembed = await embedManage.StaffLeaveDeclined(staffLeaveDeclineReason)
        await interaction.reply({ embeds: [replyembed], ephemeral: true });
    }
};