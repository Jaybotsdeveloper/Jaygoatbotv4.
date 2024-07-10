const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "owner",
		author: "Tokodori",
		role: 0,
		shortDescription: " ",
		longDescription: "",
		category: "admin",
		guide: "{pn}"
	},

	onStart: async function ({ api, event }) {
		try {
			const ownerInfo = {
				name: '𝗝𝗮𝘆',
				gender: '𝗠𝗮𝗹𝗲',
				hobby: '𝗖𝗼𝗼𝗸𝗶𝗻𝗴 𝗮𝗻𝗱 𝗽𝗹𝗮𝘆𝗶𝗻𝗴 𝗖𝗵𝗲𝘀𝘀,𝗕𝗮𝘀𝗸𝗲𝘁𝗯𝗮𝗹𝗹,𝗧𝗮𝗸𝗿𝗮𝘄,𝗥𝗼𝗯𝗹𝗼𝘅.',
				Fb: '𝗝𝗮𝘆 𝗣𝗶𝗹𝗹𝗼𝗻𝗮𝗿',
				Relationship: '𝗦𝗶𝗻𝗴𝗹𝗲',
				bio: '𝗶𝗱𝗸 𝗜'𝗺 𝗷𝘂𝘀 𝗹𝗲𝗮𝗿𝗻𝗶'𝗻 𝗯𝗲𝗶𝗻 𝗮 𝗯𝗼𝘁 𝗱𝗲𝘃.'
			};

			const bold = 'https://i.imgur.com/wqTUK0c.mp4';
			const tmpFolderPath = path.join(__dirname, 'tmp');

			if (!fs.existsSync(tmpFolderPath)) {
				fs.mkdirSync(tmpFolderPath);
			}

			const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
			const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

			fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

			const response = `
◈ 𝖮𝖶𝖭𝖤𝖱 𝖨𝖭𝖥𝖮𝖱𝖬𝖠𝖳𝖨𝖮𝖭:\n
Name: ${ownerInfo.name}
Gender: ${ownerInfo.gender}
Relationship: ${ownerInfo.Relationship}
Hobby: ${ownerInfo.hobby}
Fb: ${ownerInfo.Fb}
Bio: ${ownerInfo.bio}
			`;

			await api.sendMessage({
				body: response,
				attachment: fs.createReadStream(videoPath)
			}, event.threadID, event.messageID);

			fs.unlinkSync(videoPath);

			api.setMessageReaction('🌊', event.messageID, (err) => {}, true);
		} catch (error) {
			console.error('Error in ownerinfo command:', error);
			return api.sendMessage('An error occurred while processing the command.', event.threadID);
		}
	}
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
