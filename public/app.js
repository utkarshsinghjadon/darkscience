const offer = await peerConnection.createOffer();
await peerConnection.setLocalDescription(offer);

const roomWithOffer = {
    offer: {
        type: offer.type,
        sdp: offer.sdp
    }
}
const roomRef = await db.collection('rooms').add(roomWithOffer);
const roomId = roomRef.id;
document.querySelector('#currentRoom').innerText = `Current room is ${roomId} - You are the caller!`
