/*const setButton = document.getElementById("btn");
const titleInput = document.getElementById("title");
const connectButton = document.getElementById("connect-btn");
const partnerIdInput = document.getElementById("partner-id-input");
const counterElement = document.getElementById("counter");
const connexionRequestContainerElement = document.getElementById("connexion-request-container");
const connexionRequestResponseContainerElement = document.getElementById("connexion-request-response-container");
const connexionRequestResponseTextElement = document.getElementById("connexion-request-response-text");
const controlButton = document.getElementById("control-btn");

let peerConnection;
let isController = false;

setButton.addEventListener("click", () => {
  const title = titleInput.value;
  window.sessionAPI.setTitle(title);
});

connectButton.addEventListener("click", () => {
  const partnerId = partnerIdInput.value;
  console.log("partnerId :", partnerId);
  window.sessionAPI.sendConnectionRequest(partnerId);
});

controlButton.addEventListener('click', () => {
    createPeerConnection();
});

window.sessionAPI.onSetId((value) => {
  console.log("onSetId: ", value);
  counterElement.innerText = value;
  console.log("onSetId 1: ", value);
});

window.sessionAPI.onConnexionRequestResponse((value) => {
  if(value) {
    connexionRequestContainerElement.style.display = "none"
    connexionRequestResponseTextElement.innerText = "Connexion établie avec succès!"
    controlButton.style.visibility = "visible"
  } else  {
    connexionRequestResponseTextElement.innerText = "Echèc de l'établissement de la connexion : accès refusé!"
  }
})

window.sessionAPI.onOfferReceived((offer) => {
  console.log("offer : ", offer)
  peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  peerConnection.createAnswer().then((answer) => {
    peerConnection.setLocalDescription(answer);
    window.sessionAPI.sendAnswer(answer);
  });
});

window.sessionAPI.onAnswerReceived((answer) => {
  peerConnection.setRemoteDescription(new RTCSessionDescription(answer.data));
});

window.sessionAPI.onIceCandidateReceived((candidate) => {
  peerConnection.addIceCandidate(new RTCIceCandidate(candidate.data));
});

window.sessionAPI.onControlReceived((data) => {
  handleControl(data.data);
});

function createPeerConnection() {
  peerConnection = new RTCPeerConnection();
console.log("peerConnection : ", peerConnection)
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      window.sessionAPI.sendIceCandidate(event.candidate);
    }
  };

  peerConnection.createOffer().then((offer) => {
    peerConnection.setLocalDescription(offer);
    const initialOfferAndConnection = { peerConnection, offer };
    window.sessionAPI.sendOffer(initialOfferAndConnection);
  });
}

function handleControl(data) {
  if (!isController) {
    if (data.type === 'mousemove') {
      window.robot.moveMouse(data.x, data.y);
    } else if (data.type === 'mouseclick') {
      window.robot.mouseClick();
    } else if (data.type === 'keypress') {
      window.robot.keyTap(data.key);
    }
  }
}

// Capture mouse and keyboard events and send them as control messages
document.addEventListener('mousemove', (event) => {
  if (isController) {
    window.sessionAPI.sendControl({
      type: 'mousemove',
      x: event.clientX,
      y: event.clientY
    });
  }
});

document.addEventListener('click', () => {
  if (isController) {
    window.sessionAPI.sendControl({
      type: 'mouseclick'
    });
  }
});

document.addEventListener('keydown', (event) => {
  if (isController) {
    window.sessionAPI.sendControl({
      type: 'keypress',
      key: event.key
    });
  }
});



















/*
document.getElementById('toggleRole').addEventListener('click', () => {
    isController = !isController;
    ipcRenderer.send('message', { type: 'toggle-role', data: isController });
    if (isController) {
      createPeerConnection();
    }
  });

  ipcRenderer.on('message', (event, data) => {
    if (data.type === 'offer') {
      peerConnection.setRemoteDescription(new RTCSessionDescription(data.data));
      peerConnection.createAnswer().then((answer) => {
        peerConnection.setLocalDescription(answer);
        ipcRenderer.send('message', { type: 'answer', data: answer });
      });
    } else if (data.type === 'answer') {
      peerConnection.setRemoteDescription(new RTCSessionDescription(data.data));
    } else if (data.type === 'ice-candidate') {
      peerConnection.addIceCandidate(new RTCIceCandidate(data.data));
    } else if (data.type === 'control') {
      handleControl(data.data);
    }
  });

  function createPeerConnection() {
    peerConnection = new RTCPeerConnection();

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        ipcRenderer.send('message', { type: 'ice-candidate', data: event.candidate });
      }
    };

    peerConnection.createOffer().then((offer) => {
      peerConnection.setLocalDescription(offer);
      ipcRenderer.send('message', { type: 'offer', data: offer });
    });
  }

  function handleControl(data) {
    if (!isController) {
      if (data.type === 'mousemove') {
        robot.moveMouse(data.x, data.y);
      } else if (data.type === 'mouseclick') {
        robot.mouseClick();
      } else if (data.type === 'keypress') {
        robot.keyTap(data.key);
      }
    }
  }*/

// Capture mouse and keyboard events and send them as control messages
// You'll need to implement this based on your specific requirements*/
document.addEventListener("DOMContentLoaded", () => {
  const setButton = document.getElementById("btn");
  const titleInput = document.getElementById("title");
  const connectButton = document.getElementById("connect-btn");
  const partnerIdInput = document.getElementById("partner-id-input");
  const counterElement = document.getElementById("counter");
  const connexionRequestContainerElement = document.getElementById(
    "connexion-request-container"
  );
  const connexionRequestResponseContainerElement = document.getElementById(
    "connexion-request-response-container"
  );
  const connexionRequestResponseTextElement = document.getElementById(
    "connexion-request-response-text"
  );
  const controlButton = document.getElementById("control-btn");
  const localVideo = document.getElementById("localVideo");
  const remoteVideo = document.getElementById("remoteVideo");

  // const robot = require("robotjs");

  let peerConnection;
  let localStream;
  let isController = false;

  if (setButton && titleInput) {
    setButton.addEventListener("click", () => {
      const title = titleInput.value;
      window.sessionAPI.setTitle(title);
    });
  }

  if (connectButton && partnerIdInput) {
    connectButton.addEventListener("click", () => {
      const partnerId = partnerIdInput.value;
      console.log("partnerId :", partnerId);
      window.sessionAPI.sendConnectionRequest(partnerId);
    });
  }

  if (controlButton) {
    controlButton.addEventListener("click", () => {
      isController = !isController;
      controlButton.textContent = isController
        ? "Stop Controlling"
        : "Start Controlling";
      if (isController) {
        createPeerConnection();
      } else {
        if (peerConnection) {
          peerConnection.close();
          peerConnection = null;
        }
        if (localStream) {
          localStream.getTracks().forEach((track) => track.stop());
          localStream = null;
        }
        localVideo.srcObject = null;
      }
    });
  }

  window.sessionAPI.onSetId((value) => {
    if (counterElement) {
      counterElement.innerText = value;
    }
  });

  window.sessionAPI.onConnexionRequestResponse((value) => {
    if (
      connexionRequestContainerElement &&
      connexionRequestResponseTextElement &&
      controlButton
    ) {
      if (value) {
        connexionRequestContainerElement.style.display = "none";
        connexionRequestResponseTextElement.innerText =
          "Connexion établie avec succès!";
        controlButton.style.visibility = "visible";
      } else {
        connexionRequestResponseTextElement.innerText =
          "Échec de l'établissement de la connexion : accès refusé!";
      }
    }
  });

  window.sessionAPI.onOfferReceived((offer) => {
    handleOffer(offer);
  });

  window.sessionAPI.onAnswerReceived((answer) => {
    handleAnswer(answer);
  });

  window.sessionAPI.onIceCandidateReceived((candidate) => {
    handleIceCandidate(candidate);
  });

  window.sessionAPI.onControlReceived((data) => {
    handleControl(data);
  });

  async function createPeerConnection() {
    peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        window.sessionAPI.sendIceCandidate(event.candidate);
      }
    };

    peerConnection.ontrack = (event) => {
      if (remoteVideo) {
        remoteVideo.srcObject = event.streams[0];
      }
    };

    try {
      localStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      if (localVideo) {
        localVideo.srcObject = localStream;
      }
      localStream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, localStream));

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      window.sessionAPI.sendOffer({ sdp: peerConnection.localDescription });
    } catch (error) {
      console.error("Error creating peer connection:", error);
    }
  }

  async function handleOffer(offer) {
    if (!peerConnection) {
      await createPeerConnection();
    }

    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(offer.data.sdp)
    );
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    window.sessionAPI.sendAnswer({ sdp: peerConnection.localDescription });
  }

  async function handleAnswer(answer) {
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(answer.data.sdp)
    );
  }

  async function handleIceCandidate(candidate) {
    if (peerConnection) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate.data));
    }
  }

  function handleControl(data) {
    if (!isController) {
      if (data.type === "mousemove") {
        window.robot.moveMouse(data.x, data.y);
      } else if (data.type === "mouseclick") {
        window.robot.mouseClick(data.button);
      } else if (data.type === "keypress") {
        window.robot.keyTap(data.key);
      }
    }
  }

  document.addEventListener("mousemove", (event) => {
    if (isController) {
      window.sessionAPI.sendControl({
        type: "mousemove",
        x: event.clientX,
        y: event.clientY,
      });
    }
  });

  document.addEventListener("click", (event) => {
    if (isController) {
      window.sessionAPI.sendControl({
        type: "mouseclick",
        button: event.button,
      });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (isController) {
      window.sessionAPI.sendControl({
        type: "keypress",
        key: event.key,
      });
    }
  });
  
});
