import { Permissions, Notifications } from 'expo';

/*
Checks device permissions for notifications 
and creates a token to determine which device to send notification 
*/

async function checkPermissions() {
	const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
	let finalStatus = existingStatus;

	// only ask if permissions have not already been determined
	if (existingStatus !== 'granted') {
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		finalStatus = status;
	}

	// Stop here if the user did not grant permissions
	if (finalStatus !== 'granted') {
		return false;
	}
	return true;
}

export async function registerForPushNotifications() {
	let permission = await checkPermissions();
	if (permission == false) {
		return;
	}

	// Get the token that uniquely identifies the device
	try {
		let token = await Notifications.getExpoPushTokenAsync();
		console.log('Token: ' + token);
		return token;
	} catch (error) {
		console.log(error);
	}
}
